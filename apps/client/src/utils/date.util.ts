export const differenceInDays = (startDate: Date, endDate: Date): number => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const diffInMs = Math.abs(endDate - startDate);
  return diffInMs / (1000 * 60 * 60 * 24);
};