import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../slices/auth-slice";

interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    mode: 'cors',
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as { auth: { token?: string } }).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    } 
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);  
    
    if (result?.error?.status === 403) {
        console.log("Sending refresh Token");

        const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
        console.log("refreshToken: ", refreshResult);

        const data = refreshResult?.data as RefreshResponse | undefined;

        if (data && data.accessToken && data.refreshToken) {
            const user = api.getState().auth.user;
            // Store new token
            api.dispatch(setCredentials({ 
                accessToken: data.accessToken, 
                refreshToken: data.refreshToken, 
                isAuth: true, 
                user 
            }));
            // Retry the original request with new accessToken
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
        
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Items'],
    endpoints: (builder) => ({

    })
});