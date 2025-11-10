import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import Socials from "./components/Socials";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/anime/:id" element={<DetailPage />} />
            </Routes>
            <Socials />
        </>
    );
}

export default App;
