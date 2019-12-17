// Password criteria
// Length
// Char type
    // - Special Characters
    // - Numeric Characters
    // - Lowercase Characters
    // - Uppercase Characters

// Validate user input and ensure that at least one character type is selected

// Once all prompts are answered, the user will be presented with a password matching the answered prompts. Displaying the generated password in an alert is acceptable, but attempt to write the password to the page instead.

// As a bonus, the user should also have the option to click a button to copy the password to their clipboard.

// Your application should have a clean and polished user interface and be responsive, ensuring that it adapts to multiple screen sizes.

// Your application should be deployed to GitHub Pages.

// Your application's GitHub repository should contain a README.md file explaining the purpose and functionality of the application. The README.md file should include a screenshot of the completed application as well as a link to the deployed GitHub Pages URL.

const lowerAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const upperAlphabet = [];
//Created a for loop to fill the upper alphabet because lazy
for (let i = 0; i < lowerAlphabet.length; i++) {
    upperAlphabet.push(lowerAlphabet[i].toUpperCase());
}
let prevIndex = [];
let userInput = undefined;
let pw = "";
let charsAllowed = [];

// Keeps printing huge segments from specials, is it being pushed weirdly so that multiple characters are being stored in one element?
let specials = ['!','@','#','$','%','^','&','*','(',')','-','+','=','\`', '\"','~','\/','\\','{','}','[',']'];
let numbers = [];


// Initializing array to store allowed charactrers for the password
// Initializing all boolean values with prompts


function init() {
    //Reset Variables
    userInput = undefined;
    prevIndex = [];
    pw = "";
    charsAllowed = [];
    createPassword(promptUser());
    // debugger;
}

function promptUser() {
    // Get user input by prompting for character preferences
    let specialsPrompt = confirm("Do you want to have special characters in your password?");
    if(specialsPrompt) {
        for (let i = 0; i < specials.length; i++) {
            charsAllowed.push(specials[i]);
        }
    }


    let numbersPrompt = confirm("Do you want numbers in your password?");
    if(numbersPrompt) {
        for (let i = 0; i < 10; i++) {
            charsAllowed.push(i);
            numbers.push(i);
        }
    }
    
    let lowersPrompt = confirm("Do you want lowercase letters in your password?");
    if(lowersPrompt) {
        for (let i = 0; i < lowerAlphabet.length; i++) {
            charsAllowed.push(lowerAlphabet[i]);
        }
    }

    let uppersPrompt = confirm("Do you want uppercase letters in your password?");
    if(uppersPrompt) {
        for (let i = 0; i < upperAlphabet.length; i++) {
            charsAllowed.push(upperAlphabet[i]);
        }
    }

    if (!specialsPrompt && !numbersPrompt && !lowersPrompt && !uppersPrompt) {
        alert("Need to have characters to put into password.");
        prompt();
    
    }

    // While loop that ensures user input is valid by checking type. Also gives user an option to exit out of the program.
    while(true) {
        this.userInput = prompt("How many characters long would you like your password to be? Type a number between and including 8 and 128.");
        const maxPasswordLength = 128;
        const minPasswordLength = 8;

        if (this.userInput === null) {
            alert("You have exited the program.");
            this.userInput = 0;
            break;
        } else if (this.userInput.length <= 0 || isNaN(this.userInput)) {
            alert("Invalid input. Please input an integer between and include 8 and 128.");        
        } else if (parseInt(this.userInput) < minPasswordLength || parseInt(this.userInput) > maxPasswordLength) {
            alert("Number not in range. Please input an integer between and including 8 and 128.");
        } else {
            pwl = parseInt(this.userInput);
            break;
        }
    }

    returnList = [specialsPrompt, numbersPrompt, lowersPrompt, uppersPrompt];
    return returnList;
// End user input 
}

function createPassword(boolArray) {
    pw = "";    
    console.log("About to create password, the created length will be " + this.userInput + "\nPassword is currently: " + pw);
    // Creating password through concatanation.

    // debugger;
    while(pw.length < this.userInput) {
        let selector = Math.round(Math.random() * (charsAllowed.length - 1));
        pw += charsAllowed[selector];
        
        // DO NOT DELETE, FOR TESTING WHEN UNDEFINED VALUES ARE RETURNED
        // console.log(selector);
        // console.log(charsAllowed.length);
        // console.log(pw);
    }
    console.log("the created password has a length of: " + pw.length);

    // Ensuring that at least one of each desired character type is inserted into the password
    console.log("Specials Prompt: " + boolArray[0]);
    this.replace(boolArray[0], specials);
 
    console.log("Numbers Prompt: " + boolArray[1]);
    this.replace(boolArray[1], numbers);

    console.log("Lowers Prompt: " + boolArray[2]);
    this.replace(boolArray[2], lowerAlphabet);

    console.log("Uppers Prompt: " + boolArray[3]);
    this.replace(boolArray[3], upperAlphabet);

    console.log("The generated password has been altered and now has a length of: " + pw.length);

    // Sets the password field to the generated password
    document.getElementById("password").textContent = pw;
}

function replace(bool, chars) {
    // Checks to see if a desired character is requested, then generates a random index to get a random element from the desired pool of characters
    if (bool) {
        let randInsert = Math.round(Math.random() * (chars.length - 1));
    if(prevIndex.includes(randInsert)) {
        while (prevIndex.includes(randInsert)) {
            console.log("Previous element has been replaced, trying again");
            randInsert = Math.round(Math.random() * (chars.length - 1));    
        }
    }

    // Print statement for testing
    // console.log("length of array " + chars.length + "\nRand Insert: " + randInsert)
    let replacer = chars[Math.round(Math.random() * chars.length - 1)];
    console.log("Replacing " + pw[randInsert] + " at " + randInsert + " with " + replacer);
    // wtf strings are immutable in javascript and must be changed another way
    // pw[randInsert] = specials[replacer];

    if (replacer === undefined) {
        console.log("undefined was about to be placed in password, trying again");
        while (replacer === undefined) {
            randInsert = Math.round(Math.random() * (chars.length - 1));
            replacer = chars[randInsert]
        }
    }
    // Replace password with substring up to the replacement index, add the replacer, then add substring from one index after the replaced until the end
    pw = pw.substr(0, randInsert) + replacer + pw.substr(randInsert + 1, pw.length);
    prevIndex.push(randInsert);
    }
}



// EVENT LISTENERS ON BUTTONS
// Generate a new password when button is clicked
document.getElementById('generate').addEventListener("click", function() {
    init();
});
// End generate a new password

// Copy the generated passsword to clipboard
document.getElementById('copy').addEventListener("click", function() {
    var test = document.getElementById("password");

    test.select();
    test.setSelectionRange(0, 999999);

    document.execCommand("copy");

    alert("Copied the text: " + test.value)
});
// End copy the generated password


