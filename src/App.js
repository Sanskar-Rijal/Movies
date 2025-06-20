import React, { useEffect } from "react";
import Search from "./Components/search";
import Logo from "./Components/logo";
import NumResults from "./Components/numResults";
import ListBox from "./Components/ListBox";
import WatchedBox from "./Components/watchbox";
import { MovieList } from "./Components/ListBox";
import Loader from "./Components/Loader";

export default function App() {
  const [movies, setMovies] = React.useState([""]);

  //Loading animatin when data comes
  const [isLoading, setIsLoading] = React.useState(false);

  //for indicating error
  const [error, setError] = React.useState("");

  //const tempquery = "spiderman";

  //state for search query, i.e search bar
  const [query, setQuery] = React.useState("");

  //State for selected movie
  const [selectedId, setSelectedId] = React.useState(null);

  //Practice with useEffect
  // useEffect(function () {
  //   console.log("After initial render");
  // }, []);

  // useEffect(function () {
  //   console.log("After every render");
  // });

  // useEffect(
  //   function () {
  //     console.log("D");
  //   },
  //   [query]
  // );
  // console.log("during render");

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(
            `${process.env.REACT_APP_BASE_API}/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
          );

          //console.log(process.env.REACT_APP_BASE_API);

          if (!response.ok) {
            throw new Error("Something went wrong,please try again later....");
          }

          const data = await response.json();

          if (data.Response === "False") {
            throw new Error("Movie not found 😭");
          }

          setMovies(data.Search);

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query, movies.length]
  );

  //handle click on movie
  function handleSelectMovie(id) {
    setSelectedId((currid) => (currid === id ? null : id));
  }
  function CloseSelectedMovie() {
    setSelectedId(null);
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults data={movies} />
      </Navbar>
      <Main>
        <ListBox>
          {/* {isLoading ? (
            <Loader />
          ) : (
            <MovieList data={movies} key={movies.imdbID} />
          )} */}

          {isLoading && <Loader />}

          {!isLoading && !error && (
            <MovieList
              data={movies}
              key={movies.imdbID}
              onClick={handleSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <WatchedBox selectedId={selectedId} onCloseMovie={CloseSelectedMovie} />
      </Main>
    </>
  );
}

function Navbar(props) {
  return (
    <nav className="nav-bar">
      <Logo />
      {props.children}
    </nav>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}
