import React from "react";

export default function ListBox(props) {
  const [isOpen1, setIsOpen1] = React.useState(true);

  function toggle1() {
    setIsOpen1((it) => !it);
  }

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => toggle1()}>
        {isOpen1 ? "-" : "+"}
      </button>
      {isOpen1 && <MovieList data={props.data} key={props.imdbID} />}
    </div>
  );
}

function MovieList(props) {
  return (
    <ul className="list">
      {props.data.map((it) => (
        <Movie data={it} key={props.data.imdbID} />
      ))}
    </ul>
  );
}

function Movie(props) {
  return (
    <li>
      <img src={props.data.Poster} alt={props.data.Title} />
      <h3>{props.data.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{props.data.Year}</span>
        </p>
      </div>
    </li>
  );
}
