const email = document.getElementById('email');
email.addEventListener('input', checkEmail)

const properEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function checkEmail() {
    const error = email.nextElementSibling;
    console.log(`checking email!`)
    //follows pattern, 1 or more letters, at symbol, 1 or more letters
    const isValid = (email.value.length !== 0) && properEmail.test(email.value);
    console.log(isValid);
    if(!isValid) {    
        email.classList.add('active')
        error.textContent = 'please in an email containing character before and eafter an @ symbol';
    }
    else { 
        if(error !== null){
            error.textContent = '';
            email.classList.remove('active');
        }
    }
    return isValid;
}


const countrySelection = document.getElementById('country');
countrySelection.addEventListener('input', checkCountry)
const collection = countrySelection.selectedOptions;

function checkCountry() {
    const error = countrySelection.nextElementSibling;
    const isValid = (collection.length === 1);
    if (!isValid) {
        countrySelection.classList.add('active')
        error.textContent = 'please select exactly 1 country from the list';
    }
    else {
        if(error !== null){
            error.textContent = '';
            countrySelection.classList.remove('active');
        }
        
    }
    return isValid;
}

const properZip = /^\d+$/;
const zipcode = document.getElementById('zipCode');
zipcode.addEventListener('input', checkZip)

function checkZip() {
    const error = zipcode.nextElementSibling;
    console.log(`checking zip`)
    //is all numbers and between 4-10 characters long
    
    const isValid = ((4 <= zipcode.value.length) && (zipcode.value.length < 11)) && properZip.test(zipcode.value);
    console.log(isValid);
    if(!isValid) {    
        zipcode.classList.add('active')
        error.textContent = 'Please enter between 4 and 10 digits without other characters';
    }
    else { 
        if(error !== null){
            error.textContent = '';
            zipcode.classList.remove('active');
        }
    }
    return isValid;
}

const properPass = /^(?=.*([A-Z]){1,})(?=.*([!@#$&*]){1,})(?=.*([0-9]){1,}).{8,20}$/;
// ^                         //Start anchor
// (?=.*[A-Z])        //Ensure string has one uppercase letters.
// (?=.*[!@#$&*])           // Ensure string has one special case letter.
// (?=.*[0-9])        //Ensure string has two digits.
// (?=.*[a-z]) //Ensure string has three lowercase letters.
// .{8}                      //Ensure string is of length 8.
// $ //end anchor 
const password = document.getElementById('password');
password.addEventListener('input', checkPassComplexity)

function checkPassComplexity() {
    const error = password.nextElementSibling;
    console.log(`checking pass`)
    //is atleast 8 characters, has a captical letter, a sybmol and a number.
    const isValid = properPass.test(password.value);
    console.log(isValid);
    if(!isValid) {    
        password.classList.add('active')
        error.textContent = 'Please enter password of at least 8 characters including at least one uppercase letter, special symbol and a number';
    }
    else { 
        if(error !== null){
            error.textContent = '';
            password.classList.remove('active');
        }
    }
    const nextPass = document.getElementById('passwordConfirm');
    if(nextPass.value.length >= 1){
        console.log(`there is a entry in confirm password`)
        
        confirmPassword();
    }
    return isValid;
}

const passwordConfirmation = document.getElementById('passwordConfirm');
passwordConfirmation.addEventListener('input', confirmPassword)

function confirmPassword() {
    const error = passwordConfirmation.nextElementSibling;
    console.log(`confirming pass`)
    //exactly matches the previous password
    const isValid = passwordConfirmation.value === password.value;
    console.log(isValid);
    if(!isValid) {    
        passwordConfirmation.classList.add('active')
        error.textContent = 'Your passwords do not match. They must match exactly.';
    }
    else { 
        if(error !== null){
            error.textContent = '';
            passwordConfirmation.classList.remove('active');
        }
    }
    return isValid;
}

const submit = document.getElementById('submit');
submit.addEventListener('click', validateForm)

function validateForm(e) {
    const error = e.target.previousElementSibling;
    const errors = document.getElementsByClassName('active');
    
    if((!checkEmail()) || (!checkCountry()) || (!checkZip()) || (!checkPassComplexity()) || (!confirmPassword())){
            error.textContent = 'You have errors in your info entered. Please correct the issues according to the error messages below each.';
        }
    else{
            error.textContent = 'High Five! Your form looks great. Thanks for submitting.'
            error.classList.add('successful');
            email.value = '';
            Array.from(countrySelection.selectedOptions).forEach(option => {
                option.selected = false;
            })
            zipcode.value = '';
            password.value = '';
            passwordConfirmation.value = '';
            
        }
    

}
