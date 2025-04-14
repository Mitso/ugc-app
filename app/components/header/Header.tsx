import type { HeaderProps  }  from '../../types/header';

import { NavLink, Link } from "react-router";

import '../../assets/scss/modules/menu.scss';
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell, ChevronDown, Plus, Settings, User } from "lucide-react";

const Header = ({
  title = '',
  userName = '',
  userAvatar = '',
  onCreateContent = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {},
  onLogoutClick = () => {},
  notificationCount = 3,
}: HeaderProps) => {
  const initiallsFormat = (name:string) => name
    .split(" ")
    .map((n) => n[0])
    .join("");
    
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">{title}</Link>
      </div>
      <nav className='menu'>
        <ul className='menu-list flex space-x-4'>
          <li className="menu-list__item">
          <NavLink to='/' className="menu-list__anchor" end>
            Home
          </NavLink>
          </li>
          <li className="menu-list__item">
            <NavLink to='/about' className="menu-list__anchor">About</NavLink>
          </li>
          <li className="menu-list__item">
            <NavLink to='/blog' className="menu-list__anchor">Blog</NavLink>
          </li>
        </ul>
      </nav>

      <div className="flex items-center space-x-4">
        <Button onClick={onCreateContent} className="create-cta cursor-pointer flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Content
        </Button>
        {/* <div className="notif relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
        </div> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="profile flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                  {initiallsFormat(userName)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium hidden md:inline">{userName}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className='bg-white'>
            <DropdownMenuItem onClick={onProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogoutClick}>
              <Settings className="mr-2 h-4 w-4" />
              <Link to="/logout">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
