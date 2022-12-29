import Post from "~/models/post.model";

const StatisticsService = {
  getUserPosts: async () => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);
  }
};

export default StatisticsService;
