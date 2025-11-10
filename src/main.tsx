import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { darkTheme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <BrowserRouter>
                    <CssBaseline />
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);
