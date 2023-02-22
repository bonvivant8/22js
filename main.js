const ulElement=document.querySelector('ul');
const btn = document.querySelectorAll('.btn')
const form=document.getElementById('singup');
const formName=document.getElementById('name');
const formRequire=form.querySelectorAll('.required')
const allSel = document.querySelectorAll('.select');
const radioBTN=document.getElementsByName('radio')
const EMTY_Field='*The field is empty';
const formData=document.querySelector('.form-data');
let radioAnsw='';
ulElement.addEventListener('click',(event)=>{
if (event.target.classList.value.includes('nav-link')){
  const activeEl=document.querySelector('.active')
  if(activeEl){
    activeEl.classList.remove('active')
  }
  event.target.classList.add('active')

  closeDropdown()
  closeDropdown2()
  event.target.nextElementSibling.classList.toggle('has-drop',)
}
  if (event.target.classList.value.includes('drop-link')){
    const activeEl=document.querySelector('.active')
    if(activeEl){
      activeEl.classList.remove('active')
    }
    event.target.classList.add('active')
    closeDropdown2()
    event.target.nextElementSibling.classList.toggle('has-drop')
  }

});

function closeDropdown(){
  const drop=document.querySelectorAll('.dropdown')
  Array.from(drop).forEach(item=>item.classList.remove('has-drop'));
}

function closeDropdown2(){
  const drop=document.querySelectorAll('.dropdown2')
  Array.from(drop).forEach(item=>item.classList.remove('has-drop'));
}
Array.from(btn).forEach(item => item.addEventListener('click', hideEverything))
function hideEverything(){
  closeDropdown()
  closeDropdown2()

}

function myForm() {
  function add() {
    form.classList.add('has-drop')
  }

  const btn = document.querySelectorAll('.btn')
  Array.from(btn).forEach(item => item.addEventListener('click', add))
};
myForm()

form.addEventListener('submit',(e)=>{
  e.preventDefault();
 let valid=true;
  formRequire.forEach((field)=>{
    if(field.value===''){
     valid=false;
      printErr(field.id,EMTY_Field)
    }
    if(document.getElementById('radio1').checked==true){
     radioAnsw=document.getElementById('radio1').value
      console.log(radioAnsw)
    }
    else if(document.getElementById('radio2').checked==true){
      radioAnsw=document.getElementById('radio2').value
      console.log(radioAnsw)
    }
    else{
      form.querySelector('.radio-massage').textContent=EMTY_Field
      valid=false;
    }
  })

  allSel.forEach((sel) => {
      const selNum = sel.selectedIndex
      if(selNum === 0){
        printErr(sel.id,EMTY_Field)
        valid=false;
      }
  });

if (valid){

  sendFormToHTML()
  form.classList.remove('has-drop')
  formData.classList.add('has-drop')
}

})
formName.addEventListener('input',(e)=>{
  if (e.target.value.length>0){
    form.elements.name.nextElementSibling.textContent='';
    form.elements.name.classList.remove('error')
  }
  else {
    form.elements.name.nextElementSibling.textContent=EMTY_Field
  }
})
allSel.forEach(item=>item.addEventListener('click',color));
radioBTN.forEach(item=>item.addEventListener('click',errRadio));


function color(e){
  const selNum = e.target.selectedIndex
  if(selNum !== 0){
    e.target.nextElementSibling.textContent='';
    e.target.classList.remove('error')
  }
  else{
    e.target.nextElementSibling.textContent=EMTY_Field
  }
}
function errRadio(){
  if(document.getElementById('radio1').checked==true||document.getElementById('radio2').checked==true){
    form.querySelector('.radio-massage').textContent=''

}
}
function printErr(element,massage){
  form.elements[element].nextElementSibling.textContent=massage
  if (massage){
    form.elements[element].classList.add('error')
  }
  else {
    form.elements[element].classList.remove('error')
  }
}

function sendFormToHTML(){

  for(let i =0;i<form.elements.length-1;i++){
    let elementsValue=form.elements[i].value
    if(form.elements[i].type==='radio'){
     continue;

    }
    const div=document.createElement('div')
    div.textContent=`${form.elements[i].name}  ${elementsValue}`;
    formData.append(div)
  }
 const div2=document.createElement('div')
  div2.textContent=`Way of payment:${radioAnsw}`
  formData.append(div2)
}