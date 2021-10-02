import DOMHandler from "../../dom_handler.js";
import { SessionFetcher } from "../services/sessions_fetch.js";
import { TaskFetcher } from "../services/task_fetcher.js";
import STORE from "../store.js";
import Main from "./main.js";
import SignUp from "./sign-up.js";

const Login=(()=>{
    async function onLogin(e){
        e.preventDefault();
        try{
            const {email,password}=e.target;
            const userData= await SessionFetcher.login(email.value,password.value);
            STORE.setUserData(userData);
            sessionStorage.setItem('token',userData.token);
            const tasks = await TaskFetcher.getAll();
            STORE.setTasks(tasks);
            //const taskData= await TaskFetcher.getAll();
            DOMHandler.render(Main);
        }catch(e){
            alert('Invalid Credentials');
        }

    }

    async function onCreateUser(e){
        e.preventDefault();
        DOMHandler.render(SignUp);
        console.log('creando cuenta');
    }

    return{
        render:()=>`
        <div class="header-login">
        <img src="./assets/icons/doable.svg" alt="">
        </div>
        <div class="container-login">
        <form class="js-login" action="">
            <div class="email-form">
                <label for="">Email</label>
                <div class="email-input"><input type="text" name="email" placeholder="you@example.com"></div>
            </div>
            <div class="email-form">
                <label for="">Password</label>
                <div class="email-input"><input type="password" name="password" placeholder="******"></div>
            </div>
            <button class="btn-submit" type="submit">Login</button>
        </form>
        <div class="div-create-account"><a class="link-create-account href=">Create account</a></div>
        </div>
        `,
        initEventListeners:()=>{
            const form=document.querySelector('.js-login');
            const singUp=document.querySelector('.div-create-account')
            if (form){
                form.addEventListener('submit',onLogin);
            }
            if (singUp){
                singUp.addEventListener('click',onCreateUser);
            }
        }

    }



}
)()

export default Login;