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

// Initializing array to store allowed charactrers for the password

function init() {
    lowerAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    upperAlphabet = [];

    //Created a for loop to fill the upper alphabet because lazy
    for (let i = 0; i < lowerAlphabet.length; i++) {
        upperAlphabet.push(lowerAlphabet[i].toUpperCase());
    }

    let charsAllowed = [];

    // Get user input 
    let specialsPrompt = confirm("Do you want to have special characters in your password?");
    if(specialsPrompt) {
        charsAllowed.push('!','@','#','$','%','^','&','*','(',')','-','+','=','`','~',"/","\\",'{','}','[',']');
    }

    let numbersPrompt = confirm("Do you want numbers in your password?");
    if(numbersPrompt) {
        for (let i = 0; i < 10; i++) {
            charsAllowed.push(i);
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
    let pwl = prompt("How many characters long would you like your password to be? (type an integer between 8 and 128)");

    while (pwl < 8 || pwl > 128) {
        pwl = prompt("Try again, pick a number between 8 and 128");
    }

    let pw = "";
    // Creating password
    for(let i = 0; i < pwl; i++) {
        let selector = Math.round(Math.random() * charsAllowed.length);
        pw += charsAllowed[selector];
    }

    document.getElementById("password").textContent = pw;

}



    // Generating a new password
    document.getElementById('generate').addEventListener("click", function() {
        console.log('Generate button pressed!')
        init();
    });

    // Copying the generated passsword
    document.getElementById('copy').addEventListener("click", function() {
        var test = document.getElementById("password");

        test.select();
        test.setSelectionRange(0, 999999);

        document.execCommand("copy");

        alert("Copied the text: " + test.value)
    });


