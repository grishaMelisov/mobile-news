import logo from '../../assets/images/logo.svg';

export const Footer = () => {
  return (
    <div className="text-xs text-center flex flex-col items-center justify-center gap-6 py-5">
      <nav className="flex items-center gap-5">
        <a href="#">Log in</a>
        <a href="#">About us</a>
        <a href="#">Publishers</a>
        <a href="#">Sitemap</a>
      </nav>
      <div className="flex flex-col gap-2">
        <div>Povered by</div>
        <img className="w-21" src={logo} alt="besiders" />
      </div>
      <div>© 2023 Besider. Inspired by Insider</div>
    </div>
  );
};
