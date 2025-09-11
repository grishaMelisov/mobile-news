import { useEffect } from 'react';
import { useNewsActions } from './store/hooks/useNewsActions';
import { useTypedSelector } from './store/hooks/useTypedSelector';

function App() {
  // const { getNews } = useNewsActions();
  // const articles = useTypedSelector((state) => state.news.articles);

  // const data = {
  //   year: 2024,
  //   month: 1,
  // };

  // useEffect(() => {
  //   getNews(data);
  // }, [getNews]);

  // useEffect(() => {
  //   if (articles.length > 0) {
  //     console.log('Articles in store:', articles);
  //   }
  // }, [articles]);

  return (
    <>
      <div className="">hello world</div>
    </>
  );
}

export default App;
