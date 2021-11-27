import DOMHandler from "../../dom_handler.js";
import { SessionFetcher } from "../services/sessions_fetch.js";
import { TaskFetcher } from "../services/task_fetcher.js";
import STORE from "../store.js";
import { Loader } from "./loader.js";
import Main from "./main.js";
import SignUp from "./sign-up.js";

const Login=(()=>{
    async function onLogin(e){
        e.preventDefault();
        try{
            const {email,password}=e.target;
            DOMHandler.render(Loader)
            const userData= await SessionFetcher.login(email.value,password.value);
            STORE.setUserData(userData);
            sessionStorage.setItem('token',userData.token);
            const tasks = await TaskFetcher.getAll();
            STORE.setTasks(tasks);
            DOMHandler.render(Main);
        }catch(e){
            alert('Invalid Credentials');
            DOMHandler.render(Login)
        }

    }

    async function onCreateUser(e){
        e.preventDefault();
        DOMHandler.render(SignUp);
        //console.log('creando cuenta');
    }

    return{
        render:()=>`
        <div class="header-login">
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
                <button class="btn-submit" type="submit">Login</button>
            </form>
            <span class="span-login">Create account</span>
        </div>
        `,
        initEventListeners:()=>{
            const form=document.querySelector('.form-login');
            const singUp=document.querySelector('.span-login')
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