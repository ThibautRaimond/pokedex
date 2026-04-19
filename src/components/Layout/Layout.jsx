import Header from "./Header";
import Footer from "./Footer";
import SkipLink from "./SkipLink";
import Breadcrumb from "./Breadcrumb";
import { useBreadcrumb } from "./BreadcrumbContext";
import "./SkipLink.css";

function Layout({ children }) {
  const { items } = useBreadcrumb();

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content">
        {items.length > 0 && <Breadcrumb items={items} />}
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;