import React from "react";

export function useLocalStorage(key, intialValue) {
  console.log("in useLocalStorage() before usestate");
  const [lsData, setlsData] = React.useState(() => {
    console.log("in lazy initialization");
    return JSON.parse(localStorage.getItem(key)) || intialValue;
  });

  console.log("in useLocalStorage() before useCallback");
  const setLocalStoragelsData = React.useCallback(
    (lsData) => {
      setlsData(() => {
        if (lsData) {
          localStorage.setItem(key, JSON.stringify(lsData));
        } else {
          console.log("no lsData to store in local storage");
          return;
        }

        return lsData;
      });
    },
    [key]
  );

  console.log("in useLocalStorage() before useEffect");
  React.useEffect(() => {
    setLocalStoragelsData(lsData);

    const refreshStorageFunc = (event) => {
      if (event.key === key) {
        setlsData(event.newlsData);
      }
    };
    window.addEventListener("storage", refreshStorageFunc);

    return () => {
      window.removeEventListener("storage", refreshStorageFunc);
    };
  }, [key, setLocalStoragelsData, lsData]);

  console.log(
    "before return, lsData is",
    JSON.parse(localStorage.getItem(key))
  );

  return { lsData, setlsData: setLocalStoragelsData };
}
