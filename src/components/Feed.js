import ImageIcon from "@mui/icons-material/Image";
import CreateIcon from "@mui/icons-material/Create";
import "./Feed.css";
import InputOption from "./InputOption";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "./Post";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";

function Feed({searchFilter}) {
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);

    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });
    }, []);

    const sendPost = (e) => {
        e.preventDefault();

        db.collection("posts").add({
            name: user.displayName,
            desc: user.email,
            message: input,
            photoUrl: user.photoUrl || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    };
    return (
        <div className="feed">
            <div className="feedInputContainer">
                <div className="feedInput">
                    <CreateIcon />
                    <form>
                        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
                        <button onClick={sendPost} type="submit">
                            Send
                        </button>
                    </form>
                </div>
                <div className="feedInputOptions">
                    <InputOption title="Photo" Icon={ImageIcon} color="#70b5f9" />
                    <InputOption title="Video" Icon={SubscriptionsIcon} color="#e7a33e" />
                    <InputOption title="Event" Icon={EventNoteIcon} color="#c0cbcd" />
                    <InputOption title="Photo" Icon={CalendarViewDayIcon} color="#7fc15e" />
                </div>
            </div>
            <FlipMove>
                {posts.filter((post) => post.data.message.toLowerCase().includes(searchFilter.toLowerCase())).map(({ id, data: { name, desc, message, photoUrl } }) => (
                    <Post key={id} id={id} name={name} desc={desc} message={message} photoUrl={photoUrl} />
                ))}
            </FlipMove>
        </div>
    );
}

export default Feed;
