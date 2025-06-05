import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import { useAuthStore } from "./stores/useAuthStore";
import YourSnippets from "./pages/YourSnippets";
import Favourites from "./pages/Favourites";
import Settings from "./pages/Settings";

const App = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoogedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/your-snippets" element={<YourSnippets />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
