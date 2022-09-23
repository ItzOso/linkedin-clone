import "./Signup.css"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { auth } from "../firebase";

function Signup({setPage}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();

    const loginToApp = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then((userAuth) => {
                dispatch(
                    login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,
                        photoUrl: userAuth.user.photoURL,
                    })
                );
            })
            .catch((err) => alert(err));
    };

    const register = (e) => {
        e.preventDefault()

        if (!name) return alert("Please enter a full name!");
        if (!email) return alert("Please enter your email!");
        if (!password) return alert("Please enter a password!")
        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                userAuth.user
                    .updateProfile({
                        displayName: name,
                        photoURL: profilePic,
                    })
                    .then(() => {
                        dispatch(
                            login({
                                email: userAuth.user.email,
                                uid: userAuth.user.uid,
                                displayName: userAuth.user.displayName,
                                photoUrl: userAuth.user.photoURL,
                            })
                        );
                    }).then(() => {
                        loginToApp()
                    });
            })
            .catch((err) => alert(err));
    };

    const sendToLogin = () => {
        setPage("login")
    }

    return (
        <div className="signup">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png"
                alt=""
            />

            <form>
                <input
                    placeholder="Full name (required)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                />
                <input
                    placeholder="Profile pic URL (optional)"
                    type="text"
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
                />
                <input placeholder="Email (required)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    placeholder="Password (required)"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" onClick={register}>
                    Sign Up
                </button>
            </form>

            <p>
                Already a member?{" "}
                <span onClick={sendToLogin} className="signupRegister">
                    Login now
                </span>
            </p>
        </div>
    );
}

export default Signup;
