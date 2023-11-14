import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import { useParams } from "react-router-dom";
export const signup = (authData, navigate) => async (dispatch) => {

    try {
        const { data } = await api.signUp(authData);
        dispatch({ type: "AUTH", data: data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData);
        dispatch({ type: "AUTH", data: data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        const { ipAddress, devices } = authData;
        const { id } = useParams();
        const { loginData } = await api.postLoginDetails(
            id,
            ipAddress,
            devices,
        );
        dispatch({ type: "POST_LOGINDETAILS", payload: loginData });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
