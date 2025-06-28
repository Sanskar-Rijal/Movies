import React from "react";
import { useEffect } from "react";
export function useLocalStoraege(initialState, key) {
  //state for watched movies
  //when we use callback function in UseState it should be pure function , i.e it should not have any paramateters passed to it.
  const [value, setValue] = React.useState(function () {
    const storageValue = localStorage.getItem(key); // watched is the key which we used to storage data in local storage

    console.log(storageValue);

    return storageValue ? JSON.parse(storageValue) : initialState; //we stored data as string in local storage , so we need to parse it
  });

  //useEffect to store movies on local storage
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
