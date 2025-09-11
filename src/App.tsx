import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import spinner from './assets/images/spinner.svg';

function App() {
  return (
    <div className="flex flex-col items-center">
      <header className="sticky w-full top-0 z-50 border-b border-divider-color bg-bg-color">
        <Header />
      </header>
      <main className="explore-shell flex-1 flex flex-col items-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non aspernatur
        corporis iusto error accusantium. Earum quaerat officiis harum ducimus
        deleniti vel eum reiciendis cumque accusantium aliquam, dignissimos
        deserunt, quia dolore. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Amet, nisi eum nostrum rem rerum provident nulla saepe
        id ipsam omnis magni beatae magnam laborum repudiandae animi voluptatum
        quae iusto! Dolore. quae iusto! Dolore. quae iusto! Dolore. quae iusto!
        Dolore. quae iusto! Dolore. quae iusto! Dolore. quae iusto! Dolore. quae
        iusto! Dolore. quae iusto! Dolore. quae iusto! Dolore. quae iusto!
        Dolore.Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
        aspernatur corporis iusto error accusantium. Earum quaerat officiis
        harum ducimus deleniti vel eum reiciendis cumque accusantium aliquam,
        dignissimos deserunt, quia dolore. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Amet, nisi eum nostrum rem rerum provident
        nulla saepe id ipsam omnis magni beatae magnam laborum repudiandae animi
        voluptatum quae iusto! Dolore. quae iusto! Dolore. quae iusto! Dolore.
        quae iusto! Dolore. quae iusto! Dolore. quae iusto! Dolore. quae iusto!
        Dolore. quae iusto! Dolore. quae iusto! Dolore. quae iusto! Dolore. quae
        iusto! Dolore.Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Non aspernatur corporis iusto error accusantium. Earum quaerat officiis
        harum ducimus deleniti vel eum reiciendis cumque accusantium aliquam,
        dignissimos deserunt, quia dolore. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Amet, nisi eum nostrum rem rerum provident
        nulla saepe id ipsam omnis magni beatae magnam laborum repudiandae animi
        voluptatum quae iusto! Dolore. quae iusto! Dolore. quae iusto! Dolore.
        quae iusto! Dolore. quae iusto! Dolore. quae iusto! Dolore. quae iusto!
        Dolore. quae iusto! Dolore. quae iusto! Dolore. quae iusto! Dolore. quae
        iusto! Dolore.
      </main>
      <img src={spinner} alt="Loading" className="w-9 animate-spin py-10" />
      <footer className="explore-shell">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
