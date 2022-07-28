// import React, { FC, useMemo } from "react";



// interface State {
//     data: {
//         email: String,
//         fullName: String,
//         username: String
//     },
//     token: String
// }


// type Action =  
// | {
//     type?: "SET_USER_DETAILS",
//     payload?: any
//   }



// const initialState = {
//     data: {
//         email: "",
//         fullName: "",
//         username: ""
//     },
//     token: ""
// }


// const UserContext = React.createContext<State>(initialState);
// const UserActionContext = React.createContext<React.Dispatch<Action> | undefined>({});

// UserContext.displayName = "UserContext";
// UserActionContext.displayName = "UserActionContext";

// function userReducer(state: State = initialState, action: Action = {}) {
//     switch (action.type) {
//         case 'SET_USER_DETAILS':
            
//             return {
//                 ...state,
//                 ...action.payload
//             };
    
//         default:
//             return state;
//     }
// }


// export const UserProvider: FC = (props) => {
//     const [state, dispatch] = React.useReducer(userReducer, initialState);
    
//     const setUserDetails = (data: State) => dispatch({
//         type: "SET_USER_DETAILS",
//         payload: data
//     })

//     const value = useMemo(
//         () => ({
//             ...state,
//             setUserDetails
//         }),
//         [state]
//         );
        
//         return <UserContext.Provider value={value} {...props} />;
//     }
    
    
//     export const useUserContext = () => {
//         const context = React.useContext(UserContext);
//         if (context === undefined) {
//             throw new Error(`useUserContext must be used within a UserContextProvider`);
//         }
//         return context;
//     }
    
// //     export const useUserDetails = () => {
// //         // const dispatch = React.useContext(UserActionContext);
// //         const [state, dispatch] = React.useReducer(userReducer, UserActionContext);

// //         if (dispatch === undefined) {
// //             throw new Error(`useUserDetails must be used within a UserProvider`);
// //         }
// //   return {
// //     setUserDetails: (data: State) => dispatch({
// //         type: "SET_USER_DETAILS",
// //         payload: data
// //     })
// //   };
// // }































// // token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjUwYjM4NzEzZjExMDAxNmJlMGI4YSIsImVtYWlsIjoiYXJkZWxtYmlwbGFuZ0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im1iaXBsYW5nIiwiaWF0IjoxNjU3MTQ4MzQ2LCJleHAiOjE2NTk3NDAzNDZ9.aTQubJGjcEP7hlMnGGsRVVrFWvoyxX1IKYmsGir9lcM"
// // user:
// // account_name: ""
// // account_number: ""
// // activation_code: null
// // activation_expires_in: null
// // bank_code: ""
// // bank_name: ""
// // bvn: ""
// // country: "Nigeria"
// // createdAt: "2022-04-24T08:32:56.146Z"
// // description: ""
// // device_token: []
// // email: "ardelmbiplang@gmail.com"
// // fullname: "Mbiplang Ardel"
// // isActive: true
// // isBankVerified: false
// // isDeleted: false
// // isSuspended: false
// // nationality: ""
// // notification_counter: 18
// // occupation: ""
// // phone: ""
// // profile_picture: ""
// // role: {_id: '625c7ba9c4c1b16967dd8307', name: 'customer'}
// // updatedAt: "2022-05-12T11:09:14.400Z"
// // username: "mbiplang"
// // _id: "62650b38713f110016be0b8a"