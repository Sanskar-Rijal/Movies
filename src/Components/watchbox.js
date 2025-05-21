import React from "react";

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

export default function WatchedBox(props) {
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
          <WatchedSummary data={props.data} watched={watched} />
          <WatchedMovieList watched={watched} />
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
