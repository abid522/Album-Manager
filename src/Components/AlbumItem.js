import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

function AlbumItem() {
  const [currentAlbum, setCurrentAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(
    function () {
      async function fetchAlbum() {
        setIsLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${id}`
        );
        const data = await res.json();
        setCurrentAlbum(data);
        setIsLoading(false);
      }
      fetchAlbum();
    },
    [id]
  );

  async function onDelete() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${id}`,
      { method: "DELETE" }
    );
    const data = await res.json();
    //DELETE ALBUM
    console.log(data);
    navigate("/");
  }

  async function onUpdate(title) {
    navigate("update");
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="card" style={{ width: "50%", margin: "0 auto" }}>
            <div className="card-body">
              <h4 className="card-title">id: {currentAlbum.id}</h4>
              <p className="card-text">{currentAlbum.title}</p>
              <div className="d-flex justify-content-center">
                <div className="m-1">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onUpdate(currentAlbum.title)}
                  >
                    Update
                  </button>
                </div>
                <div className="m-1">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <Outlet context={currentAlbum} />
        </>
      )}
    </div>
  );
}

export default AlbumItem;
