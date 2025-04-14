import { type ReactNode, useState } from 'react';
import { GlobalContext } from './context/GlobalContext';
import { Index }  from './Index';

/* 
    Define props for the provider component for better type safety
*/
interface GlobalContextProviderProps {
    children: ReactNode; // Use ReactNode for children type
}

export default function App({ children }: GlobalContextProviderProps) {
    const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false); // Explicitly type useState if desired
    return (
          <GlobalContext.Provider value={{
                isEditorOpen,
                setIsEditorOpen,
            }}>
            { children}
            <Index />
        </GlobalContext.Provider>
    )
};