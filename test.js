import { SessionFetcher } from "./scripts/services/sessions_fetch.js";
import { TaskFetcher } from "./scripts/services/task_fetcher.js";
import { UserFetch } from "./scripts/services/user_fetch.js";

async function myLogin(user){
    const dataUser=await SessionFetcher.login(user.email,user.password);
    console.log(dataUser);
    sessionStorage.setItem('token',dataUser.token);
    const tasks= await TaskFetcher.getAll();
    console.log(tasks);

}
myLogin({email:'jewel@mail.com',password:'123456'});

// async function CreateUser(user){
//     const newdataUser=await UserFetch.createUser(user);
//     console.log(newdataUser);
//     sessionStorage.setItem('token',newdataUser.token);

// }
// CreateUser({email:'jewel322@mail.com',password:'123456'});

// async function gettasks(){
//     const tasks= await TaskFetcher.getAll();
//     console.log(tasks);

// }
// gettasks();