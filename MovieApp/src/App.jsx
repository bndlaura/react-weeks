import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Header from "./components/Header/Header";
import "./App.css";

export default function App() {
    return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}
