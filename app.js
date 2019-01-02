const htmlPreviousDisplay = document.getElementById('previousDisplay');
const htmlCurrentOperation = document.getElementById('currentOperation');
const htmlResultFlag = document.getElementById('resultFlag');
const htmlDisplay = document.getElementById('display');

const maxDisplayLength = 9;
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
  displayString = `${value}`.slice(0, maxDisplayLength);
}

function setCurrentOperation(op) {
  currentOperation = op;
  let fontawesomeOperationIcon;
  switch (op) {
    case '+':
      fontawesomeOperationIcon = '<i class="fas fa-plus"></i>';
      break;
    case '-':
      fontawesomeOperationIcon = '<i class="fas fa-minus"></i>';
      break;
    case '*':
      fontawesomeOperationIcon = '<i class="fas fa-times"></i>';
      break;
    case '/':
      fontawesomeOperationIcon = '<i class="fas fa-divide"></i>';
      break;
    default:
      fontawesomeOperationIcon = '';
      break;
  }
  htmlCurrentOperation.innerHTML = fontawesomeOperationIcon;  
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

function keypress(event) {
  let char = String.fromCharCode(event.charCode);
  switch (char){
    case '+':
    case '-':
    case '*':
    case '/':
      clickBinaryOp(char);
      break;
    case '.':
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      clickFigure(char);
      break;
    default:
      break;
  }
}

function keydown(event) {
  if (event.keyCode === 13) {
    clickUnaryOp('=');
  } else if (event.keyCode === 8) {
    clickUnaryOp('backspace');
  } else if (event.keyCode === 27) {
    clickUnaryOp('C');
  }
}

function clickFigure(figure) {
  htmlResultFlag.style.backgroundColor = "";
  if (figure === '.') {
    if (!displayHasDecimalPart()) {
      displayString += '.';
    }
  } else {
    if (displayString === '0' || Number.isNaN(displayValue())) {
      displayString = figure;
    } else {
      displayString += figure;
    }
  }
  displayString = displayString.slice(0, maxDisplayLength);
  refreshDisplay();  
}

function clickBinaryOp(op) {
  if (Number.isNaN(displayValue())) {
    return;
  }
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
    default:
      result = displayValue();
      break;
  }
  setDisplayValue(result);
  setCurrentOperation('');
}

function clickUnaryOp(op) {
  if (Number.isNaN(displayValue())) {
    displayString = '0';
  }
  switch (op) {
    case 'CE':
      displayString = '0';
      refreshDisplay();
      break;      
    case 'C':
      displayString = '0';
      setCurrentOperation('');
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
    case "sqrt":
      setDisplayValue(Math.sqrt(displayValue()));
      refreshDisplay();
      break;
    case "^2":
      setDisplayValue(Math.pow(displayValue(), 2));
      refreshDisplay();
      break;      
    case "%":
      resolve();
      setDisplayValue(displayValue() / 100);
      refreshDisplay();
      break;        
  }
}