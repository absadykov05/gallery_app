import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Headers from "./components/Headers";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import Generate from "./pages/Generate";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return <div className="text-center p-10">Загрузка...</div>;

    return (
        <Router>
            <Headers user={user} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/gallery" />} />
                <Route path="/gallery" element={user ? <Gallery /> : <Navigate to="/login" />} />
                <Route path="/generate" element={user ? <Generate /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
