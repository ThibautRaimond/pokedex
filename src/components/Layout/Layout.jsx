import Header from "./Header";
import Footer from "./Footer";
import SkipLink from "./SkipLink";
import "./SkipLink.css";

function Layout({ children }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex="-1">
        <div
          id="main-anchor"
          tabIndex="-1"
          aria-label="Début du contenu principal"
          className="sr-only"
        />
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;