import React from "react";
import { useEffect } from "react";

export function useMovies(query) {
  //to store movies from the API
  const [movies, setMovies] = React.useState([""]);

  //Loading animatin when data comes
  const [isLoading, setIsLoading] = React.useState(false);

  //for indicating error
  const [error, setError] = React.useState("");

  //useEffect to fetch Movies from the API
  useEffect(
    function () {
      // callback?.(); //by using ? we are checking if calback exits or not , if it exits then we are calling it
      //callback is usuallly onCloseMovie

      //using abort funciton to handle api request
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(
            `${process.env.REACT_APP_BASE_API}/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
            { signal: controller.signal }
          );

          //console.log(process.env.REACT_APP_BASE_API);

          if (!response.ok) {
            throw new Error("Something went wrong,please try again later....");
          }

          const data = await response.json();

          if (data.Response === "False") {
            throw new Error("Movie not found 😭");
          }

          setMovies(data.Search);
          setError("");
          setIsLoading(false);
        } catch (error) {
          // console.error("Error fetching movies:", error);
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }

      if (query.trim().length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      // CloseSelectedMovie(); //close the selected movie when new search comes
      fetchMovies();

      return function () {
        controller.abort(); //cancelling the previous request when new one comes in.
      };

      // //fetch movies when user stops typing
      // const timeoutID = setTimeout(() => {
      //   fetchMovies();
      // }, 500);
      // return () => clearTimeout(timeoutID);
    },
    [query]
  );
  return { movies, isLoading, error }; //returning as objects
}
