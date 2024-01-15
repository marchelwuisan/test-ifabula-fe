import { React, useState } from "react";
import "./home.css";
import books from "../../books.json";
import { Link, useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";
import moment from "moment";

function Home() {
  const [book, setBook] = useState(books);
  const [placeholder, setPlaceholder] = useState([]);
  const [hash, setHash] = useState("");
  const [fetchingPlaceholder, setFetchingPlaceholder] = useState(false);
  const navigate = useNavigate();

  const changeBookStatus = (index) => {
    const updatedBook = [...book];
    updatedBook[index].status =
      updatedBook[index].status === "Available" ? "Rented" : "Available";
    setBook(updatedBook);
  };

  const fetchPlaceholder = async () => {
    setFetchingPlaceholder(true);
    try {
      const response = await fetch("http://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      console.log("JSON Placeholder", data);
      setPlaceholder(data);
    } catch (error) {
      console.log("fetch failed", error.message);
    } finally {
      setFetchingPlaceholder(false);
    }
  };

  const handleHashing = () => {
    const hash = sha256(`${moment().format("YYYYMMDD")}marchelpriaifabula`);
    console.log(hash);
    setHash(hash);
  };

  const navigateToPlaceholder = () => {
    navigate("placeholder", { state: placeholder });
  };

  return (
    <div className="container">
      <h1>Home</h1>
      <div className="button-container">
        <Link to="auth">
          <button className="button">Authentication</button>
        </Link>
      </div>
      <div className="button-container">
        <button
          className="button"
          disabled={fetchingPlaceholder}
          onClick={() => fetchPlaceholder()}
        >
          {fetchingPlaceholder ? "Fetching..." : "Fetch JSON Placeholder"}
        </button>
        {placeholder.length > 0 && (
          <div>
            <p>JSON Placeholder Fetched Successfully</p>
            <button className="button" onClick={() => navigateToPlaceholder()}>
              Show
            </button>
          </div>
        )}
      </div>
      <div className="button-container">
        <button className="button" onClick={() => handleHashing()}>
          Hash
        </button>
        {hash !== "" && (
          <div>
            <p>{hash}</p>
          </div>
        )}
      </div>
      <div className="card-wrapper">
        {book.map((item, i) => (
          <div key={i} className="card-container">
            <div className="card">
              <label className="card-title">{item.title}</label>
              <label className="card-author">{item.author}</label>
              <label className="card-status">{item.status}</label>
              <button className="button" onClick={() => changeBookStatus(i)}>
                {item.status === "Available" ? "Rent" : "Return"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

