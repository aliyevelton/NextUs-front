import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResults({ filters, setFilters, setCollection, error, list, activeFilter, setActiveFilter }) {
  const inpRef = useRef();

  const location = useLocation();

  const path = location.pathname.split("/").filter((x) => x !== "");
  let index = path[path.length - 1];

  index  = index.charAt(0).toUpperCase() + index.slice(1).toLowerCase();
  
  console.log(index);
  

  const searchUser = useCallback(async () => {
    // try {
    //   const response = await axios.get(`https://aliyevelton-001-site1.ltempurl.com/api/${index}?title=${inpRef.current.value}`);
    //   setCollection(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
    let updatedFilters = filters.filter((sfilter) => {return typeof sfilter != "string"});
    updatedFilters.push(inpRef.current.value);
    setFilters(updatedFilters);
  }, [filters, setFilters]);

  // useEffect(() => {
  //   searchUser();
  // }, [searchUser]);

  return (
    <div className="search__results">
      <span
        className={`search__results-filter ${activeFilter ? "active-filter" : ""
          }`}
        onClick={() => setActiveFilter(!activeFilter)}
      >
        {activeFilter ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M16.3047 9.75H5.95833C4.46256 9.75 3.25 8.53744 3.25 7.04167C3.25 5.5459 4.46256 4.33333 5.95833 4.33333H16.3047M9.69528 21.6667H20.0417C21.5374 21.6667 22.75 20.4541 22.75 18.9583C22.75 17.4626 21.5374 16.25 20.0417 16.25H9.69528M3.25 18.9583C3.25 21.0524 4.94759 22.75 7.04167 22.75C9.13575 22.75 10.8333 21.0524 10.8333 18.9583C10.8333 16.8643 9.13575 15.1667 7.04167 15.1667C4.94759 15.1667 3.25 16.8643 3.25 18.9583ZM22.75 7.04167C22.75 9.13575 21.0524 10.8333 18.9583 10.8333C16.8643 10.8333 15.1667 9.13575 15.1667 7.04167C15.1667 4.94759 16.8643 3.25 18.9583 3.25C21.0524 3.25 22.75 4.94759 22.75 7.04167Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M16.3047 9.75H5.95833C4.46256 9.75 3.25 8.53744 3.25 7.04167C3.25 5.5459 4.46256 4.33333 5.95833 4.33333H16.3047M9.69528 21.6667H20.0417C21.5374 21.6667 22.75 20.4541 22.75 18.9583C22.75 17.4626 21.5374 16.25 20.0417 16.25H9.69528M3.25 18.9583C3.25 21.0524 4.94759 22.75 7.04167 22.75C9.13575 22.75 10.8333 21.0524 10.8333 18.9583C10.8333 16.8643 9.13575 15.1667 7.04167 15.1667C4.94759 15.1667 3.25 16.8643 3.25 18.9583ZM22.75 7.04167C22.75 9.13575 21.0524 10.8333 18.9583 10.8333C16.8643 10.8333 15.1667 9.13575 15.1667 7.04167C15.1667 4.94759 16.8643 3.25 18.9583 3.25C21.0524 3.25 22.75 4.94759 22.75 7.04167Z"
              stroke="#03050B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <div className="search__results-input">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <input
          ref={inpRef}
          type="text"
          placeholder="Search for jobs..."
          onChange={searchUser}
        />
      </div>
      <div className="search__results-found">
        <p>
          <span>{error ? 0 : list.length} </span> Results Found
        </p>
      </div>
    </div>
  );
}

export default SearchResults;
