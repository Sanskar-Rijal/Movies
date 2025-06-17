import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import StarRating from "./animation/StarRating";

// function Test() {
//   const [count, setCount] = React.useState(0);
//   return (
//     <div>
//       <StarRating color="green" onSetCount={setCount} />
//       <p>The user have rated {count} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRaiting={10} color="red" />
    <StarRating
      maxRaiting={5}
      size={40}
      color="pink"
      className="abc"
      messages={["worst", "bad", "average", "good", "best"]}
      defaultRaiting={4}
    />

    <Test /> */}
  </React.StrictMode>
);
