import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-text">
        <h1>Page not found</h1>
        <h2>Oops, something went wrong.</h2>
        <a className="custom-button" href={"/"}>
          Go Back
        </a>
      </div>
    </div>
  );
};
