import Router from "./components/Router";
import Layout from "./components/Layout/Layout";
import { BreadcrumbProvider } from "./components/Layout/BreadcrumbContext";

const App = () => {
  return (
    <BreadcrumbProvider>
      <Layout>
        <Router />
      </Layout>
    </BreadcrumbProvider>
  );
};

export default App;
