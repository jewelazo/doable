//import { ALFABETICO } from "./constants.js";

import { TaskFetcher } from "./services/task_fetcher.js";

const STORE = (function (){
    let userData={};
    let tasks=[];

    function clear(){
        userData={};
        tasks=[];
    }
    function setUserData(data){
        userData=data;

    }
    function setTasks(tasks_data){
        tasks= tasks_data;
        STORE.orderByAlpha();
    }

    function getAllTasks(){
        return [...tasks];
    }
    function addNewTask(newTask){
        tasks=[...tasks,newTask];
    }

    function orderByDate(){
        tasks.sort((a,b)=> new Date(b['due_date'])- new Date(a['due_date']));

    }

    function orderByAlpha(){
        tasks.sort((a,b)=>a.title.toUpperCase().localeCompare(b.title.toUpperCase()));
        

    }
    function orderByImportance(){
        tasks.sort((a,b)=>b.important-a.important);

    }

    function filterByPending(){
        tasks=tasks.filter(task => task.completed===false);
    }
    async function offByPending(){
        tasks= await TaskFetcher.getAll();
    }

    function filterByImport(){
        tasks=tasks.filter(task => task.important);
    }
    async function offByImport(){
        tasks= await TaskFetcher.getAll();
    }
    function getTask(id){
        return tasks.find(task =>task.id===id);
    }

    return {
        clear,
        setUserData,
        setTasks,
        getAllTasks,
        addNewTask,
        orderBy:null,
        onShow:null,
        onImport:null,
        orderByAlpha,
        orderByDate,
        orderByImportance,
        filterByPending,
        offByPending,
        filterByImport,
        offByImport,
        getTask,
    }


})()

export default STORE;  