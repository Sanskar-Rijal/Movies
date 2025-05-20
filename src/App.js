import React from "react";
import Search from "./Components/search";
import Logo from "./Components/logo";
import NumResults from "./Components/numResults";
import ListBox from "./Components/ListBox";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
export default function App() {
  const [movies, setMovies] = React.useState(tempMovieData);
  return (
    <>
      <Navbar data={movies} />
      <Main data={movies} />
    </>
  );
}

function Navbar(props) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults data={props.data} />
    </nav>
  );
}

function Main(props) {
  const [isOpen2, setIsOpen2] = React.useState(true);
  function toggle2() {
    setIsOpen2((it) => !it);
  }
  return (
    <main className="main">
      <ListBox data={props.data} />
      <div className="box">
        <button className="btn-toggle" onClick={() => toggle2()}>
          {isOpen2 ? "-" : "+"}
          <div className="">hi</div>
        </button>
      </div>
    </main>
  );
}
