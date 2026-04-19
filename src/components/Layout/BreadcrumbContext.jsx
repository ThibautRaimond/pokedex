import { createContext, useContext, useState } from "react";

const BreadcrumbContext = createContext(null);

export const BreadcrumbProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => useContext(BreadcrumbContext);
