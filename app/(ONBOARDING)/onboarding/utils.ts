export const cn = (
  ...classes: Array<string | false | null | undefined>
) => classes.filter(Boolean).join(" ");

export const FOCUS_RING =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

export const toggleValue = (values: string[], value: string) =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
