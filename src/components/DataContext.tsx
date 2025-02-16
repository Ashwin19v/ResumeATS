import { useContext, createContext, useState } from "react";


interface DataContextType {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataContextProvider");
    }
    return context;
};


const DataContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <DataContext.Provider value={{ email, password, setEmail, setPassword }}>
            {children}
        </DataContext.Provider>
    );
};


export default DataContextProvider;