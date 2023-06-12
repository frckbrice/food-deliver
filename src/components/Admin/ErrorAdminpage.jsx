import { useRouteError } from "react-router-dom";
import "./style.css";

export default function ErrorAdminPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="error-page">
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
          <span>Error message: {error.status && <i> {error.status}</i>} </span>
          <i>{error.statusText}</i> <i>{error.Error}</i>
        </p>
      </div>
    </>
  );
}
