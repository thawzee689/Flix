import "./MovieCard.css";
import { IoBookmarkOutline } from "react-icons/io5";
import { GoStar } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/moviesSlice";

function MovieCard({ movie }) {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.movies.favorites);
    const isFavorite = favorites.includes(movie.id);

    return (
        <div className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-img" />

            <div className="top-icons">
                <div
                    className="fav-icon"
                    onClick={e => {
                        e.stopPropagation();
                        dispatch(toggleFavorite(movie.id));
                    }}
                >
                    <IoBookmarkOutline size={18} className={isFavorite ? "filled" : "empty"} />
                </div>

                <div className="rating-badge">
                    <GoStar size={18} />
                    <span>{movie.rating}</span>
                </div>
            </div>

            <div className="bottom-content">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="meta">
                    <span>Free</span>
                    <span>{movie.category}</span>
                    <span>{movie.year}</span>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
