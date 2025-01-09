import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/_root/layouts/RootLayout";
import Movie from "./components/_root/pages/Movie/Movie";
import Home from "./components/_root/pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<Movie />} />
      </Route>
    </Routes>
  );
}

export default App;
