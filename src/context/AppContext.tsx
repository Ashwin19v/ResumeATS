import { createContext, useContext, useState, useEffect } from "react";
import { auth, db, storage } from "../config/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { showToast } from "../components/ToastNotification";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface AppContextProps {
  user: User | null;
  loading: boolean;
  messages: Message[];
  preview: boolean;
  isBotTyping: boolean;
  isModalOpen: boolean;
  progress: number;
  uploading: boolean;
  jobDescription: string | null;
  selectedSection:
    | { section: string; content: string; index: number; i: number }[]
    | null;
  resumeData: ResumeData | null;
  logout: () => Promise<void>;
  handlePreview: () => void;
  handleUploadResume: (file: File) => Promise<void>;
  setSelectedSection: React.Dispatch<
    React.SetStateAction<
      { section: string; content: string; index: number; i: number }[] | null
    >
  >;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  handleProcessResume: (jobDescription: string) => Promise<void>;
  handleChatPrompt: (jobDescription: string, prompt: string) => Promise<void>;
  handleUpdateResume: ({
    section,
    text,
    index,
    descIndex,
  }: {
    section: string;
    text: string;
    index: number;
    descIndex: number;
  }) => Promise<void>;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData | null>>;
  fileUrl: string | null;
  setJobDescription: React.Dispatch<React.SetStateAction<string | null>>;
}
interface Experience {
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  gpa: string;
  start_date: string;
  end_date: string;
  description: string[];
}

interface Project {
  project: string;
  name: string;
  description: string[];
  link: string;
}
interface AtsScore {
  ats_score: number;
  detailed_scores: {
    skills_match: number;
    experience_relevance: number;
    education_relevance: number;
    project_relevance: number;
  };
  feedback?: {
    strengths?: string[] | undefined;
    improvements?: string[] | undefined;
  };
  detailed_feedback?: {
    skills_match?: FeedbackDetails;
    experience_relevance?: FeedbackDetails;
    education_relevance?: FeedbackDetails;
    overall_formatting?: FeedbackDetails;
  };
}

interface FeedbackDetails {
  matching_elements: string[];
  missing_elements: string[];
  explanation: string;
}

interface ResumeData {
  user_id: string;
  ats_score: AtsScore;

  structured_data: {
    name: string;
    email: string;
    phone: string;
    skills: string[];
    summary_or_objective: string;
    projects: Project[];
    experience: Experience[];
    education: Education[];
    certifications: string[];
    areas_of_interest: string[];
  };
}
interface UpdateResumeParams {
  section: string;
  text: string;
  index: number;
  descIndex: number;
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
  const [progress, setProgress] = useState<number>(0);
  const [selectedSection, setSelectedSection] = useState<
    { section: string; content: string; index: number; i: number }[] | null
  >(null);
  const [jobDescription, setJobDescription] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);

  const handlePreview = () => {
    setPreview(!preview);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUploadResume = async (file: File) => {
    setUploading(true);
    try {
      const storageRef = ref(storage, `uploads/${user?.email}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressValue);
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
            showToast("File uploaded successfully", "success");
          } catch (error) {
            console.error("Error getting download URL:", error);
            showToast("Error uploading file", "error");
          }
          setUploading(false);
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
      showToast("Error uploading file", "error");
      setLoading(false);
    }
  };

  const handleProcessResume = async (jobDescription: string) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${baseUrl}/process_resume/`,
        {
          user_id: user?.uid,
          file_link: fileUrl,
          job_description: jobDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);

      const resumeRef = doc(db, "resumes", user?.uid!);
      await setDoc(resumeRef, {
        user_id: user?.uid,
        file_link: fileUrl,
        job_description: jobDescription,
        processed_data: response.data,
        timestamp: new Date(),
      });
      fetchProcessedResume();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error processing resume:", error);
      throw error;
    }
  };

  const fetchProcessedResume = async () => {
    try {
      setLoading(true);

      const resumeRef = doc(db, "resumes", user?.uid!);
      const resumeSnap = await getDoc(resumeRef);

      if (resumeSnap.exists()) {
        console.log("Fetched Resume Data:", resumeSnap.data());
        setResumeData(resumeSnap.data()?.processed_data);
      } else {
        showToast("No processed resume found", "error");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching resume:", error);
    }
  };

  const handleChatPrompt = async (prompt: string) => {
    try {
      const userMessage: Message = { text: prompt, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const response = await axios.post(`${baseUrl}/process_change/`, {
        user_id: user?.uid,
        section: selectedSection ? selectedSection[0]?.section : undefined,
        prompt: prompt,
        content: selectedSection ? selectedSection[0]?.content : undefined,
        job_description: jobDescription,
      });

      setIsBotTyping(true);
      const botResponse = response.data.modified_content;
      console.log(response.data);

      let displayedText = "";

      const botTypingMessage: Message = { text: "....", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botTypingMessage]);

      for (let i = 0; i < botResponse.length; i++) {
        displayedText += botResponse[i];
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { text: displayedText, sender: "bot" },
        ]);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      setIsBotTyping(false);
    } catch (error) {
      console.error("Error fetching chat prompt:", error);
      setIsBotTyping(false);
      throw error;
    }
  };

  const handleUpdateResume = async ({
    section,
    text,
    index,
    descIndex,
  }: UpdateResumeParams): Promise<void> => {
    try {
      setLoading(true);

      if (!resumeData) {
        showToast("Resume data is not available", "error");
        return;
      }

      if (!(section in resumeData.structured_data)) {
        showToast("Invalid section provided", "error");
        return;
      }

      let experienceArray = [
        ...resumeData.structured_data[
          section as keyof typeof resumeData.structured_data
        ],
      ];

      if (!experienceArray[index]) {
        showToast("Invalid experience index", "error");
        return;
      }

      const updatedExperience = {
        ...experienceArray[index],
        description: [...experienceArray[index].description],
      };

      updatedExperience.description[descIndex] = text;

      experienceArray[index] = updatedExperience;

      const resumeRef = doc(db, "resumes", user?.uid!);
      await updateDoc(resumeRef, {
        [`processed_data.structured_data.${section}`]: experienceArray,
      });

      console.log("Update successful:", updatedExperience);
      fetchProcessedResume();
    } catch (error: any) {
      console.error("Error updating resume:", error);
      showToast(`Update failed: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    showToast("Logout success", "success");
    setUser(null);
    setMessages([]);
    setSelectedSection(null);
    setResumeData(null);
    setFileUrl(null);
    setJobDescription(null);
  };

  return (
    <AppContext.Provider
      value={{
        handlePreview,
        preview,
        progress,
        uploading,
        isBotTyping,
        jobDescription,
        setJobDescription,
        messages,
        setMessages,
        handleChatPrompt,
        handleUpdateResume,

        user,
        loading,
        logout,
        handleUploadResume,
        selectedSection,
        setSelectedSection,
        isModalOpen,
        setIsModalOpen,
        handleProcessResume,
        resumeData,
        setResumeData,
        fileUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { useAppContext, AppContextProvider };
