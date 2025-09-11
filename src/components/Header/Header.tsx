import { useState } from 'react';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import burgerIcon from '../../assets/icons/burger.svg';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between relative py-5.5 explore-shell">
      <BurgerMenu
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
      <button
        className="w-5 absolute l-0 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img src={burgerIcon} alt="categories" />
      </button>
      <div className="flex-1 text-center text-h1 font-bold tracking-widest">
        BESIDER
      </div>
    </div>
  );
};
