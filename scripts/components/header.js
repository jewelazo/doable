import DOMHandler from "../../dom_handler.js";
import Login from "../pages/login.js";
import { SessionFetcher } from "../services/sessions_fetch.js";

const HeaderPage=function(){

    async function onLogout(e){
        await SessionFetcher.logout();
        sessionStorage.removeItem("token");
        DOMHandler.render(Login);
    }
    return {
        toString:function(){
            return `
            <div class="header-task">
                <img src="./assets/icons/doable.svg" alt="">
                <div class="js-logout-header" ><img src="./assets/icons/icon-logout.svg" alt=""></div>
            </div>
            `
        },
        initEventListeners: function(){
            const logout=document.querySelector('.js-logout-header');
            if (logout){
                logout.addEventListener('click',onLogout);
            }

        }
    }
}

export default HeaderPage;