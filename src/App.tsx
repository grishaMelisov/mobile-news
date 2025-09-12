import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import spinner from './assets/images/spinner.svg';
import { useNewsActions } from './store/hooks/useNewsActions';
import { useEffect, useState, useCallback } from 'react';
import { useTypedSelector } from './store/hooks/useTypedSelector';
import { NewsSection } from './components/News/NewsSection';
import { formatPubDateToEndDate, getTodayAsEndDate } from './utils/date';

function App() {
  const { fetchNews, fetchLatest } = useNewsActions();
  const { articles, error, currentFilter } = useTypedSelector(
    (state) => state.news
  );
  const [currentPage, setCurrentPage] = useState(98);
  const [endDate, setEndDate] = useState(getTodayAsEndDate());
  const [isFetching, setIsFetching] = useState(false);
  const hasMore = articles.length > 0 && articles.length % 10 === 0;

  // Загрузка первоначальных данных
  useEffect(() => {
    fetchNews({});
  }, [fetchNews, currentFilter]);

  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          100 &&
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

  useEffect(() => {
    if (isFetching && hasMore && currentPage < 99) {
      // задержку ставлю чтобы в лимиты не упиратсья по апи
      setTimeout(() => {
        fetchNews({
          end_date: endDate,
          page: currentPage + 1,
        })
          .then(() => {
            setCurrentPage((prev) => prev + 1);
          })
          .finally(() => setIsFetching(false));
      }, 5000);
    } else if (currentPage > 98) {
      const lastArticle = articles[articles.length - 1];
      if (lastArticle) {
        const newEndDate = formatPubDateToEndDate(lastArticle.pub_date);
        setEndDate(newEndDate);
        setCurrentPage(-1);
      }
    }
  }, [isFetching, currentPage, fetchNews, hasMore]);

  return (
    <div className="flex flex-col items-center">
      <header className="sticky w-full top-0 z-50 border-b border-divider-color bg-bg-color">
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
            onClick={() => setIsFetching(true)}
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
