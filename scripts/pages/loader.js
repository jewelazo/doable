export const Loader=(()=>{
    return {
        render: function(){
            return `
            <div class="loader"></div>
            `
        },
        initEventListeners: function(){
            console.log("loading")
        }
    }
})()