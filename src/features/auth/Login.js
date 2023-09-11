import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";

function Login() {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [persist, setPersist] = usePersist();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ username, password }).unwrap();
            dispatch(setCredentials({ ...userData, username }));
            setUsername("");
            setPassword("");
            navigate("/welcome");
        } catch (error) {
            console.log("login error:::::", error);
            console.log("error?.status:::", error?.status);
            if (!error?.data) {
                setErrMsg("No Server Response");
            } else if (error?.status === 400) {
                setErrMsg("No Username or Password");
            } else if (error?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    };
    const handleUserInput = (e) => setUsername(e.target.value);

    const handlePwdInput = (e) => setPassword(e.target.value);

    const handleToggle = () => setPersist((prev) => !prev);

    const content = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <section className="login">
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={username}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    required
                />
                <label htmlFor="persist" className="form__persist">
                    <input
                        type="checkbox"
                        className="form__checkbox"
                        id="persist"
                        onChange={handleToggle}
                        checked={persist}
                    />
                    Trust This Device
                </label>
                <button>Sign In</button>
            </form>
        </section>
    );

    return content;
}

export default Login;
