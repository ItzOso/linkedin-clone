import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import HomeIcon from "@mui/icons-material/Home";
import HeaderOption from "./HeaderOption";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { Logout } from "@mui/icons-material";

function Header({searchFilter, setSearchFilter}) {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();
    const logoutOfApp = () => {
        dispatch(logout());
        auth.signOut();
    };
    return (
        <div className="header">
            <div className="headerLeft">
                <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="" />

                <div className="headerSearch">
                    <SearchIcon />
                    <input type="text" value={searchFilter} onChange={e => setSearchFilter(e.target.value)} placeholder="Search" />
                </div>
            </div>
            <div className="headerRight">
                <HeaderOption Icon={HomeIcon} title="Home" />
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
                <HeaderOption Icon={ChatIcon} title="Chat" />
                <HeaderOption Icon={NotificationsIcon} title="Notifications" />
                {user && <HeaderOption Icon={Logout} title="Logout" onClick={logoutOfApp}/>}

            </div>
        </div>
    );
}

export default Header;
