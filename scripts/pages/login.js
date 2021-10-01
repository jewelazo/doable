import DOMHandler from "../../dom_handler.js";
import { SessionFetcher } from "../services/sessions_fetch.js";
import { TaskFetcher } from "../services/task_fetcher.js";
import SignUp from "./sign-up.js";

const Login=(()=>{
    async function onLogin(e){
        e.preventDefault();
        const {email,password}=e.target;
        try{
            const userData= await SessionFetcher.login(email.value,password.value);
            sessionStorage.setItem('token',userData.token);
            const taskData= await TaskFetcher.getAll();
            console.log(taskData);
            console.log('logeado and traes data');
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