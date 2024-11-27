import { BrowserRouter, Routes, Route } from "react-router";

import SearchBar from './components/SearchBar';
import ProductListPage from "./components/PLP";
import ProductDetailPage from "./components/PDP";
import './App.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header"><SearchBar /></header>
        <div className="App-container">
          <Routes>
            <Route path="/items" element={<ProductListPage />} />
            <Route path="/items/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
