import { useRouteError } from "react-router-dom";
import Header from "./components/Layout/Header";
import classes from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div id={classes["error-page"]}>
        <Header />
        <h2 className={classes.h2}>Oops!</h2>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          You may call{" "}
          <strong>
            <b>Avom Brice</b>
          </strong>{" "}
          to come and handle it...{" "}
        </p>
        <p>
          <span>Error message: {error.status && <i> {error.status}</i>} </span>
          <i>{error.statusText}</i> <i>{error.Error}</i>
        </p>
      </div>
    </>
  );
}
