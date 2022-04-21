import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";

function App() {

  const apiKey=process.env.REACT_APP_IMDB_CLONE

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
      
        <Route
          path="/"
          element={
            <>
              <Banner api={apiKey}/>
              <Movies api={apiKey}/>
            </>
          }
        />

        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
