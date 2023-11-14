import React, { useState } from 'react'
import './Auth.css'
import AboutAuth from './AboutAuth'
// import icon from "../../assets/stackoverflow_logo.png"
import icon from "../../assets/favicon.ico"
import { signup, login } from "../../actions/auth.js"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {

    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, SetPassword] = useState("");

    const [ipAddress, setIpAddress] = useState("10.10.10.10");
    const [devices, setDevices] = useState("Mobile");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsSignup(!isSignup);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email && !password) {
            alert("Enter the email and password");
            return;
        }

        if (isSignup) {
            if (!name) {
                alert("Enter the name");
            }
            dispatch(signup({ name, email, password }, navigate));
        }
        else {
            dispatch(login({ email, password, ipAddress, devices }, navigate));
        }
    };

    return (
        <section class="auth-section">
            {isSignup && <AboutAuth />}
            <div class="auth-container-2">
                {
                    !isSignup && <img src={icon} alt='stackOverFlow' className='login-logo' width="70" />
                }
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <label htmlFor="name">
                            <h4>Display Name</h4>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    )}
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h4>password</h4>
                            {!isSignup ? (
                                <p style={{ color: "#007ac6", fontSize: "13px" }}>forgot password?</p>
                            ) : null}
                        </div>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => SetPassword(e.target.value)}
                        />
                        {isSignup && (
                            <p style={{ color: "#666767", fontSize: "13px" }}>
                                Passwords must contain at least eight <br />
                                characters, including at least 1<br /> letter and 1 number.
                            </p>
                        )}
                    </label>
                    {isSignup && (
                        <label htmlFor="check">
                            <input type="checkbox" id="check" />
                            <p style={{ fontSize: "13px" }}>
                                Opt-in to receive occasional product
                                <br />
                                updates, user research invitations,
                                <br /> company announcements, and digests.
                            </p>
                        </label>
                    )}
                    <button type='submit' className='auth-btn'>{isSignup ? 'Sign up' : 'Log in'}</button>
                    {isSignup && (
                        <p style={{ color: "#666767", fontSize: "13px" }}>
                            By clicking “Sign up”, you agree to our{" "}
                            <span style={{ color: "#007ac6" }}>terms of <br /> service</span>
                            <span style={{ color: "#007ac6" }}>privacy policy</span> and{" "}
                            <span style={{ color: "#007ac6" }}>cookie policy</span>
                        </p>
                    )}
                </form>
                <p>
                    {
                        isSignup ? 'already have an account?' : "Don't have an account?"
                    }
                    <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? "Log in" : "Sign up"}</button>
                </p>
            </div>
        </section>
    )
}

export default Auth