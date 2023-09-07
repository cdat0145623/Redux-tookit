import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../featured/posts/postsSlice";
import usersReducer from "../featured/users/usersSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
    },
});
