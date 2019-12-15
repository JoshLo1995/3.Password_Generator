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
let prevIndex = [];

//Created a for loop to fill the upper alphabet because lazy
for (let i = 0; i < lowerAlphabet.length; i++) {
    upperAlphabet.push(lowerAlphabet[i].toUpperCase());
}


// Initializing array to store allowed charactrers for the password
// Initializing all boolean values with prompts
function init() {
    prevIndex = [];
    let charsAllowed = [];
    let specials = ['!','@','#','$','%','^','&','*','(',')','-','+','=','\`', '\"','~',"\/","\\",'{','}','[',']']
    let numbers = [];
    

    // Get user input by prompting for character preferences
    let specialsPrompt = confirm("Do you want to have special characters in your password?");
    if(specialsPrompt) {
        charsAllowed.push(specials);
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
        init();

    }

    // While loop that ensures user input is valid by checking type. Also gives user an option to exit out of the program.
    let pwl = null;
    while(true) {
        pwl = prompt("How many characters long would you like your password to be? Type an integer between and including 8 and 128.");

        if (pwl == null) {
            alert("You have exited the program.");
            pwl = 0;
            break;
        } else if (pwl.length <= 0 || isNaN(pwl)) {
            pwl = alert("Invalid input. Please input an integer between and include 8 and 128.");        
        } else if (parseInt(pwl) < 8 || parseInt(pwl) > 128) {
            alert("Integer not in range. Please input an integer between and including 8 and 128.");
        } else {
            pwl = parseInt(pwl);
            break;
        }
    }
    // End user input 
       
    let pw = "";
    // Creating password through concatanation.
    for(let i = 0; i < pwl; i++) {
        let selector = Math.round(Math.random() * (charsAllowed.length - 1));
        pw += charsAllowed[selector];

        // DO NOT DELETE, FOR TESTING WHEN UNDEFINED VALUES ARE RETURNED
        // console.log(selector);
        // console.log(charsAllowed.length);
        // console.log(pw);
    }

    // Ensuring that at least one of each desired character type is inserted into the password
    
    console.log("Specials Prompt: " + specialsPrompt);
    replace(specialsPrompt, specials);
 
    console.log("Numbers Prompt: " + numbersPrompt);
    replace(numbersPrompt, numbers);

    console.log("Lowers Prompt: " + lowersPrompt);
    replace(lowersPrompt, lowerAlphabet);

    console.log("Uppers Prompt: " + uppersPrompt);
    replace(uppersPrompt, upperAlphabet);

    // Sets the password field to the generated password
    document.getElementById("password").textContent = pw;
    console.log(pw.length);

    
    function replace(bool, chars) {
        if (bool) {
            let randInsert = Math.round(Math.random() * (pw.length - 1));
        if(prevIndex.includes(randInsert)) {
            while (prevIndex.includes(randInsert)) {
                console.log("Previous element has been replaced, trying again");
                randInsert = Math.round(Math.random() * (pw.length - 1));    
            }
        }
        let replacer = specials[Math.round(Math.random() * chars.length - 1)];
        console.log("Replacing " + pw[randInsert] + " at " + randInsert + " with " + replacer);
        // wtf strings are immutable in javascript and must be changed another way
        // pw[randInsert] = specials[replacer];
        pw = pw.substr(0, randInsert) + replacer + pw.substr(randInsert + 1);
        prevIndex.push(randInsert);
        console.log(prevIndex);
        }
    }
}
// End Init

// Generate a new password
document.getElementById('generate').addEventListener("click", function() {
    init();
});
// End generate a new password

// Copy the generated passsword
document.getElementById('copy').addEventListener("click", function() {
    var test = document.getElementById("password");

    test.select();
    test.setSelectionRange(0, 999999);

    document.execCommand("copy");

    alert("Copied the text: " + test.value)
});
// End copy the generated password


