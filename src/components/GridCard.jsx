import "./GridCard.css";
import { GoStar, GoPlay, GoBookmarkFill, GoBookmark } from "react-icons/go";

import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/moviesSlice1";

function GridCard({ movie }) {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.movies.favorites);
    const isFavorite = favorites.includes(movie.id);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        dispatch(toggleFavorite(movie.id));
    };
    return (
        <div className="grid-card">

            <div className="card-top">
                <img src={movie.image} alt={movie.title} className="card-img" />


                <div className="card-overlay"></div>


                <div className="action-icons">

                    <button className="play-btn" aria-label="Play Movie">
                        <GoPlay size={60} />
                    </button>


                    <button
                        className={`fav ${isFavorite ? 'active' : ''}`}
                        onClick={handleFavoriteClick}
                        aria-label="Add to favorite"
                    >
                        {isFavorite ? <GoBookmarkFill size={20} /> : <GoBookmark size={20} />}
                    </button>


                    <div className="star">
                        <GoStar size={16} />
                        <span>{movie.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>


            <div className="card-bottom">
                <h3 className="card-title">{movie.title}</h3>
                <div className="card-meta">
                    <span className="type">Free</span>
                    <span className="genre">{movie.category}</span>
                    <span className="year">{movie.year}</span>
                </div>
            </div>
        </div>
    );
}

export default GridCard;