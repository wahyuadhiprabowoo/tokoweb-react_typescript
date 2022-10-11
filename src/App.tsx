import Routes from "./routes";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      {loading === false ? (
        <Routes />
      ) : (
        <div className="loader-container">
          <CircularProgress color="secondary" size={96} />
        </div>
      )}
    </>
  );
}
export default App;
