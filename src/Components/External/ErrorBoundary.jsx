import React, { useState } from "react";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const handleResetError = () => {
    setHasError(false);
  };

  if (hasError) {
    return (
      <div>
        <h2>Something went wrong.</h2>
        <button onClick={handleResetError}>Try again</button>
      </div>
    );
  }

  return children;
}

export default ErrorBoundary;
