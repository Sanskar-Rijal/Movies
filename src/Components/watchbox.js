import React, { useEffect } from "react";
import StarRating from "../animation/StarRating";
import Loader from "./Loader";

const average = (arr) => {
  const sum = arr.reduce((acc, it) => acc + it, 0);
  return sum / arr.length;
};

export default function WatchedBox({
  selectedId,
  onCloseMovie,
  watched,
  onAddWatched,
}) {
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
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={onCloseMovie}
              onAddWatched={onAddWatched}
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
  ).toFixed(2);

  const avgUserRating = average(
    props.watched.map((movie) => movie.userRating)
  ).toFixed(2);
  const avgRuntime = average(
    props.watched.map((movie) => movie.runtime)
  ).toFixed(2);
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
      <img src={it.poster} alt={it.title} />
      <h3>{it.title}</h3>
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
function SelectedMovie({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = React.useState({});

  //loading animation
  const [isLoading, setIsLoading] = React.useState(false);

  //to Get number of Stars Clicked
  const [count, setCount] = React.useState(0);

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
    imdbRating,
    Genre: genre,
  } = movie;

  //check if movie is already added
  const checkMovies = watched.some((item) => item.imdbID === selectedId);
  console.log(checkMovies);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      userRating: count,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie(); // Reset selectedId after adding to watched
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API}/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
        );
        const data = await response.json();
        // console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  ); //we want to happen each time the component renders , so it's empty dependency array

  //useEffect to change document title
  useEffect(
    function () {
      if (!title) return; //If no title is available then return early
      document.title = `Movie | ${title}`;

      //clean up function
      return function () {
        document.title = "Movie";
        console.log("Clean up function called");
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onCloseMovie()}>
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
                <span>🌟</span> {imdbRating} IMDb raiting
              </p>
            </div>
          </header>

          <section>
            {!checkMovies && (
              <div className="rating">
                <StarRating maxRaiting={10} size={22} onSetCount={setCount} />

                {count > 0 && (
                  <button className="btn-add" onClick={() => handleAdd()}>
                    + Add to List
                  </button>
                )}
              </div>
            )}
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
