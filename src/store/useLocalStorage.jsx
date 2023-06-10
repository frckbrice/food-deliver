import React from "react";

export function useLocalStorage(key, intialValue) {
  console.log("in useLocalStorage() before usestate");
  const [value, setValue] = React.useState(() => {
    console.log("in lazy initialization");
    return JSON.parse(localStorage.getItem(key)) || intialValue;
  });

  console.log("in useLocalStorage() before useCallback");
  const setLocalStorageValue = React.useCallback(
    (value) => {
      setValue(() => {
        if (value) {
          localStorage.setItem(key, JSON.stringify(value));
        } else {
          console.log("no value to store in local storage");
          return;
        }

        return value;
      });
    },
    [key]
  );

  console.log("in useLocalStorage() before useEffect");
  React.useEffect(() => {
    setLocalStorageValue(value);

    const refreshStorageFunc = (event) => {
      if (event.key === key) {
        setValue(event.newValue);
      }
    };
    window.addEventListener("storage", refreshStorageFunc);

    return () => {
      window.removeEventListener("storage", refreshStorageFunc);
    };
  }, [key, setLocalStorageValue, value]);

  return { value, setValue: setLocalStorageValue };
}
