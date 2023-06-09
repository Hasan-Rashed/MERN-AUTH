import { createSlice } from '@reduxjs/toolkit'


// check localStorage with initialState
/* `initialState` is an object that contains the initial state of the `auth` slice.
It has a property called `userInfo` which is set to the value of `localStorage.getItem('userInfo')`. */
const initialState = {
    // if userInfo is available in localStorage, then parse it to JSON and set it to userInfo else set it to null
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null // null is the initial state, JSON.parse() converts a string to a JavaScript object
}

// createSlice takes in an object with name, initialState, reducers
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {  // setCredentials is an action creator
            // set data to state
            state.userInfo = action.payload; // action.payload is the userInfo object from the backend (see userController.js) and it is set to the userInfo state
            // set data to localStorage
            localStorage.setItem('userInfo', JSON.stringify(action.payload)) // JSON.stringify() converts a JavaScript object to a string
        },
        logout: (state, action) => { // logout is an action creator
            // clearing data from state
            state.userInfo = null; // set userInfo to null to log out
            // clearing data from localStorage
            localStorage.removeItem('userInfo');// remove userInfo from localStorage to log out
        }
    }
});


export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// when you call it is action, when it changes state it is reducer