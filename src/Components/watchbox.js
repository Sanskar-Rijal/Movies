import React, { useEffect } from "react";
import StarRating from "../animation/StarRating";
import Loader from "./Loader";

const average = (arr) => {
  if (arr.length === 0) return 0; //handle empty array
  const sum = arr.reduce((acc, it) => acc + it, 0);
  return sum / arr.length;
};

export default function WatchedBox({
  selectedId,
  onCloseMovie,
  watched,
  onAddWatched,
  ondeleteMovie,
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
              <WatchedMovieList
                watched={watched}
                ondeleteMovie={ondeleteMovie}
              />
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

function WatchedMovieList({ watched, ondeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((it) => (
        <WatchedMovie it={it} key={it.imdbID} ondeleteMovie={ondeleteMovie} />
      ))}
    </ul>
  );
}

function WatchedMovie({ it, ondeleteMovie }) {
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
        <p>
          <button
            className="btn-delete"
            onClick={() => ondeleteMovie(it.imdbID)}
          >
            X
          </button>
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

  //count ref, number of times user has clicked on the Star to rate flim
  const countRef = React.useRef(0);

  useEffect(
    function () {
      //if may run on onmount , so it may add before user has added rating
      if (count) countRef.current = countRef.current + 1;
    },
    [count]
  );

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
      countRatingDecisions: countRef.current,
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

  //useEffect to go back by pressing escape key
  useEffect(
    function () {
      function handleEscape(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          // console.log("Escape key pressed, closing movie details");
        }
      }

      //adding a event listner for escape key
      document.addEventListener("keydown", handleEscape);

      //clean up function to remove event listener
      return function () {
        document.removeEventListener("keydown", handleEscape);
        // console.log("Clean up function called, removing event listener");
      };
    },
    [onCloseMovie]
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
