import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Categories({ filters, setFilters, setCollection, activeFilter, setActiveFilter }) {
  const [categories, setCategories] = useState([]);

  const location = useLocation();

  const path = location.pathname.split("/").filter((x) => x !== "");
  let index = path[path.length - 1];

  index = index.charAt(0).toUpperCase() + index.slice(1).toLowerCase();

  index = index.slice(0, -1);

  async function handleFilterChange(e, id) {
    console.log(e.target.checked);

    let updatedFilters;
    if (!e.target.checked) {
      updatedFilters = filters.filter((sfilter) => { return sfilter != id });
      setFilters(updatedFilters);
    }
    else {
      updatedFilters = [...filters, id];
      setFilters(updatedFilters);
    }
  }

  console.log(categories);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`https://aliyevelton-001-site1.ltempurl.com/api/${index}Categories`);
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
  }, [index]);

  return (
    <div className={`categories ${activeFilter ? "active-categories" : ""}`}>
      {categories?.map((category, index) => (
        <div key={index} className="categories__row">
          <div className="categories__options">
            <label key={index}>
              <input type="checkbox" onChange={(e) => handleFilterChange(e, category.id)} />
              {category.name}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;
