import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    LinearProgress,
    Box,
    Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";

interface AnimeCardProps {
    anime: any;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
    const [score, setScore] = React.useState<number>(0);

    React.useEffect(() => {
        setTimeout(() => {
            setScore(anime.score)
        }, 50)
    }, [])
    return (
        <Card
            sx={{
                height: "100%",
                width: "100%",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.02)" },
            }}
        >
            <Link
                to={`/anime/${anime.mal_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <CardMedia
                    component="img"
                    height="300"
                    image={anime.images?.jpg?.image_url}
                    alt={anime.title}
                />
                <CardContent>
                    <Tooltip title={anime.title} arrow placement="top">
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {anime.title}
                    </Typography>
                    </Tooltip>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="text.secondary">
                            Score:
                        </Typography>
                        <Tooltip
                            title={anime.score ?? "N/A"}
                            arrow
                            placement="top"
                        >
                            <LinearProgress
                                variant="determinate"
                                value={score ? score * 10 : 0}
                                sx={{
                                    width: "100%",
                                    height: 8,
                                    borderRadius: 5,
                                    cursor: "pointer",
                                    bgcolor: "grey.400",
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor:
                                            anime.score == null
                                                ? "grey"
                                                : anime.score >= 8
                                                  ? "#2e7d32"
                                                  : anime.score >= 5
                                                    ? "#ed6c02"
                                                    : "#d32f2f",
                                    },
                                }}
                            />
                        </Tooltip>
                    </Box>
                </CardContent>
            </Link>
        </Card>
    );
};

export default AnimeCard;
