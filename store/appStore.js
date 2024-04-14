import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signinSlice.js"

const appStore = configureStore({
    reducer:{
        contact:signinReducer
    }
})

export default appStore