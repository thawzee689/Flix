import "./App.css";
import Navbar1 from "./components/Navbar1";
import MovieRow from "./components/MovieRow";
import ColumnCard from "./components/ColumnCard";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="app">


        <Navbar1 />
        <MovieRow />
        <ColumnCard />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
