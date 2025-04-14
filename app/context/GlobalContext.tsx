import { 
    createContext, 
    type Dispatch, 
    type SetStateAction 
} from 'react';

/* 
    Define the shape of the context data
*/
export type UserType = {
    id: string;
    email: string;
    name: string;
} | null;
interface GlobalContextType {
    user?: UserType,
    setUser?: Dispatch<SetStateAction<UserType>>;
    

    //EDITOR
    isEditorOpen?: boolean;
    setIsEditorOpen?: Dispatch<SetStateAction<boolean>>;  // Use the specific type for a state setter from useState
}

/* 
    Create the context with a default value matching the type.
    The default setter function should ideally warn or throw if called without a provider.
*/
export const GlobalContext = createContext<GlobalContextType>({
    user: null,
    setUser: () => {},
    isEditorOpen: false,
    setIsEditorOpen: () => {
        console.warn("Attempted to call setIsEditorOpen outside of GlobalContextProvider. Make sure the component is wrapped in GlobalContextProvider.");
        // Or you could throw an error:
        // throw new Error("setIsEditorOpen called outside of GlobalContextProvider");
    },
});
