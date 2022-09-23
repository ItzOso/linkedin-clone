import { ChatOutlined, MoreHoriz, SendOutlined, ShareOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import InputOption from "./InputOption";
import { forwardRef, useState } from "react";
import "./Post.css";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Post = forwardRef(({ id, name, desc, message, photoUrl }, ref) => {
    const [openDots, setOpenDots] = useState(false);
    const user = useSelector(selectUser);

    const handleDelete = () => {
        db.collection("posts")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    };
    return (
        <div
            ref={ref}
            className="post"
            onClick={(e) => (e.target.className !== "postDotsPopup" && openDots === true ? setOpenDots(false) : null)}>
            <div className="postHeader">
                {user.email === desc && (
                    <>
                        <MoreHoriz onClick={() => setOpenDots(!openDots)} className="postDots" />
                        {openDots && (
                            <div  className="postDotsPopupParent">
                                <button className="postDotsPopup" onClick={handleDelete}>
                                    delete
                                </button>
                            </div>
                        )}
                    </>
                )}
                
                <Avatar src={photoUrl}>{name[0]}</Avatar>
                <div className="postInfo">
                    <h2>{name}</h2>
                    <p>{desc}</p>
                </div>
            </div>
            <div className="postBody">
                <p>{message}</p>
            </div>
            <div className="postButtons">
                <InputOption Icon={ThumbUpAltOutlined} title="Like" color="gray" />

                <InputOption Icon={ChatOutlined} title="Comment" color="gray" />

                <InputOption Icon={ShareOutlined} title="Share" color="gray" />

                <InputOption Icon={SendOutlined} title="Send" color="gray" />
            </div>
        </div>
    );
});

export default Post;
