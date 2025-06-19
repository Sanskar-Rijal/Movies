import React from "react";

export default function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = React.useState(true);

  function toggle1() {
    setIsOpen1((it) => !it);
  }

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => toggle1()}>
        {isOpen1 ? "-" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

export function MovieList(props) {
  return (
    <ul className="list list-movies">
      {props.data.map((it) => (
        <Movie data={it} key={props.data.imdbID} onsel={props.onClick} />
      ))}
    </ul>
  );
}

function Movie(props) {
  return (
    <li onClick={() => props.onsel(props.data.imdbID)}>
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
