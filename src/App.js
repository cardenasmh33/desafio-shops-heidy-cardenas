import { BrowserRouter } from "react-router";

import SearchBar from './components/SearchBar';
import './App.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header"><SearchBar /></header>
        <div className="App-container"></div>
      </BrowserRouter>
    </div>
  );
}
export default App;
