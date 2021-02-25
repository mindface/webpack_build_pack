
export function TimeX(){
  this.addClass = (element,time,addClassName) => {
    return new Promise( (resolve,reject) => {
       setTimeout( () => {
         element.classList.add(addClassName);
         resolve ();
       }, time)
    })
  }
}

