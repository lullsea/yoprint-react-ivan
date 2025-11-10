import { Fab, Tooltip, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailIcon from "@mui/icons-material/Mail";

export default function Socials() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                position: "fixed",
                bottom: 24,
                right: 24,
            }}
        >
            <Tooltip title="Mail me" arrow placement="left">
                <Fab
                    color="primary"
                    size="medium"
                    aria-label="GitHub"
                    href="mailto:ivanirl3831@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        zIndex: 9999,
                        bgcolor: "background.paper",
                        color: "text.primary",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                        "&:hover": {
                            bgcolor: "primary.main",
                            color: "#fff",
                        },
                    }}
                >
                    <MailIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="View on GitHub" arrow placement="left">
                <Fab
                    color="primary"
                    size="medium"
                    aria-label="GitHub"
                    href="https://github.com/lullsea/yoprint-react-ivan"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        zIndex: 9999,
                        bgcolor: "background.paper",
                        color: "text.primary",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                        "&:hover": {
                            bgcolor: "primary.main",
                            color: "#fff",
                        },
                    }}
                >
                    <GitHubIcon />
                </Fab>
            </Tooltip>
        </Box>
    );
}
