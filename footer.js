
      //email validation

let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let zip = document.getElementById('zip');

//main function validation 
function formSubmit(){
  
  //name validation 
    let regex = /^[a-zA-Z]{2,10}$/;
    if(!regex.test(name.value)){
        name.classList.add('is-invalid');
        name.focus();
        return false;
    }else{
        name.classList.remove('is-invalid');
        name.classList.add('is-valid');
    }
  
      //email validation 

    let regexEmail = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-]+\.([a-zA-Z0-9]){3,5}$/;
    if (!regexEmail.test(email.value)){
        email.classList.add('is-invalid');
        email.focus();
        return false;
    }else{
        email.classList.add('is-valid');
        email.classList.remove('is-invalid');
    }

  //phone validation 

    let regexPhone = /^[0-9]{8,15}$/;
    if(!regexPhone.test(phone.value)){
        phone.classList.add('is-invalid');
        phone.focus();
        return false;
    }else{
        phone.classList.add('is-valid');
        phone.classList.remove('is-invalid');



        
    }

    //zip validation 

    let regxZip = /^\d{5}$/;
    if(!regxZip.test(zip.value)){
        zip.classList.add('is-invalid');
        phone.focus();
        return false;
    }else{
        zip.classList.add('is-valid');
        zip.classList.remove('is-invalid');
    }
    return true;
};




