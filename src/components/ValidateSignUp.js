
export default function ValidateSignUp(values) {
    let errors = {};

    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if(!values.firstName.trim()){
        errors.firstName = "First Name is Required";
    }
    else if(values.firstName.length > 100){
        errors.firstName = "First Name Must Be Less Than 10 characters";
    }
    if(!values.lastName.trim()){
        errors.lastName = "Last Name is Required"
    }
    else if(values.lastName.length > 100){
        errors.lastName = "Last Name Must Be Less Than 20 characters";
    }
    if(!values.userName.trim()){
        errors.userName = "User Name Is Required"
    }
    else if(values.userName.length > 30){
        errors.userName = "User Name Must Be More Than 10 characters";
    }
    if(!values.email.trim()){
        errors.email = "Email is Required"
    }
    else if(values.email.length > 35){
        errors.email = "Email Must Be Less Than 35 characters";
    }
    else if(!pattern.test(values.email)){
        errors.email = "Please Enter Valid Email";
    }
    if(!values.phonenumber.trim()){
        errors.phonenumber = "Phone Number is Required"
    }
    else if(values.phonenumber.length >12){
        errors.phonenumber = "Phone Number Must Be Less Than 12 characters"
    }
    if(!values.pw.trim()){
        errors.pw = "Password Is Required";
    }
    else if(values.pw.length < 8){
        errors.pw = "Password Must Be More Than 8 characters";
    }
    else{
        if(!values.cpw.trim()){
            errors.cpw = "Retype Password Is Required";
        }
        else if(values.pw !== values.cpw){
            errors.cpw = "Password Does Not Match";
        }
        
    }
    return (errors);
}
