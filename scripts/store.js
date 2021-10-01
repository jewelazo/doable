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
        tasks=tasks_data;
    }

    function getAllTasks(){
        return [...tasks];
    }
    function addNewTask(newTask){
        tasks=[...tasks,newTask];
    }


    return {
        clear,
        setUserData,
        setTasks,
        getAllTasks,
        addNewTask,
    }


})()

export default STORE;  