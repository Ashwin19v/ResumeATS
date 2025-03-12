import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Home from "./pages/Home";
import "./App.css";
import { AppContextProvider } from "./context/AppContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Resume from "./pages/Resume";
import ProfilePage from "./pages/Profile";

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Main />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </AppContextProvider>
  );
};

export default App;
