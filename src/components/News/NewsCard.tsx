interface NewsCardProps {
  image: string;
  source: string;
  title: string;
  date: string;
}

export const NewsCard = ({ image, source, title, date }: NewsCardProps) => {
  return (
    <div className="w-full grid grid-cols-card gap-y-2 gap-x-3">
      <div className="col-start-2 col-end-[-1] text-sm font-extrabold text-text-news-title">
        {source}
      </div>
      <div className="row-start-2 row-end-3 relative bg-[url(./assets/images/placeholder.png)] bg-cover">
        <img
          src={image}
          alt={title}
          className="w-full h-18.5 pointer-events-none object-cover select-none opacity-0"
          onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
        />
      </div>
      <div className="row-start-2 row-end-4 col-start-2 text-base line-clamp-5">
        {title}
      </div>
      <div className="row-start-4 col-start-2 text-sm text-text-news-date">
        {date}
      </div>
    </div>
  );
};
