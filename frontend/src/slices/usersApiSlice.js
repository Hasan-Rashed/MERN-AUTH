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

        logout: builder.mutation({ // logout is a mutation because it is changing the state of the server
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        })
    })
})


// there are conventions for naming the hooks. if it is mutation it will useNameMutation, if it is query it will be useNameQuery
export const { useLoginMutation, useLogoutMutation } = usersApiSlice;