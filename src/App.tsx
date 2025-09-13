import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import spinner from './assets/images/spinner.svg';
import { useNewsActions } from './store/hooks/useNewsActions';
import { useEffect, useState, useCallback } from 'react';
import { useTypedSelector } from './store/hooks/useTypedSelector';
import { NewsSection } from './components/News/NewsSection';
import { formatPubDateToEndDate, getTodayAsEndDate } from './utils/date';

const INITIAL_PAGE = 0;
const MAX_PAGES_PER_API = 100;
const SCROLL_THRESHOLD = 100;
const DEBOUNCE_DELAY = 5000;
const REFRESH_NEWS_INTERVAL = 30000;

function App() {
  const { fetchNews, refreshNews } = useNewsActions();
  const { articles, error, currentFilter } = useTypedSelector(
    (state) => state.news
  );
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [endDate, setEndDate] = useState(getTodayAsEndDate());
  const [isFetching, setIsFetching] = useState(false);
  const hasMore = articles.length > 0 && articles.length % 10 === 0;

  /*
   * инит загрузка новостей
   */
  useEffect(() => {
    fetchNews({});
  }, [fetchNews, currentFilter]);

  /*
   * инфинит скролл
   */
  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          SCROLL_THRESHOLD &&
        !isFetching &&
        hasMore &&
        !error
      ) {
        setIsFetching(true);
      }
    },
    [isFetching, hasMore, error]
  );

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  const canFetchNextPage =
    isFetching && hasMore && currentPage < MAX_PAGES_PER_API - 1;
  const reachedLimit = currentPage === MAX_PAGES_PER_API - 1;

  /*
   * овер инженеринг по подггрузке новостей игнорируя ограничения апи
   */
  useEffect(() => {
    if (canFetchNextPage) {
      const timer = setTimeout(() => {
        fetchNews({ end_date: endDate, page: currentPage + 1 })
          .then(() => setCurrentPage((prev) => prev + 1))
          .finally(() => setIsFetching(false));
      }, DEBOUNCE_DELAY);

      return () => clearTimeout(timer);
    }

    if (reachedLimit) {
      const lastArticle = articles[articles.length - 1];
      if (lastArticle) {
        const newEndDate = formatPubDateToEndDate(lastArticle.pub_date);
        setEndDate(newEndDate);
        setCurrentPage(INITIAL_PAGE - 1);
      }
    }
  }, [isFetching, currentPage, fetchNews, hasMore]);

  /*
   * Интервал на догрузку новый новостей
   */
  useEffect(() => {
    const interval = setInterval(() => {
      refreshNews();
    }, REFRESH_NEWS_INTERVAL);

    return () => clearInterval(interval);
  }, [refreshNews, currentFilter]);

  const retryLoading = () => {
    setIsFetching(true);
  };

  return (
    <div className="flex flex-col items-center">
      <header className="sticky w-full mb-3 top-0 z-50 border-b border-divider-color bg-bg-color">
        <Header />
      </header>
      <main className="explore-shell w-full flex-1 flex flex-col items-center">
        <NewsSection articles={articles} />
      </main>
      {isFetching && hasMore && (
        <img src={spinner} alt="Loading" className="w-9 animate-spin py-10" />
      )}
      {error && !isFetching && (
        <>
          <div>Ошибка загрузки..</div>
          <button
            className="border mt-1 cursor-pointer transition-scale duration-200 border-divider-color rounded p-1 shadow-sm hover:bg-divider-color"
            onClick={() => retryLoading()}
          >
            Еще раз?
          </button>
        </>
      )}
      <footer className="explore-shell">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
