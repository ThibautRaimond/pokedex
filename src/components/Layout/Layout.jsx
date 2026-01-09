import Navbar from "./Navbar";
import Footer from "./Footer";
import SkipLink from "./SkipLink";
import "./SkipLink.css";

function Layout({ children }) {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex="-1">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;