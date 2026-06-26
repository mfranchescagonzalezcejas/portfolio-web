export const formatProjectLabel = (
  template: string,
  values: Record<string, string>,
) =>
  Object.entries(values).reduce(
    (label, [key, value]) => label.replaceAll(`{${key}}`, value),
    template,
  );
