import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = (
  onIntersect: () => void,
  canLoad = true,
  debounceMs = 2000
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!anchorRef.current || !canLoad || isWaiting) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isWaiting) {
          setIsWaiting(true);
          onIntersect();

          setTimeout(() => {
            setIsWaiting(false);
          }, debounceMs);
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current.observe(anchorRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [canLoad, isWaiting]);

  return anchorRef;
};
