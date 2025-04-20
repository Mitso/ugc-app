import React, { createContext, useReducer, useContext } from "react";
import type { ReactNode, Dispatch } from "react";
  
  // User type
  export type UserType = {
    id: string;
    email: string;
    name: string;
  } | null;
  
  // State shape
  type State = {
    user: UserType;
    isEditorOpen: boolean;
  };
  
  // Actions
  type Action =
    | { type: "SET_USER"; payload: UserType }
    | { type: "SET_IS_EDITOR_OPEN"; payload: boolean };
  
  // Initial state
  const initialState: State = {
    user: null,
    isEditorOpen: false,
  };
  
  // Reducer
  function globalReducer(state: State, action: Action): State {
    switch (action.type) {
      case "SET_USER":
        return { ...state, user: action.payload };
      case "SET_IS_EDITOR_OPEN":
        return { ...state, isEditorOpen: action.payload };
      default:
        return state;
    }
  }
  
  // Contexts
  const GlobalStateContext = createContext<State | undefined>(undefined);
  const GlobalDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);
  
  // Provider
  export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);
  
    return (
      <GlobalStateContext.Provider value={state}>
        <GlobalDispatchContext.Provider value={dispatch}>
          {children}
        </GlobalDispatchContext.Provider>
      </GlobalStateContext.Provider>
    );
  };
  
  // Hooks
  export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
      throw new Error("useGlobalState must be used within a GlobalProvider");
    }
    return context;
  }
  
  export function useGlobalDispatch() {
    const context = useContext(GlobalDispatchContext);
    if (context === undefined) {
      throw new Error("useGlobalDispatch must be used within a GlobalProvider");
    }
    return context;
  }
  
  // Convenience setters
  export function useSetIsEditorOpen() {
    const dispatch = useGlobalDispatch();
    return (open: boolean) => dispatch({ type: "SET_IS_EDITOR_OPEN", payload: open });
  }
  
  export function useSetUser() {
    const dispatch = useGlobalDispatch();
    return (user: UserType) => dispatch({ type: "SET_USER", payload: user });
  }