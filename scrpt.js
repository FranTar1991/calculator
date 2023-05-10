

let buttonsContainer = document.getElementById("numbers-container")
let display = document.getElementById("calculator-display")
let displayText 
let number1 = ""
let number2 = ""
let operator =""
let callingEquals = false
const operators = {Addition: "+",Subtraction:"-",Division:"÷",Multiplication:"x", Equals: "="}

for(let button of buttonsContainer.children){
    switch(button.innerText){
        case operators.Addition:
        case operators.Subtraction:
        case operators.Division:
        case operators.Multiplication:
            button.addEventListener("click", setOperationClickListener)
            break
        case operators.Equals:
            button.addEventListener("click", ()=> {
                operate(operator, number1, number2)
                callingEquals = true})
            break
        default:
            button.addEventListener("click",setNumberClickListener)
    }
}


function updateDisplay(){
    display.innerText = number1+operator+number2
}

function setOperationClickListener(button){
    const op =  button.target.innerText
    console.log("operator"+op)
    if(number2 || number2 === 0){
        operate(operator, number1, number2)
    }
    if(number1 || number1 === 0){
        operator = op
        updateDisplay()
    } 

}

function setNumberClickListener2(button){
    const number = button.target.innerText
   
   if (!operator){
        if(!callingEquals){
            number1 += number
        }  else{
            number1 = number
            callingEquals = false
        } 
   } else{
    number2 += number
   } 

    updateDisplay()
}

function operate(op, n1, n2){

    if(!op || (!n1 && n1 !== 0) || (!n2 && n2 !== 0)) return
    let result

    switch(op){
        case operators.Addition: 
            result = parseFloat(n1) + parseFloat(n2)
            break
        case operators.Subtraction:
            result = parseFloat(n1) - parseFloat(n2)
            break
        case operators.Multiplication:
            result = parseFloat(n1) * parseFloat(n2)
            break
        case operators.Division:
            result = parseFloat(n1) / parseFloat(n2)
            break

    }
    number1 =  Number.isInteger(result) ? result : result.toFixed(2) 
    number2 = ""
    operator = ""
    updateDisplay()
}

