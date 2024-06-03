export const getIndex = (page: number, total: number, index: number) => {
  return (page - 1) * total + index;
};
