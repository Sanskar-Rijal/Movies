import React, { useEffect } from "react";
import Search from "./Components/search";
import Logo from "./Components/logo";
import NumResults from "./Components/numResults";
import ListBox from "./Components/ListBox";
import WatchedBox from "./Components/watchbox";
import { MovieList } from "./Components/ListBox";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const KEY = "35e8075d";

export default function App() {
  const [movies, setMovies] = React.useState([""]);
  console.log(process.env.REACT_APP_API_KEY);
  //Loading animatin when data comes
  const [isLoading, setIsLoading] = React.useState(true);

  //for indicating error
  const [error, setError] = React.useState("");

  const query = "absdbfska";

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        console.log(process.env.API_KEY);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API}/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong,please try again later....");
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error("Movie not found 😭");
        }

        setMovies(data.Search);

        console.log(data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <Navbar>
        <Search />
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
            <MovieList data={movies} key={movies.imdbID} />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <WatchedBox />
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

//Loading animation
function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}
