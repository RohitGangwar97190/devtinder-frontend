import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import RequestReducer from "./requetsSlice"
const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
         connections:connectionReducer,
         requests: RequestReducer,
    },
});
export default appStore;