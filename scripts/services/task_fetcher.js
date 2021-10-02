import { apiFetch } from "./api_fetch.js";

export const TaskFetcher=(function(){
    return {
        getAll: ()=>
            apiFetch(
                'tasks',
                'GET',
                {
                    Authorization : `Token token=${sessionStorage.getItem("token")}`
                }
            ),
        create: (taskData)=>
            apiFetch(
                'tasks',
                'POST',
                {
                    "Content-Type": "application/json",
                    Authorization : `Token token=${sessionStorage.getItem("token")}`
                },
                taskData
            ),
        update:(taskId,taskData)=>
            apiFetch(
                `task/${taskId}`,
                'PATCH',
                {
                    "Content-Type": "application/json",
                    Authorization : `Token token=${sessionStorage.getItem("token")}`
                },
                taskData
            ),
        
    }
})()