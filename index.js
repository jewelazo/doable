import DOMHandler from "./dom_handler.js";
import Login from "./scripts/pages/login.js";

(async () => {
    if(sessionStorage.getItem("token")) {
      try {
          console.log('logeado')
        //let boards = await BoardsFetcher.getAll();
        //STORE.setBoards(boards);
        //return DOMHandler.render(Main)
      }catch(e){
        console.log(e);
      }
    }
    DOMHandler.render(Login);
})();