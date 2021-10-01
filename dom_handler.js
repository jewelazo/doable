const DOMHandler = (()=>({
    render: (element)=>{
      const container = document.querySelector('.js-content');
      container.innerHTML = element.render();
      element.initEventListeners();
    }
  }))();
  
export default DOMHandler;