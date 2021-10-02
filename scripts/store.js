//import { ALFABETICO } from "./constants.js";

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

    return {
        clear,
        setUserData,
        setTasks,
        getAllTasks,
        addNewTask,
        orderBy:null,
        orderByAlpha,
        orderByDate,
        orderByImportance,
    }


})()

export default STORE;  