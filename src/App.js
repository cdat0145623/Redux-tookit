import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout";
import PostsList from "./featured/posts/PostsList";
import AddPostForm from "./featured/posts/AddPostForm";
import SinglePostPage from "./featured/posts/SinglePostPage";
import EditPostForm from "./featured/posts/EditPostForm";
import UsersList from "./featured/users/UserList";
import UserPage from "./featured/users/UserPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />
                <Route path="post">
                    <Route index element={<AddPostForm />} />
                    <Route path=":postId" element={<SinglePostPage />} />
                    <Route path="edit/:postId" element={<EditPostForm />} />
                </Route>

                <Route path="user">
                    <Route index element={<UsersList />} />
                    <Route path=":userId" element={<UserPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
