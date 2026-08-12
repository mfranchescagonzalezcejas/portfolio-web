import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const workflowPath = resolve(
  process.cwd(),
  ".github/workflows/vercel-production.yml",
);
const workflow = () => readFileSync(workflowPath, "utf8");

const git = (cwd: string, ...args: string[]) =>
  execFileSync("git", args, { cwd, encoding: "utf8" }).trim();

const runReleaseGuard = (cwd: string, tagSha: string) =>
  spawnSync(
    "bash",
    [
      "-c",
      `set -euo pipefail
git fetch --no-tags --prune origin '+refs/heads/main:refs/remotes/origin/main'
tag_sha="$(git rev-parse --verify "${tagSha}^{commit}")"
main_sha="$(git rev-parse --verify 'refs/remotes/origin/main^{commit}')"
if [[ "$tag_sha" != "$main_sha" ]]; then
  echo "::error::Release tag does not point to current origin/main"
  exit 1
fi`,
    ],
    { cwd, encoding: "utf8" },
  );

const createRepository = () => {
  const root = mkdtempSync(join(tmpdir(), "release-governance-"));
  const remote = join(root, "remote.git");
  const checkout = join(root, "checkout");

  git(root, "init", "--bare", remote);
  git(root, "clone", remote, checkout);
  git(checkout, "config", "user.name", "Release Guard Test");
  git(checkout, "config", "user.email", "release-guard@example.test");
  git(checkout, "checkout", "-b", "main");
  writeFileSync(join(checkout, "release.txt"), "main\n");
  git(checkout, "add", "release.txt");
  git(checkout, "commit", "-m", "main release commit");
  git(checkout, "push", "origin", "main");

  return { checkout, root };
};

describe("release governance workflow", () => {
  it("permits a tag that resolves exactly to current origin/main", () => {
    const repository = createRepository();

    try {
      const mainSha = git(repository.checkout, "rev-parse", "HEAD");
      git(repository.checkout, "tag", "-a", "v0.3.0", "-m", "release", mainSha);

      expect(
        runReleaseGuard(
          repository.checkout,
          git(repository.checkout, "rev-parse", "v0.3.0"),
        ).status,
      ).toBe(0);

      git(repository.checkout, "tag", "v0.3.1", mainSha);
      expect(
        runReleaseGuard(
          repository.checkout,
          git(repository.checkout, "rev-parse", "v0.3.1"),
        ).status,
      ).toBe(0);
    } finally {
      rmSync(repository.root, { force: true, recursive: true });
    }
  });

  it("rejects a stale tag before deployment can begin", () => {
    const repository = createRepository();

    try {
      const staleSha = git(repository.checkout, "rev-parse", "HEAD");
      writeFileSync(join(repository.checkout, "release.txt"), "current main\n");
      git(repository.checkout, "commit", "-am", "advance main");
      git(repository.checkout, "push", "origin", "main");

      const result = runReleaseGuard(repository.checkout, staleSha);
      expect(result.error).toBeUndefined();
      expect(result.status).not.toBeNull();
      expect(result.status).not.toBe(0);
      expect(result.stdout).toContain(
        "Release tag does not point to current origin/main",
      );
    } finally {
      rmSync(repository.root, { force: true, recursive: true });
    }
  });

  it("rejects a tag when main advances between release gate and deploy", () => {
    const repository = createRepository();

    try {
      const tagSha = git(repository.checkout, "rev-parse", "HEAD");
      expect(runReleaseGuard(repository.checkout, tagSha).status).toBe(0);

      writeFileSync(
        join(repository.checkout, "release.txt"),
        "advanced main\n",
      );
      git(repository.checkout, "commit", "-am", "advance main after gate");
      git(repository.checkout, "push", "origin", "main");

      expect(runReleaseGuard(repository.checkout, tagSha).status).not.toBe(0);
    } finally {
      rmSync(repository.root, { force: true, recursive: true });
    }
  });

  it("fails closed when origin/main cannot be fetched", () => {
    const repository = createRepository();

    try {
      const tagSha = git(repository.checkout, "rev-parse", "HEAD");
      git(
        repository.root,
        "--git-dir",
        join(repository.root, "remote.git"),
        "config",
        "receive.denyDeleteCurrent",
        "ignore",
      );
      git(repository.checkout, "push", "origin", "--delete", "main");

      const result = runReleaseGuard(repository.checkout, tagSha);
      expect(result.error).toBeUndefined();
      expect(result.status).not.toBeNull();
      expect(result.status).not.toBe(0);
    } finally {
      rmSync(repository.root, { force: true, recursive: true });
    }
  });

  it("requires a secret-free release gate before the Vercel deploy job", () => {
    const contents = workflow();
    const gateIndex = contents.indexOf("release-gate:");
    const deployIndex = contents.indexOf("  deploy:");
    const deployGuardIndex = contents.indexOf(
      "Revalidate tag points to current main",
    );
    const deployGuardEnd = contents.indexOf(
      "      - name: Setup Node.js",
      deployGuardIndex,
    );
    const vercelPullIndex = contents.indexOf(
      "pnpm dlx vercel@54.17.1 pull --yes --environment=production",
    );

    expect(contents).toContain('tags:\n      - "v*"');
    expect(contents).toContain("git fetch --no-tags --prune origin");
    expect(contents).toContain("'+refs/heads/main:refs/remotes/origin/main'");
    expect(contents).toContain('"${GITHUB_SHA}^{commit}"');
    expect(contents).toContain("'refs/remotes/origin/main^{commit}'");
    expect(contents).toContain('if [[ "$tag_sha" != "$main_sha" ]]; then');
    expect(contents).toContain(
      "Release tag does not point to current origin/main",
    );
    expect(contents.match(/node-version: ">=22\.12\.0"/g) ?? []).toHaveLength(
      2,
    );
    expect(contents).toContain("needs: release-gate");
    expect(gateIndex).toBeGreaterThan(-1);
    expect(deployIndex).toBeGreaterThan(gateIndex);
    expect(contents.slice(0, deployIndex)).not.toContain("secrets.VERCEL_");
    expect(deployGuardIndex).toBeGreaterThan(deployIndex);
    expect(vercelPullIndex).toBeGreaterThan(deployGuardIndex);
    expect(contents.slice(deployGuardIndex, deployGuardEnd)).not.toContain(
      "secrets.VERCEL_",
    );

    const commands = [
      "pnpm install --frozen-lockfile",
      "pnpm run build",
      "pnpm exec vitest run",
      "pnpm run typecheck",
      "pnpm run lint",
      "pnpm run format:check",
      "pnpm audit --prod --audit-level=high",
    ];
    const positions = commands.map((command) => contents.indexOf(command));

    expect(positions.every((position) => position > gateIndex)).toBe(true);
    expect(positions.every((position) => position < deployIndex)).toBe(true);
  });
});
