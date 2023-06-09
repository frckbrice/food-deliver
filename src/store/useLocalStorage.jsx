import React from "react";

export function useLocalStorage(key, intialValue) {
 
  console.log("in useLocalStorage()");
  const [value, setValue] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || intialValue
  );

  const setLocalStorageValue = React.useCallback((value) => {
    setValue(() => {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      }else {
        console.log('no value to store in local storage')
        return;
      }

      return value;
    });
  },[key]);

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
