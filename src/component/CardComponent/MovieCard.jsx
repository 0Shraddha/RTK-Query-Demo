import { useRef, useState } from "react";
import EditModal from "../Modal/EditModal";

function MovieCard({ movie, deleteMovie }) {
  const dialogRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(movie);

  const handleSelectedMovie = () => {
    setSelectedMovie(movie);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
    document.body.style.overflow = 'hidden';
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    document.body.style.overflow = 'visible';
  };

  return (
    <div className="movie-wrapper" key={movie.id}>
      <div className="img-wrapper">
        <img src={movie.thumbnail} alt={`${movie.title} poster`} />
      </div>
      <h3>
        {movie.title} ({movie.year})
      </h3>
      <p>{movie.description}</p>
      <div className="button-wrapper">
        <button onClick={handleSelectedMovie}>Edit</button>
        <button onClick={() => deleteMovie({ id: movie.id })}>Delete</button>
      </div>

      <EditModal
        dialogRef={dialogRef}
        selectedMovie={selectedMovie}
        closeDialog={closeDialog}
      />
    </div>
  );
}

export default MovieCard;
