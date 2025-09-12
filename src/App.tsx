import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import spinner from './assets/images/spinner.svg';

function App() {
  return (
    <div className="flex flex-col items-center">
      <header className="sticky w-full top-0 z-50 border-b border-divider-color bg-bg-color">
        <Header />
      </header>
      <main className="explore-shell w-full flex-1 flex flex-col items-center"></main>
      <img src={spinner} alt="Loading" className="w-9 animate-spin py-10" />
      <footer className="explore-shell">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
