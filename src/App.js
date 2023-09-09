import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import Login from "./features/auth/Login";
import UserList from "./features/user/UserList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Public />} />
                <Route path="/login" element={<Login />} />

                <Route element={<RequireAuth />}>
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/userslist" element={<UserList />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
