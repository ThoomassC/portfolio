import Footer from "./components/Footer";
import SiteHeader from "./components/SiteHeader";
import { useDeepLinkScroll } from "./hooks/useDeepLinkScroll";
import Home from "./pages/Home";

function App() {
  useDeepLinkScroll();

  return (
    <>
      <a className="skip-link" href="#contenu-principal">
        Aller au contenu principal
      </a>
      <SiteHeader />
      <Home />
      <Footer />
    </>
  );
}

export default App;
