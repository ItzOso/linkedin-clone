import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Widgets from "./components/Widgets";
import AuthRender from "./pages/AuthRender";

function App() {
    const [searchFilter, setSearchFilter] = useState("")
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                dispatch(
                    login({
                        email: userAuth.email,
                        uid: userAuth.uid,
                        displayName: userAuth.displayName,
                        photoUrl: userAuth.photoURL,
                    })
                );
            } else {
                dispatch(logout());
            }
        });
    }, []);

    return (
        <div className="App">
            <Header searchFilter={searchFilter} setSearchFilter={setSearchFilter} />

            {!user ? (
                <AuthRender />
            ) : (
                <div className="appBody">
                    <Sidebar />
                    <Feed searchFilter={searchFilter} />
                    <Widgets/>
                </div>
            )}
        </div>
    );
}

export default App;
