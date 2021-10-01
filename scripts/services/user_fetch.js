import { apiFetch } from "./api_fetch.js";

export const UserFetch = (function(){
    return {
        createUser:(userData)=>
        apiFetch(
            'signup',
            'POST',
            {
                "Content-Type": "application/json",
            },
            userData
        ),
    }

})()