import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <a className="skip-link" href="#contenu-principal">
        Aller au contenu principal
      </a>
      <Home />
      <Footer />
    </>
  );
}

export default App;
