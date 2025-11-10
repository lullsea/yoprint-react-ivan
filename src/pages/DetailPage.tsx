import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Button,
} from "@mui/material";

interface Anime {
    mal_id: number;
    title: string;
    synopsis: string;
    producers: {name: string}[];
    images: {
        jpg: { image_url: string };
    };
    type: string;
    episodes: number;
    status: string;
    score: number;
    rank: number;
    genres: { name: string }[];
    year?: number;
}

export default function DetailPage() {
    const API_URL = "https://api.jikan.moe/v4";

    const { id } = useParams();
    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchAnimeDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${API_URL}/anime/${id}`,
                );
                const data = await response.json();
                if (data.data) setAnime(data.data);
                else setError("Anime not found");
            } catch (err) {
                setError("Failed to fetch anime details");
            } finally {
                setLoading(false);
            }
        };
        fetchAnimeDetail();
    }, [id]);

    if (loading)
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Box textAlign="center" mt={10}>
                <Typography color="error">{error}</Typography>
                <Button
                    component={Link}
                    to="/"
                    sx={{ mt: 2 }}
                    variant="outlined"
                >
                    Back to Search
                </Button>
            </Box>
        );

    if (!anime) return null;

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                color: "text.primary",
                minHeight: "100vh",
                p: 3,
            }}
        >
            <Button
                component={Link}
                to="/"
                variant="outlined"
                sx={{ mb: 3, color: "primary.main" }}
            >
                ← Back to Search
            </Button>

            <Card
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    bgcolor: "background.paper",
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <CardMedia
                    component="img"
                    image={anime.images.jpg.image_url}
                    alt={anime.title}
                    sx={{
                        width: { xs: "100%", md: 300 },
                        borderRadius: 2,
                        objectFit: "cover",
                    }}
                />
                <CardContent sx={{ flex: 1, ml: { md: 3 } }}>
                    <Typography variant="h4" gutterBottom>
                        {anime.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        {anime.type} • {anime.episodes} eps • {anime.status} •{" "}
                        {anime.year || "N/A"}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        Producers:{anime.producers.map((item, index) => <span key={index}>{` ${item.name} ${(index + 1 < anime.producers.length) ? '•' : ''}`} </span>)}
                    </Typography>

                    <Box
                        sx={{
                            mt: 2,
                            mb: 2,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                        }}
                    >
                        {anime.genres.map((g) => (
                            <Chip
                                key={g.name}
                                label={g.name}
                                color="secondary"
                                size="small"
                            />
                        ))}
                    </Box>

                    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                        {anime.synopsis || "No synopsis available."}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                    >
                        ⭐ Score: {anime.score || "N/A"} 🏅 Rank:{" "}
                        {anime.rank || "N/A"}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
