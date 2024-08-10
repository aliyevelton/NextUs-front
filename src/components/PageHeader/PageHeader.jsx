
import SearchResults from "../SearchResults/SearchResults";
import { useLocation } from "react-router-dom";

function PageHeader({ filters, setFilters, setCollection, error, list, activeFilter, setActiveFilter, content }) {
  const location = useLocation();

  return (
    <div className="page__header">
      <div className="page__header-top">
        {content.map((item, index) => {
          return item.page === location.pathname ? (
            <div key={index} className="page__header-content">
              <h1>{item.header}</h1>
              <p>{item.subheader}</p>
            </div>
          ) : (
            ""
          );
        })}
        <SearchResults
          filters={filters}
          setFilters={setFilters}
          setCollection={setCollection}
          error={error}
          list={list}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>
    </div>
  );
}

export default PageHeader;
