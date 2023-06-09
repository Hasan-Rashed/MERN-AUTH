import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({ // data is our email and password for login
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data
            }),
        }),
    })
})


export const { useLoginMutation } = usersApiSlice;