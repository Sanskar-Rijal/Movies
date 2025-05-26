import React from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const StarStyle = {
  display: "flex",
};

StarRating.prototype = {
  maxRaiting: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRaiting: PropTypes.number,
  onSetCount: PropTypes.func, //onSetCount is a required prop function
};

export default function StarRating({
  maxRaiting = 5,
  color = "#fcc419",
  size = 28,
  className = "",
  messages = [],
  defaultRaiting = 0,
  onSetCount,
}) {
  //making a state for raiting
  const [raiting, setRaiting] = React.useState(defaultRaiting);
  const [tempRaiting, setTempRaiting] = React.useState(0);
  function handleRaiting(raiting) {
    setRaiting(raiting + 1); //array value always starts from 0 so when user click on 1st star it will be 0+1 and raiting will be 1
    //if we want to get the value of raiting in parent component
    onSetCount(raiting + 1);
  }

  function handleMouseHoverIn(raiting) {
    setTempRaiting(raiting + 1);
  }

  function handleMouseHoverout(raiting) {
    setTempRaiting(0);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize: `${size}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      {/* creating Stars */}
      <div style={StarStyle}>
        {Array.from({ length: maxRaiting }, (_, index) => (
          <Star
            key={index}
            onRate={() => handleRaiting(index)}
            full={tempRaiting ? tempRaiting >= index + 1 : raiting >= index + 1}
            onMouseEnter={() => handleMouseHoverIn(index)}
            onMouseLeave={() => handleMouseHoverout(index)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRaiting
          ? messages[tempRaiting ? tempRaiting - 1 : raiting - 1]
          : tempRaiting || raiting || ""}
      </p>
    </div>
  );
}

function Star({ onRate, full, onMouseEnter, onMouseLeave, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
