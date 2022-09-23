import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./Sidebar.css";

function Sidebar() {
    const user = useSelector(selectUser);

    const recentItem = (topic) => (
        <div className="sidebarRecentItem">
            <span className="sidebarHash">#</span>
            <p>{topic}</p>
        </div>
    );

    return (
        <div className="sidebar">
            <div className="sidebarTop">
                <img
                    src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt=""
                />
                <Avatar src={user.photoUrl} className="sidebarAvatar">
                    {user.email[0]}
                </Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>

            <div className="sidebarStats">
                <div className="sidebarStat">
                    <p>Who viewed you</p>
                    <p className="sidebarStatNumber">2,543</p>
                </div>
                <div className="sidebarStat">
                    <p>Views on post</p>
                    <p className="sidebarStatNumber">3,627</p>
                </div>
            </div>

            <div className="sidebarBottom">
                <p>Recent</p>
                {recentItem("reactjs")}
                {recentItem("prgramming")}
                {recentItem("html")}
                {recentItem("softwaredesign")}
            </div>
        </div>
    );
}

export default Sidebar;
