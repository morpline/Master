// import "bootswatch/dist/darkly/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import RecordList from "./components/RecordList";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit">
          <Route path=":id" element={<Edit />}/>
        </Route>
        <Route exact path="/contacts/create/" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;