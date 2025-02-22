import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

interface AppContextProps {
    user: User | null;
    userName: string;
    loading: boolean;
    setUserName: (name: string) => void;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [userName, setUserName] = useState<string>(() => {
        return localStorage.getItem("userName") || "";
    });

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setUserName(currentUser.displayName || "");
                localStorage.setItem("user", JSON.stringify(currentUser));
                localStorage.setItem("userName", currentUser.displayName || "");
            } else {
                setUser(null);
                setUserName("");
                localStorage.removeItem("user");
                localStorage.removeItem("userName");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setUserName("");
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
    };

    return (
        <AppContext.Provider value={{ user, userName, loading, setUserName, logout, setUser }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
