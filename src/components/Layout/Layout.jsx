import Header from "./Header";
import Footer from "./Footer";
import SkipLink from "./SkipLink";
import "./skipLink.css";

function Layout({ children }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;