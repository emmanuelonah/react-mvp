export function composeClassNames(...classNames: (string | number | null | undefined | boolean)[]) {
  const formattedClassNames = classNames.filter(Boolean).join(' ');
  return formattedClassNames;
}
