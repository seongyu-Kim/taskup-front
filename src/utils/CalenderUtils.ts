export const handleDayCellContent = (arg: { dayNumberText: string }) => {
  return arg.dayNumberText.replace('일', '');
};
