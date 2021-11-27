import DOMHandler from "../../dom_handler.js";
import { TaskFetcher } from "../services/task_fetcher.js";
import { UserFetch } from "../services/user_fetch.js";
import STORE from "../store.js";
import { Loader } from "./loader.js";
import Login from "./login.js";
import Main from "./main.js";


const SignUp=(()=>{
    async function onCreateUser(e){
        e.preventDefault();
        try{
        const {email,password}=e.target;
        DOMHandler.render(Loader)
        const newUserData= await UserFetch.createUser({email: email.value,password: password.value});
        sessionStorage.setItem('token',newUserData.token);
        const taskData= await TaskFetcher.getAll();
        //console.log(taskData);
        //console.log('cuenta creada');
        STORE.setTasks(taskData)
        DOMHandler.render(Main)
        }catch(e){
            alert('Invalid data');
            DOMHandler.render(SignUp)
        }
        

       
    }

    function onToLogin(e){
        e.preventDefault()
        DOMHandler.render(Login);
    }


    return {
        render: ()=>`<div class="header-login">
            <img src="../../assets/icons/doable.svg" alt="">
            </div>
            <div class="container-login">
                <form class="form-login" action="">
                    <div>
                        <label class="label-login" for="">Email</label>
                        <input class="input-login" type="text" name="email" placeholder="you@mail.com">
                    </div>
                    <div>
                        <label class="label-login" for="">Password</label>
                        <input class="input-login" type="password" name="password" placeholder="******">
                    </div>
                    <button class="btn-submit" type="submit">Create account</button>
                </form>
                <span class="span-login">Login</span>
            </div>`,
        initEventListeners:()=>{
            const signup=document.querySelector('.form-login');
            const login=document.querySelector('.span-login');
            if (signup){
                signup.addEventListener('submit',onCreateUser);
            }
            if (login){
                login.addEventListener('click',onToLogin);
            }
        }

    }

})()

export default SignUp;