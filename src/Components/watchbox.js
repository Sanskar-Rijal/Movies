import React, { useEffect } from "react";
import StarRating from "../animation/StarRating";
import Loader from "./Loader";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) => {
  const sum = arr.reduce((acc, it) => acc + it, 0);
  return sum / arr.length;
};

export default function WatchedBox({ selectedId, onCloseMovie }) {
  const [watched, Setwatched] = React.useState(tempWatchedData);

  const [isOpen2, setIsOpen2] = React.useState(true);
  function toggle2() {
    setIsOpen2((it) => !it);
  }

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => toggle2()}>
        {isOpen2 ? "-" : "+"}
      </button>
      {isOpen2 && (
        <>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={onCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </>
      )}
    </div>
  );
}

function WatchedSummary(props) {
  const avgImdbRating = average(
    props.watched.map((movies) => {
      return movies.imdbRating;
    })
  );

  const avgUserRating = average(props.watched.map((movie) => movie.userRating));
  const avgRuntime = average(props.watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies You Have Watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{props.watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList(props) {
  return (
    <ul className="list">
      {props.watched.map((it) => (
        <WatchedMovie it={it} key={it.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ it }) {
  return (
    <li>
      <img src={it.Poster} alt={it.Title} />
      <h3>{it.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{it.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{it.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{it.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

//Movie Details Component
function SelectedMovie({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = React.useState({});

  //loading animation
  const [isLoading, setIsLoading] = React.useState(false);

  //Destructuring the movie object
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    imdbRating: imdbRaiting,
    Genre: genre,
  } = movie;

  console.log(title);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API}/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
        );
        const data = await response.json();
        //  console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  ); //we want to happen each time the component renders , so it's empty dependency array

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>

            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🌟</span> {imdbRaiting} IMDb raiting
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating maxRaiting={10} size={22} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
