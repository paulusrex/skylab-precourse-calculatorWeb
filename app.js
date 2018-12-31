const htmlPreviousDisplay = document.getElementById('previousDisplay');
const htmlCurrentOperation = document.getElementById('currentOperation');
const htmlResultFlag = document.getElementById('resultFlag');
const htmlDisplay = document.getElementById('display');

let currentOperation = '';
let previousValue = null;
let displayString = '0';
const displayHasDecimalPart = () => displayString.includes('.');
const displayValue = () => {
  if (displayHasDecimalPart()) {
    return Number.parseFloat(displayString);
  } else {
    return Number.parseInt(displayString);
  }
}

function setDisplayValue (value) {
  displayString = `${value}`;
}

function setCurrentOperation(op) {
  currentOperation = op;
  htmlCurrentOperation.innerHTML = op;  
  if (op === '') {
    htmlPreviousDisplay.innerHTML = '';
    document.getElementById
    htmlCurrentOperation.style.backgroundColor = "";
    htmlResultFlag.style.backgroundColor = "#00ee00";
  } else { 
    htmlPreviousDisplay.innerHTML = `${previousValue} ${op}`;
    htmlCurrentOperation.style.backgroundColor = "#00ee00";
    htmlResultFlag.style.backgroundColor = "";
  } 
}

function refreshDisplay() {
  htmlDisplay.innerHTML = displayString;
}

function clickFigure(figure) {  
  if (figure === '.') {
    if (!displayHasDecimalPart()) {
      displayString += '.';
    }
  } else {
    if (displayString === '0') {
      displayString = figure;
    } else {
      displayString += figure;
    }
  }
  refreshDisplay();
}

function clickBinaryOp(op) {
  if (currentOperation !== '') {
    resolve();
  }
  previousValue = displayValue();
  displayString = '0';
  setCurrentOperation(op);
}

function resolve() {
  let result;
  switch (currentOperation){
    case '+':
      result = previousValue + displayValue();
      break;    
    case '-':
      result = previousValue - displayValue();
      break;    
    case '*':
      result = previousValue * displayValue();
      break;
    case '/':
      if (displayValue() === 0) {

      } else {
        result = previousValue + displayValue();
      }
      break;
  }
  setDisplayValue(result);
  setCurrentOperation('');
}

function clickUnaryOp(op) {
  switch (op) {
    case 'CE':
      displayString = '0';
      refreshDisplay();
      break;      
    case 'C':
      displayString = '0';
      currentOperation = '';
      refreshDisplay();
      break;
    case '+-':
      setDisplayValue(-displayValue());
      refreshDisplay();
      break;
    case 'backspace':      
      displayString = displayString.length === 1 ? '0' : displayString.slice(0,displayString.length-1);
      if (displayString === '-') {
        displayString = '0';
      }
      refreshDisplay();
      break;
    case "=":
      resolve();
      refreshDisplay();
      break;
  }
}