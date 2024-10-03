import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../auth/auth";
import { journalSlice } from "../journal/journalSlice/journalSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        journal: journalSlice.reducer,
    },
});