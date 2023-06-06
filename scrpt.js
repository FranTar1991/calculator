

const buttonsContainer = document.getElementById("numbers-container")
const display = document.getElementById("calculator-display")
const deleteBtn = document.getElementById("delete-btn")
const clearBtn = document.getElementById("clear-btn")
let displayText 
let number1 = ""
let number2 = ""
let operator =""
let equalsPressed = false
const operators = {Addition: "+",Subtraction:"-",Division:"÷",Multiplication:"x", Equals: "="}

deleteBtn.addEventListener("click",() =>{
    if(operator){
       number2 ? number2 = removeLastNumber(number2)  : operator = "" 
    } else {
        number1 = removeLastNumber(number1)  
    }
    updateDisplay()
})

clearBtn.addEventListener("click",()=>{
    location.reload()
})
function removeLastNumber(operand){
    let stringOperand = operand.toString()
    return  stringOperand.length <= 1 && !number2 ? 0 : stringOperand.slice(0,-1)
}

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
                equalsPressed = true})
            break
        default:
            button.addEventListener("click",setNumberClickListener)
    }
}


function updateDisplay(){
    
    display.innerText = number1+operator+number2
  
    if (number1 == 0) number1 = ""
}

function setOperationClickListener(button){
    const op =  button.target.innerText
    const number2Exist = number2 || number2 === 0
    const number1Exist = number1 || number1 === 0
    
    if(number2Exist){
        operate(operator, number1, number2, true, op)
        
    }else if(number1Exist){
        operator = op
        updateDisplay()
    } 

}

function setNumberClickListener(button){
    const number = button.target.innerText
    
   if (!operator){
    
    if (!checkIfValidNumber(number1.toString(), number)) return
    equalsPressed ? handleEqualsPressed(number) : number1 += number
   } else{
    if (!checkIfValidNumber(number2.toString(), number)) return
    number2 += number
   } 

   //If I click on any other button after performing an opertation that results in a decimal number
   //printed in the display, the application does not update the UI because
   // it recognizes the number as invalid because it already has 2 decimals.

    updateDisplay()
}

function checkIfValidNumber(currentNumber, newDigit){
    let numberDecimals = []
    let isValidNumber = true
    if(currentNumber.includes(".") && newDigit === ".") {
        isValidNumber = false
    }else if(currentNumber.toString().includes(".")){
        
        numberDecimals = currentNumber.split(".")[1]
        console.log(currentNumber+" "+numberDecimals.length)
        isValidNumber = numberDecimals.length >= 2 ? false : true
    }
    
    return isValidNumber
    
}

function handleEqualsPressed(number){
        number1 = number
        equalsPressed = false
}

function operate(op, n1, n2, isNewOperation = false, newOp){

    if(!op || (!n1 && n1 !== 0) || (!n2 && n2 !== 0) || checkIfDivisionByZero(op, n2)) return
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
    operator = isNewOperation ? newOp : ""
    updateDisplay()
}

function checkIfDivisionByZero(op, n2){

    return op === operators.Division && n2 == 0 ? showAlertDivisionZero() : false
}

function showAlertDivisionZero(){
    alert("Error: Dividing by zero? Nope, can't do that. It's a one-way ticket to the land of mathematical absurdity.")
    return true
}

