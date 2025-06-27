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

  //state for watched movies
  //when we use callback function in UseState it should be pure function , i.e it should not have any paramateters passed to it.
  const [watched, setwatched] = React.useState(function () {
    const storageValue = localStorage.getItem("watched"); // watched is the key which we used to storage data in local storage
    return JSON.parse(storageValue); //we stored data as string in local storage , so we need to parse it
  });

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

  //handle click on movie
  function handleSelectMovie(id) {
    setSelectedId((currid) => (currid === id ? null : id));
  }
  function CloseSelectedMovie() {
    setSelectedId(null);
  }

  //function to handle watched movies
  function handleAddWatched(movie) {
    setwatched((current) => [...current, movie]);

    //Saving Data on Local Storage
    // localStorage.setItem("watched", JSON.stringify([...watched, movie])); we will save using useEffects
  }

  //function to handle deleted movies
  function handleDeletedMovie(id) {
    setwatched((current) => current.filter((movie) => movie.imdbID !== id)); //if it's ture then only it will return to the arrray
  }

  //useEffect to store movies on local storage
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  //useEffect to fetch Movies from the API
  useEffect(
    function () {
      //using abort funciton to handle api request
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(
            `${process.env.REACT_APP_BASE_API}/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
            { signal: controller.signal }
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
          setError("");
          setIsLoading(false);
        } catch (error) {
          // console.error("Error fetching movies:", error);
          if (error.name != "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }

      if (query.trim().length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      CloseSelectedMovie(); //close the selected movie when new search comes
      fetchMovies();

      return function () {
        controller.abort(); //cancelling the previous request when new one comes in.
      };

      // //fetch movies when user stops typing
      // const timeoutID = setTimeout(() => {
      //   fetchMovies();
      // }, 500);
      // return () => clearTimeout(timeoutID);
    },
    [query]
  );

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
        <WatchedBox
          selectedId={selectedId}
          onCloseMovie={CloseSelectedMovie}
          watched={watched}
          onAddWatched={handleAddWatched}
          ondeleteMovie={handleDeletedMovie}
        />
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
