import React, { useEffect, useContext, useReducer, createContext } from "react";

// Create a App Context
const AppContext = createContext();

// Hook for child components
export const useAppContext = () => {
    return useContext(AppContext);
};

// Setup App Reducer
let initialState = {
    drawerOpen: false,
    menuDisabled: false,
    selectedDrawerItem: '',
    background: 'blank',
};
const reducer = (state, action) => {
    switch (action.type) {
        case "DRAWER_OPEN":
            return {
                ...state,
                drawerOpen: true,
            };
        case "DRAWER_CLOSE":
            return {
                ...state,
                drawerOpen: false,
            };
        case "MENU_ENABLE":
            return {
                ...state,
                menuDisabled: false,
            };
        case "MENU_DISABLE":
            return {
                ...state,
                menuDisabled: true,
            };
        case "SET_BACKGROUND":
            return {
                ...state,
                background: action.background,
            };
        default:
            return state;
    }
};

// Enum Context Provider
export function AppContextProvider({ children }) {

    // Auth Reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    // Setup Provider
    useEffect(() => {

    }, []);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
