import type { Article } from '../../store/news/news.interface';
import { groupArticlesByDate } from '../../utils/groupArticles';
import { NewsCard } from './NewsCard';

interface NewsSectionProps {
  articles: Article[];
}

export const NewsSection = ({ articles }: NewsSectionProps) => {
  const grouped = groupArticlesByDate(articles);

  return (
    <div className="flex flex-col gap-8 w-full">
      {Object.entries(grouped).map(([date, items]) => (
        <section key={date}>
          <h3 className="text-h3 font-bold mb-8">{date}</h3>
          <div className="flex flex-col gap-6 divide-y divide-divider-color">
            {items.map((article) => (
              <NewsCard
                key={article.abstract}
                abstract={article.abstract}
                date={article.pub_date}
                image={article.multimedia.default.url}
                link={article.web_url}
                source={article.source}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
