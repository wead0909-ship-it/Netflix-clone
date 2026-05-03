// import './App.css';
// import Home from './Pages/Home/Home';

// function App() {
//   return (
//     <div className="App">
      
//       <Home/>

//     </div>
//   );
// }

// export default App;


import "./App.css";
import Home from "./Pages/Home/Home";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/tv" element={<Home />} />
        <Route path="/latest" element={<Home />} />
        <Route path="/mylist" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;