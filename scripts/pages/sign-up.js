import DOMHandler from "../../dom_handler.js";
import { TaskFetcher } from "../services/task_fetcher.js";
import { UserFetch } from "../services/user_fetch.js";
import Login from "./login.js";


const SignUp=(()=>{
    async function onCreateUser(e){
        e.preventDefault();
        const {email,password}=e.target;
        try{
            const newUserData= await UserFetch.createUser({email: email.value,password: password.value});
            sessionStorage.setItem('token',newUserData.token);
            const taskData= await TaskFetcher.getAll();
            console.log(taskData);
            console.log('cuenta creada');
        }catch(e){
            alert('Invalid Data');
        }
    }

    function onToLogin(e){
        e.preventDefault()
        DOMHandler.render(Login);
    }


    return {
        render: ()=>`
        <div class="header-login">
        <img src="./assets/icons/doable.svg" alt="">
        </div>
        <div class="container-login">
        <form class="js-signup" action="">
            <div class="email-form">
                <label for="">Email</label>
                <div class="email-input"><input type="text" name="email" placeholder="you@example.com"></div>
            </div>
            <div class="email-form">
                <label for="">Password</label>
                <div class="email-input"><input type="password" name="password" placeholder="******"></div>
            </div>
            <button class="btn-submit" type="submit">Create account</button>
        </form>
        <div class="js-login div-create-account"><a class="link-create-account href=">Login</a></div>
        </div>
        `,
        initEventListeners:()=>{
            const signup=document.querySelector('.js-signup');
            const login=document.querySelector('.js-login');
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