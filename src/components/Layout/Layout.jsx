import Header from "./header";
import Footer from "./footer";
import SkipLink from "./skipLink";
import "./skipLink.css";

function Layout({ children }) {
  return (
    <>
      <SkipLink />
      <Header />
          <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;