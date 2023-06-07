import { useRouteError } from "react-router-dom";
import Header from "./components/Layout/Header";
import classes from './ErrorPage.module.css'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header />
     
        <div id={classes["error-page"]}>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            You may call{" "}
            <strong>
              <b>Avom Brice</b>
            </strong>{" "}
            to come and handle it...{" "}
          </p>
          <p>
            <span>Error message: </span><i>{(error.statusText || error.message)} </i>
           
          </p>
        </div>
    
    </>
  );
}
