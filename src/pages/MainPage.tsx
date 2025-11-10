import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAnime, setQuery, setPage } from "../redux/animeSlice";
import useDebounce from "../hooks/useDebounce";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";

const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error, query, page, total } = useAppSelector(
        (state) => state.anime,
    );
    const [searchTerm, setSearchTerm] = useState(query);
    const prevQuery = useRef(query);

    // Debounce search input
    const debouncedSearch = useDebounce(searchTerm, 250);

    // Fetch anime whenever query or page changes
    useEffect(() => {
        if (debouncedSearch.trim() !== "") {
            dispatch(
                fetchAnime({ mode: "search", query: debouncedSearch, page }),
            );
        } else if (!query)
            dispatch(fetchAnime({ query: "", mode: "top", page }));
    }, [debouncedSearch, page, dispatch]);

    useEffect(() => {
        // Only set page to 1 when entering a new serach term
        if (query !== prevQuery.current) {
            dispatch(setPage(1));
            prevQuery.current = query;
        }
    }, [query, dispatch]);

    useEffect(() => {
        dispatch(setQuery(searchTerm));
    }, [searchTerm, dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
            <Typography variant="h4" gutterBottom>
                Anime Search
            </Typography>

            <TextField
                label="Search Anime"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ mb: 3 }}
            />

            {/* Loading State */}
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Empty State */}
            {!loading &&
                !error &&
                items.length === 0 &&
                debouncedSearch.trim() !== "" && (
                    <Typography align="center" sx={{ mt: 3 }}>
                        No results found for “{debouncedSearch}”
                    </Typography>
                )}

            {!loading && (
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: "center"}}>
                    {items.map((anime: any) => (
                        <Box
                            sx={{width: '23%', minWidth: 240}}
                        >
                            <AnimeCard anime={anime} />
                        </Box>
                    ))}
                </Box>
            )}

            {total > 0 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Pagination />
                </Box>
            )}
        </Box>
    );
};

export default MainPage;
