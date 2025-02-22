import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { setUser, logout } from "../features/auth/authSlice";

// const baseQuery = fetchBaseQuery({ 
//     baseUrl: "http://localhost:3001", 
//     credentials: "include",
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.token;
//         if (token) {
//             headers.set("authorization", `Bearer ${token}`);
//         }
//         return headers;
//     }   

// });


// const baseQueryWitheReauth = async (args, api, extraOptions, baseQuery) => {
//     let result = await baseQuery(args, api, extraOptions, baseQuery);

//     if (result.error?.originalStatus === 403) {
//         const refreshResult = await baseQuery("/refresh", api, extraOptions, baseQuery);
//         if (refreshResult.data) {
//             const user = api.getState().auth.user;
//             api.dispatch(setUser({ ...refreshResult.data, user }));
//             result = await baseQuery(args, api, extraOptions, baseQuery);

//         }else {
//             api.dispatch(logout());
//         }
//     }
// return result;


// }

export const api = createApi({
    baseQuery: baseQueryWitheReauth,
    endpoints: (builder) => ({}),})