import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { auth } from "../firebase";
import "./Login.css";

function Login({setPage}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

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

    const sendToSignup = () => {
        setPage("signup");
    };

    return (
        <div className="login">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png"
                alt=""
            />

            <form>
                <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" onClick={loginToApp}>
                    Sign In
                </button>
            </form>

            <p>
                Not a member yet?{" "}
                <span onClick={sendToSignup} className="loginRegister">
                    Register now
                </span>
            </p>
        </div>
    );
}

export default Login;
