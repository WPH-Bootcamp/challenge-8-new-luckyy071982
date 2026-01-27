import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Navbar/Header";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { FavoritesPage } from "./pages/Favorites";
import { SearchPage } from "./pages/SearchPage";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen font-poppins flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />{" "}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
