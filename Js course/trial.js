function addNumbers(a,b){
   
    return a+b;
    
}
console.log(addNumbers(3,7));

function add(){
    let a = 4;
    let b = 5;
    let sum = a + b;
    console.log(sum);
}
add()

document.getElementById('yoo').innerHTML = ''

const popUp = () =>{
    alert("Yoo Bryan")
}
document.getElementById('click').addEventListener('click', ()=>{
    popUp();
})