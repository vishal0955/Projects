const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generatorButton");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = "~!@#$%^&*()_+|-=\{}[],.<>/?";


let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();  
  
//set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength; 

}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadow
}

function getRndInteger(min, max){
  return Math.floor(Math.random() * (max-min) + min);
}

function generateRandomNo(){
    return getRndInteger(0,9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol() {
 const rmdNum = getRndInteger(0, symbols.length);
 return symbols.charAt(rmdNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower =true;
    if (numbersCheck.checked) hasNum =true;
    if (symbols.checked) hasSym =true;

    if(hasUpper && hasLower && (hasNum || hasSym)  && passwordLength >=8 ) 
    {
     setIndicator("#0f0");   
    }
    else if ( 
        (hasLower || hasUpper) && (hasNum || hasSym) 
        && passwordLength >= 6
    ){
        setIndicator("#ff0");
    }else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "failed";

    }
    //to make copy wala span visible
     copyMsg.classList.add("active");
     setTimeout( () => {
        copyMsg.classList.remove("active");
     },2000);
}

function shufflePassword(array)  {
    //fisher yates Method
    for( let i = array.length -1; i>0; i++)
    {
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str+=el));
    return str;
}

function handleCheckBoxChange() {
    checkcount = 0;
    allCheckBox.forEach( (checkbox) => {
       if(checkbox.checked)
       checkcount++;
    });   
    
    //special condition 
    if ( passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}
    

allCheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange());

})

inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
    copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of checkbox is selected
    if(checkCount <=0 ) return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //to find new password
    
    //remove old password
    password = "";

    //lets put the stuff mentioned by checkboxes
    // if(uppercaseCheck.Checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.Checked) {
    //     password += generateLowerCase();
    // }

    // if (numbersCheck.checked) {
    //     password = generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password = generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.Checked)
    funcArr.push(generateUpperCase);
    
    if(lowercaseCheck.Checked)
    funcArr.push(generateLowerCase);

    if(numbersCheck.Checked)
    funcArr.push(generateRandomNumbers);

    if(symbolsCheck.Checked)
    funcArr.push(generateSymbol);

    //compulsory addition
    
    for(let i=0; i<funcArr.length; i++)
    {
        password+= funcArr[i]();
    }

    //remaining addition

    for(let i=0; i<passwordLength-funcArr.length; i++)
    {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

// shuffle the password

password = shufflePassword();

//show in UI
 passwordDisplay.value = password;

//claculate strength
calcStrength();


} )