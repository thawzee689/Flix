import MovieCarousel from "./MovieCarousel";
import MovieCard from "./MovieCard";
import movies from "../data/movies";
import "./MovieRow.css";

function MovieRow({ title }) {
    return (
        <div className="movie-section">
            <h2 className="row-title">{title}</h2>
            <MovieCarousel>
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </MovieCarousel>
        </div>
    );
}

export default MovieRow;
