import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { NEWS_CATEGORIES } from '../../store/news/news.interface';

import cross from '../../assets/icons/cross.svg';
import { useNewsActions } from '../../store/hooks/useNewsActions';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BurgerMenu({ isOpen, onClose }: BurgerMenuProps) {
  const { setFilter } = useNewsActions();

  const handleCategoryClick = (cat: string) => {
    setFilter(cat);
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={onClose}>
        <DialogPanel className="fixed flex flex-col right-0 top-0 p-5 h-full w-full bg-white">
          <button onClick={onClose} className="self-end">
            <img src={cross} alt="close" className="w-5" />
          </button>

          <div className="flex-col flex-1 flex justify-center gap-7">
            {Object.values(NEWS_CATEGORIES).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="text-h2 font-bold text-left tracking-widest"
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </Transition>
  );
}
