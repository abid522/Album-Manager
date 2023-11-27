import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlbumList from "./Components/AlbumList";
import AlbumItem from "./Components/AlbumItem";
import UpdateForm from "./Components/UpdateForm";

function App() {
  return (
    <div className="container text-center">
      <h1 className="display-2">Album Manager</h1>
      <p className="lead mb-5">
        A place where you can find different albums and manage them.
      </p>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AlbumList />} />
          <Route path="album/:id" element={<AlbumItem />}>
            <Route path="update" element={<UpdateForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
