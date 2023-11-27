import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function UpdateForm() {
  const currentAlbum = useOutletContext();
  const [title, setTitle] = useState(currentAlbum.title);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${currentAlbum.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: currentAlbum.userId,
          id: currentAlbum.id,
          title,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await res.json();
    //UPDATE ALBUM
    console.log(data);
    navigate("/");
  }

  return (
    <form style={{ width: "50%", margin: "0 auto" }}>
      <div className="mb-3 mt-3">
        <label htmlFor="comment">Title:</label>
        <textarea
          className="form-control"
          rows="5"
          id="comment"
          name="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        onClick={onSubmit}
      >
        Save
      </button>
    </form>
  );
}

export default UpdateForm;
