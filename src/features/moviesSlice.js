import { createSlice } from "@reduxjs/toolkit";
import moviesData from "../data/movies";

const moviesSlice = createSlice({
    name: "movies",

    initialState: {
        list: moviesData,
        favorites: [],
        search: ""
    },

    reducers: {

        toggleFavorite: (state, action) => {

            const id = action.payload;

            if (state.favorites.includes(id)) {
                state.favorites =
                    state.favorites.filter(fav => fav !== id);
            } else {
                state.favorites.push(id);
            }
        },

        setSearch: (state, action) => {
            state.search = action.payload;
        }

    }
});

export const {
    toggleFavorite,
    setSearch
} = moviesSlice.actions;

export default moviesSlice.reducer;
