import "./ColumnCard.css";
import GridCard from "./GridCard";
import movies from "../data/movies1";
import { useState } from "react";
function ColumnCard() {

    const [activeFilter, setActiveFilter] = useState("Featured");
    return (
        <section className="catalog-section">

            <div className="container">


                <div className="catalog-filter">
                    <div className="filter-left">

                        <select className="filter-select"><option>All genres</option></select>
                        <select className="filter-select"><option>All the years</option></select>
                    </div>
                    <div className="filter-right">
                        <button
                            className={`filter-btn ${activeFilter === "Featured" ? "active" : ""}`}
                            onClick={() => setActiveFilter("Featured")}
                        >
                            Featured
                        </button>

                        <button
                            className={`filter-btn ${activeFilter === "Popular" ? "active" : ""}`}
                            onClick={() => setActiveFilter("Popular")}
                        >
                            Popular
                        </button>

                        <button
                            className={`filter-btn ${activeFilter === "Newest" ? "active" : ""}`}
                            onClick={() => setActiveFilter("Newest")}
                        >
                            Newest
                        </button>
                    </div>
                </div>



                <div className="catalog-grid">
                    {movies.map((movie) => (
                        <GridCard key={movie.id} movie={movie} />
                    ))}
                </div>


                <div className="catalog-footer">
                    <button className="load-more">LOAD MORE</button>
                </div>
            </div>
        </section>
    );
}

export default ColumnCard;