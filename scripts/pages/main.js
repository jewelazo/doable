import DOMHandler from "../../dom_handler.js";
import HeaderPage from "../components/header.js"
import { DUE_DATE,IMPORTANCE,ALFABETICO } from "../constants.js";
import { TaskFetcher } from "../services/task_fetcher.js";
import STORE from "../store.js";

const Main=(()=>{
    let header=HeaderPage();

    function onOrderBy(e){
        const order=e.target;


        if (order.value==='alpha'){
            console.log(order.value)
            STORE.orderByAlpha();
            STORE.orderBy=ALFABETICO;
            let taskss=STORE.getAllTasks()
            console.log('poralpha',taskss)
            DOMHandler.render(Main);
            
        }
        if (order.value==='date'){
            console.log(order.value)
            STORE.orderByDate();
            STORE.orderBy=DUE_DATE;
            let taskss=STORE.getAllTasks()
            console.log('pordate',taskss)
            DOMHandler.render(Main);
            
        }
        if (order.value==='importance'){
            console.log(order.value)
            STORE.orderByImportance();
            STORE.orderBy=IMPORTANCE;
            let taskss=STORE.getAllTasks()
            console.log('porimportancia',taskss)
            DOMHandler.render(Main);
            
        }
       
    }

    async function onShow(e){
        const choosed=e.target.closest('.js-pending');
        const choosed_imp=e.target.closest('.js-import');
        console.log(choosed)
        if (choosed){
            if (choosed.checked){
                STORE.filterByPending();
                STORE.onShow=true;
                DOMHandler.render(Main);
            }else if (choosed.checked===false){
                await STORE.offByPending();
                STORE.onShow=false;
                DOMHandler.render(Main);
            }
        }
       
        if (choosed_imp){
            if (choosed_imp.checked){
                STORE.filterByImport();
                STORE.onImport=true;
                DOMHandler.render(Main);
            }else if (choosed_imp.checked===false){
                await STORE.offByImport();
                STORE.onImport=false;
                DOMHandler.render(Main);
            }
         }
    }

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

    // async function onChangeImportant(e){
    //     const taskId=e.target.dataset.id;
    //     let taskData=STORE.getTask(parseInt(taskId));
    //     taskData.important=!taskData.important
    //     const TaskUpdated= await TaskFetcher.update(taskId,taskData);
    //     console.log(TaskUpdated);
        

    // }

    return {
        render: function(){
            let allTasks=STORE.getAllTasks();
            console.log('ahora main es:',allTasks);
            let allTasksList=allTasks.map( task=>
                `<li class="flex-task-li">
                <div><input type="checkbox" ${task.completed ? 'checked':''}></div>
                <div class="flex-column-task">
                    <div class="flex-description">
                        <div>${task.title}</div>
                        <div><img class="js-img-imp" data-id=${task.id} src="./assets/icons/${task.important ? 'icon_on_importance.svg':'icon_off_importance.svg'}" alt=""></div>
                    </div>
                    <div class="date-task">${task['due_date']}</div>
                </div>
                </li>`);
            //console.log(allTasksList);
            return `
                ${header}
            <form class="js-form-main" action="">
                <div>
                <label for="sort">Sort</label>
                <select class="js-select" name="sort" id="">
                    <option value="alpha" ${STORE.orderBy===ALFABETICO ? 'selected':''}>Alphabetical (a-z)</option>
                    <option value="date" ${STORE.orderBy===DUE_DATE ? 'selected':''}>Due Date</option>
                    <option value="importance" ${STORE.orderBy===IMPORTANCE ? 'selected':''}>Importance</option>
                </select>
                </div>
                <div class="js-checkbox">
                    <label for="show">Show</label>
                    <input class="js-pending" type="checkbox" value="pending" ${STORE.onShow ? 'checked':''} >Only pending
                    <input class="js-import" type="checkbox" value="important" ${STORE.onImport ? 'checked':''} >Only important
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
            const check=document.querySelector('.js-checkbox');
            //const imgImportant=document.querySelectorAll('.js-img-imp');

            if (form){
                form.addEventListener('submit',onCreateTask);
                form.addEventListener('change',onOrderBy);
            }
            if (check){
                check.addEventListener('click',onShow);
            }
            // if (imgImportant){
            //     imgImportant.forEach( img => img.addEventListener('click',onChangeImportant));
            // }
            header.initEventListeners();
            
        }
    }

})()

export default Main;