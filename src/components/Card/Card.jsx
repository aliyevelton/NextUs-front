import { Link } from "react-router-dom";

function Card({ list, path }) {
  const { title, company } = list;
  
  console.log(path);
  
  return (
    <div className="card">
      <div className="card__top">
        <div className="card__header">
          <h1>{title}</h1>
          <div>
            <img
              src={
                company?.logo === null
                  ? "https://data-assets.ams3.digitaloceanspaces.com/electriciansearch-co-uk/logos/default-logo.png?rand=415"
                  : `https://aliyevelton-001-site1.ltempurl.com/images/companies/${company?.logo}`
              }
              alt={"company" + "Logo"}
            />
            <p>{company?.name}</p>
          </div>
        </div>
        <Link to={`/${path}/${list?.id}`}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M8.25 16.5L13.75 11L8.25 5.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
      <div className="card__bottom">
        <img src={`https://aliyevelton-001-site1.ltempurl.com/images/companies/${company?.logo}`} alt={list?.title} />
      </div>
    </div>
  );
}

export default Card;
