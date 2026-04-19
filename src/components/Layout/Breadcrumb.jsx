import { Link } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Fil d'ariane" className="breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            {...(item.current ? { "aria-current": "page" } : {})}
          >
            {index > 0 && (
              <span className="breadcrumbSeparator" aria-hidden="true">
                &gt;
              </span>
            )}
            {item.to && !item.current ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
