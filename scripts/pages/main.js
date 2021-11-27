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
            //console.log('poralpha',taskss)
            DOMHandler.render(Main);
            
        }
        if (order.value==='date'){
            console.log(order.value)
            STORE.orderByDate();
            STORE.orderBy=DUE_DATE;
            let taskss=STORE.getAllTasks()
            //console.log('pordate',taskss)
            DOMHandler.render(Main);
            
        }
        if (order.value==='importance'){
            console.log(order.value)
            STORE.orderByImportance();
            STORE.orderBy=IMPORTANCE;
            let taskss=STORE.getAllTasks()
            //console.log('porimportancia',taskss)
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
            //console.log(newTask);
            STORE.addNewTask(newTask);
            DOMHandler.render(Main);

        }catch(e){
            alert(e);
        }

    }

    async function onChangeImportant(e){
        const taskId=e.target.dataset.id;
        let taskData=STORE.getTask(parseInt(taskId));
        taskData.important=!taskData.important
        await TaskFetcher.update(taskId,{important:taskData.important});
        STORE.updateTaskByImg(taskId,taskData.important);
        DOMHandler.render(Main);
        
    }
    async function onChangePending(e){
        const taskId=e.target.dataset.id;
        let taskData=STORE.getTask(parseInt(taskId));
        taskData.completed=!taskData.completed;
        await TaskFetcher.update(taskId,{completed:taskData.completed});
        STORE.updateTaskByCheckbox(taskId,taskData.completed);
        DOMHandler.render(Main);
        
    }



    return {
        render: function(){
            let allTasks=STORE.getAllTasks();
            //console.log('ahora main es:',allTasks);
            let allTasksList=allTasks.map( task=>
                `<div class="card">
                    <div class="card-main">
                        <div class="checkbox-card">
                            <input class="checkbox-main js-checkbox-pending" data-id=${task.id} type="checkbox" ${task.completed ? 'checked':''}>
                        </div>
                        <div class="card-description">
                            <span class="span-task-on">${task.title}</span>
                            <span class="span-date-on">${task['due_date']}</span>
                        </div>
                    </div>
                    <img class="img-importance js-img-imp" data-id=${task.id} src="/assets/icons/${task.important ? 'icon_on_importance.svg':'icon_off_importance.svg'}" alt="">
                </div>
                `);
            //console.log(allTasksList);
            return `
                ${header}
            <form class="js-form-main" action="">
                <div class="filters">
                    <div>
                        <label for="sort">Sort</label>
                        <select class="js-select" name="sort" id="">
                            <option value="alpha" ${STORE.orderBy===ALFABETICO ? 'selected':''} >Alphabetical (a-z)</option>
                            <option value="date" ${STORE.orderBy===DUE_DATE ? 'selected':''}>Due Date</option>
                            <option value="importance" ${STORE.orderBy===IMPORTANCE ? 'selected':''}>Importance</option>
                        </select>
                    </div>
                    <div>
                        <label for="show">Show</label>
                        <div class="checkbox-main-container js-checkbox">
                            <div>
                                <input class="checkbox-main js-pending" type="checkbox" value="pending" ${STORE.onShow ? 'checked':''}>
                                <span>Only pending</span>
                            </div>
                            <div>
                                <input  class="checkbox-main js-import" type="checkbox" value="important" ${STORE.onImport ? 'checked':''}>
                                <span>Only important</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="cards-container">
                    ${allTasksList.join('')}
                </div>
            
                <div class="mg-btn">
                    <input name="title" type="text" placeholder="do the dishes...">
                    <input name="due_date" type="date">
                    <button class="btn-submit" type="submit">Add Task</button>
                </div>    
                </form>
                `
        },
        initEventListeners: function(){
            const form=document.querySelector('.js-form-main');
            const check=document.querySelector('.js-checkbox');
            const imgImportant=document.querySelectorAll('.js-img-imp');
            const checkPending=document.querySelectorAll('.js-checkbox-pending');

            if (form){
                form.addEventListener('submit',onCreateTask);
                form.addEventListener('change',onOrderBy);
            }
            if (check){
                check.addEventListener('click',onShow);
            }
            if (imgImportant){
                imgImportant.forEach( img => img.addEventListener('click',onChangeImportant));
            }
            if (checkPending){
                checkPending.forEach(checkbox => checkbox.addEventListener('click',onChangePending));
            }
            header.initEventListeners();
            
        }
    }

})()

export default Main;