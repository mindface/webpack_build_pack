
export function setObserver(){
  const items = document.querySelectorAll('.l-section');
  const options = {
    root:null,
    rootMargin: "-50% 0px",
    threshold: 0
  };
  let observer = new IntersectionObserver(doTimeIntersect,options)
  items.forEach( box => {
    observer.observe(box);
  });
  function doTimeIntersect(entries){
    entries.forEach( entry => {
      if(entry.isIntersecting){
        activeIndex(entry.target);
      }
    });
  };
  function activeIndex(element){
    const currentElement = document.querySelector('.active');
    const targetElement = element.querySelector('p');
    if(currentElement !== null){
      currentElement.classList.remove('active');
    }
    const newActiveIndex = document.querySelector(`.l-section .item0${targetElement.dataset.id}`);
    console.log(newActiveIndex)
    console.log(`.item0${element.dataset.id}`)
    newActiveIndex.classList.add('active')
  }
}
