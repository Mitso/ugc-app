import type { Route } from './+types/Layout';
import { useContext,useState } from 'react';
import { Outlet } from 'react-router';

import { useGlobalState, useSetIsEditorOpen } from './context/GlobalContext';


import './assets/css/app.css';
import './assets/css/index.css';

import Header from './components/header/Header';

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Home" },
        {   name: "Description", 
            content: "Home - Welcome to React Router!" 
        },
    ];
}

const Layout = () => {
    const { isEditorOpen } = useGlobalState();
    const setIsEditorOpen = useSetIsEditorOpen();
    const handleCreateContent = () => {
        setIsEditorOpen(true);
    }

    return (
        <>
            <Header 
                title="Content Management System"
                userName="John Doe"
                userAvatar="/images/avatars/avatar.svg"
                onCreateContent={handleCreateContent}
                onProfileClick={() => console.log("Profile clicked")}
                onSettingsClick={() => console.log("Settings clicked")}
                onLogoutClick={() => console.log("Logout clicked")}
                notificationCount={3}
            />
            <Outlet />
        </>
    )
};

export default Layout;