import { useEffect, useState } from "react";
import Album from "./Album";
import Loader from "./Loader";

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  useEffect(function () {
    async function fetchAlbums() {
      try {
        setIsLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/albums");
        const data = await res.json();
        //READ ALBUMS
        setAlbums(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching albums :(");
      }
    }
    fetchAlbums();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({
        userId: 11,
        id,
        title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    //CREATE ALBUM
    console.log(data);
  }

  return (
    <div>
      <form method="POST">
        <div className="form-group mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-success mb-4"
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          {albums.map((album) => (
            <div className="col-md-4" key={album.id}>
              <Album album={album} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlbumList;
