import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.jikan.moe/v4";

interface AnimeState {
    items: any[];
    loading: boolean;
    error: string | null;
    page: number;
    total: number;
    query: string;
    mode: "top" | "query";
}

const initialState: AnimeState = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    total: 0,
    query: "",
    mode: "top"
};

let abortController: AbortController | null = null;

export const fetchAnime = createAsyncThunk(
    "anime/fetchAnime",
    async ({ query, page, mode }: { query: string; page: number; mode?: "top" | "search"}) => {
        if(abortController){
            abortController.abort();
        }
        abortController = new AbortController();

        const endpoint = (mode === "search" && query) ? `${API_URL}/anime?q=${query}&page=${page}` : `${API_URL}/top/anime?page=${page}`;
        const res = await axios.get(endpoint, {signal: abortController.signal});
        return res.data;
    },
);

const animeSlice = createSlice({
    name: "anime",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnime.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnime.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.total = action.payload.pagination?.items?.total ?? 0;
            })
            .addCase(fetchAnime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Error fetching anime";
            });
    },
});

export const { setQuery, setPage } = animeSlice.actions;
export default animeSlice.reducer;
