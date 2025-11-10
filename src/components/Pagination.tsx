import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPage } from "../redux/animeSlice";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination: React.FC = () => {
    const dispatch = useAppDispatch();
    const { page, total } = useAppSelector((state) => state.anime);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
    };

    // Page limits
    const totalPages = Math.min(Math.ceil(total / 25), 20);

    return (
        <MuiPagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            color="primary"
            size="small"
        />
    );
};

export default Pagination;
