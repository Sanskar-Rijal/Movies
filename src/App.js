import React, { useEffect } from "react";
import Search from "./Components/search";
import Logo from "./Components/logo";
import NumResults from "./Components/numResults";
import ListBox from "./Components/ListBox";
import WatchedBox from "./Components/watchbox";
import { MovieList } from "./Components/ListBox";
import Loader from "./Components/Loader";
import { useMovies } from "./custom/useMovies";
import { useLocalStoraege } from "./custom/useLocalStorage";

export default function App() {
  //const tempquery = "spiderman";

  //state for search query, i.e search bar
  const [query, setQuery] = React.useState("");

  //State for selected movie
  const [selectedId, setSelectedId] = React.useState(null);

  //custom Hooks
  const { movies, isLoading, error } = useMovies(query); //destructuring the data from useMovies custom hook
  const [watched, setwatched] = useLocalStoraege([], "watched");
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
