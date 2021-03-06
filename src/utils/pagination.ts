export const pagination = (
  tracksCount: number,
  limit: number,
  page: number
) => {
  let totalPage = 0;
  let currentPage = 0;
  if (limit > 0) {
    totalPage =
      Math.floor(tracksCount / limit) + (tracksCount % limit > 0 ? 1 : 0);
  }

  if (page > 0 && page <= totalPage) {
    currentPage = page;
  } else if (page > totalPage) {
    currentPage = totalPage;
  }

  return {
    currentPage,
    totalPage,
  };
};
