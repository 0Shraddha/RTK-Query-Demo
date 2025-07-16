import { useState } from "react";
import { useUpdateMovieMutation } from "../../state/movies/movieApiSlice";

function EditModal({ dialogRef, selectedMovie, closeDialog }) {
  const [title, setTitle] = useState(selectedMovie.title);
  const [year, setYear] = useState(selectedMovie.year);
  const [description, setDescription] = useState(selectedMovie.description);
  const [thumbnail, setThumbnail] = useState(selectedMovie.thumbnail);

  const [updateMovie] = useUpdateMovieMutation();

  async function handleUpdateMovie(e) {
    e.preventDefault();
    try {
      await updateMovie({
        title,
        description,
        year: Number(year),
        thumbnail,
        id: selectedMovie.id,
      });
      closeDialog();
    } catch (error) {
      alert(`${error} occurred`);
    }
  }

  return (
    <dialog ref={dialogRef} className="modal-dialog">
      <form onSubmit={handleUpdateMovie}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year of release:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Image URL:</label>
          <input
            type="text"
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
      <button className="close-btn" onClick={closeDialog}>
        Close
      </button>
    </dialog>
  );
}

export default EditModal;
