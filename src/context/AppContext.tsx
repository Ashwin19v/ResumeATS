import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import axios from "axios";
interface AppContextProps {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  handleGetResume: () => Promise<void>;
  handleUploadResume: (file: File) => Promise<void>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const baseUrl = "https://localhost:5000";
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUploadResume = async (file: File) => {
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    });
    uploadTask.on("state_changed", async (snapshot) => {
      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log("File available at", downloadUrl);
      const response = await axios.post(`${baseUrl}/resume`, {
        url: downloadUrl,
        uid: user?.uid,
      });
      console.log(response);
    });
  };
  const handleGetResume = async () => {
    const response = await axios.get(`${baseUrl}/resume/${user?.uid}`);
    console.log(response);
  };

  const logout = async () => {
    await signOut(auth);

    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{ user, loading, logout, handleGetResume, handleUploadResume }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
