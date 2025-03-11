import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import axios from "axios";

type FeedbackKey = 'skills_match' | 'experience_relevance' | 'education_relevance' | 'overall_formatting';
interface AppContextProps {
  user: User | null;
  loading: boolean;
  isModalOpen: boolean;
  selectedSection: FeedbackKey | null;
  resumeData: any;
  logout: () => Promise<void>;
  handleUploadResume: (file: File) => Promise<void>;
  setSelectedSection: (section: FeedbackKey | null) => void;
  setIsModalOpen: (open: boolean) => void;
  handleProcessResume: () => Promise<void>;
  setResumeData: (data: any) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);


function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}




function AppContextProvider({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://harish20205-resume-ats.hf.space";
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSection, setSelectedSection] = useState<FeedbackKey | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<any>(null);


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
    try {
      const storageRef = ref(storage, `uploads/${user?.email}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload error:", error);
          throw error;
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadUrl);
            setFileUrl(downloadUrl);
            const response = await axios.post(`${baseUrl}/resume`, {
              url: downloadUrl,
              uid: user?.uid,
            });
            console.log("Server response:", response.data);
          } catch (error) {
            console.error("Error getting download URL or saving to server:", error);
            throw error;
          }
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const handleProcessResume = async () => {
    try {
      const response = await fetch(`${baseUrl}/process_resume/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.uid,
          file_link: fileUrl,
          job_description: "Software Engineer",
        }),

      })
      const data = await response.json();
      console.log(data);
      setResumeData(data);
    } catch (error) {
      console.error("Error processing resume:", error);
      throw error;
    }
  };


  const logout = async () => {
    await signOut(auth);

    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{ user, loading, logout, handleUploadResume, selectedSection, setSelectedSection, isModalOpen, setIsModalOpen, handleProcessResume, resumeData, setResumeData }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { useAppContext, AppContextProvider };
