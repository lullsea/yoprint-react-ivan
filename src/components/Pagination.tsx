import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAnime, setPage} from "../redux/animeSlice";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, page, total } = useAppSelector((state) => state.anime);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  const totalPages = Math.min(Math.ceil(total / 25), 20); // Jikan limits pages

  return (
    <MuiPagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      color="primary"
    />
  );
};

export default Pagination;
