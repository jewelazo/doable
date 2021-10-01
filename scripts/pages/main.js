import DOMHandler from "../../dom_handler.js";
import HeaderPage from "../components/header.js"
import { TaskFetcher } from "../services/task_fetcher.js";
import STORE from "../store.js";

const Main=(()=>{
    let header=HeaderPage();

    async function onCreateTask(e){
        e.preventDefault();
        try{
            const {title,due_date}=e.target;
            const newTask= await TaskFetcher.create({title:title.value,'due_date':due_date.value})
            console.log(newTask);
            STORE.addNewTask(newTask);
            DOMHandler.render(Main);

        }catch(e){
            alert(e);
        }

    }

    return {
        render: function(){
            let allTasks=STORE.getAllTasks();
            console.log(allTasks);
            let allTasksList=allTasks.map( task=>
                `<li class="flex-task-li">
                <div><input type="checkbox"></div>
                <div class="flex-column-task">
                    <div class="flex-description">
                        <div>${task.title}</div>
                        <div><img src="./assets/icons/icon_off_importance.svg" alt=""></div>
                    </div>
                    <div class="date-task">${task['due_date']}</div>
                </div>
                </li>`);
            console.log(allTasksList);
            return `
                ${header}
            <form class="js-form-main" action="">
                <div>
                <label for="sort">Sort</label>
                <select name="sort" id="">
                    <option value="alphabetical">Alphabetical (a-z)</option>
                    <option value="date">Due Date</option>
                    <option value="importance">Importance</option>
                </select>
                </div>
                <div>
                    <label for="show">Show</label>
                    <input type="checkbox" value="pending" checked>Only pending
                    <input type="checkbox" value="important" checked>Only important
                </div>
                <ul>
                    ${allTasksList.join('')}
                </ul>
                <div class="mg-btn">
                    <input name="title" type="text" placeholder="do the dishes...">
                    <input name="due_date" type="date" placeholder="mm / dd / yy">
                    <button class="btn-submit" type="submit">Add Task</button>
                </div>
                </form>
                `
        },
        initEventListeners: function(){
            const form=document.querySelector('.js-form-main');
            if (form){
                form.addEventListener('submit',onCreateTask);
            }
            header.initEventListeners();
        }
    }

})()

export default Main;