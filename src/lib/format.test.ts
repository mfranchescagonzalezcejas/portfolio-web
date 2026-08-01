import { describe, expect, it } from "vitest";
import { formatTemplate } from "./format";

describe("formatTemplate", () => {
  it("replaces a single token", () => {
    expect(formatTemplate("Hello {name}!", { name: "World" })).toBe(
      "Hello World!",
    );
  });

  it("replaces multiple tokens", () => {
    expect(
      formatTemplate("{greeting} {name}, welcome to {place}", {
        greeting: "Hi",
        name: "Ada",
        place: "London",
      }),
    ).toBe("Hi Ada, welcome to London");
  });

  it("replaces repeated tokens", () => {
    expect(formatTemplate("{x} and {x}", { x: "same" })).toBe("same and same");
  });

  it("leaves unmatched tokens as-is", () => {
    expect(formatTemplate("Hello {name} {missing}", { name: "World" })).toBe(
      "Hello World {missing}",
    );
  });

  it("handles empty values", () => {
    expect(formatTemplate("Hello {name}!", { name: "" })).toBe("Hello !");
  });

  it("preserves $& in replacement values", () => {
    expect(formatTemplate("Hello {name}!", { name: "$&" })).toBe("Hello $&!");
  });

  it("preserves $$ in replacement values", () => {
    expect(formatTemplate("Hello {name}!", { name: "$$" })).toBe("Hello $$!");
  });

  it("returns template unchanged when values is empty", () => {
    expect(formatTemplate("no tokens here", {})).toBe("no tokens here");
  });
});
