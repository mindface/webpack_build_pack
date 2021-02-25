
import { TimeX } from './parts/timer'
import { setObserver } from './parts/ob'

window.addEventListener('load', () => {
 const targetElements = document.getElementsByClassName("animation")
 const timeX = new TimeX();
 const ob = new setObserver();
 
 for (let index = 0; index < targetElements.length; index++) {
   const element = targetElements[index];
   const time = index * 1500;
   timeX.addClass(element,time,'addClassName').then( () => {
     element.classList.add('kkkk')
   } )
 }
})