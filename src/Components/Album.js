import { Link } from "react-router-dom";
import styles from "./Album.module.css";

function Album({ album }) {
  return (
    <Link to={`album\\${album.id}`} className="album-link">
      <div className={`card m-2 ${styles.effect}`}>
        <div className="card-body">
          <h3>{album.id}</h3>
          <p>{album.title}</p>
        </div>
      </div>
    </Link>
  );
}

export default Album;
