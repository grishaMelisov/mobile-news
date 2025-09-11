export const API_ROUTES = {
  NEWS: {
    /*
     * с методом предоставленным в тз нельзя работать из браузера.
     * это булк апи. О чем сказано на офф странице документации
     */

    // GET: (year: number, month: number) => `archive/v1/${month}/${year}.json`,

    GET: 'search/v2/articlesearch.json',
  },
};
