export interface HeaderProps {
    title?: string;
    userName?: string;
    userAvatar?: string;
    onCreateContent?: () => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
    onLogoutClick?: () => void;
    notificationCount?: number;
}