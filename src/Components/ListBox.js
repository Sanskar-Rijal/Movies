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
      {isOpen1 && (
        <ul className="list">
          {props.data.map((it) => (
            <li key={it.imdbID}>
              <img src={it.Poster} alt={it.Title} />
              <h3>{it.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{it.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
