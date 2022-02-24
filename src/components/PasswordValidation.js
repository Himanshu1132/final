const chekErrors = (values)=>{
    let err = {};

    if(!values.cpw.trim()){
         err.cpw = "Current Password Is Required";
     }
     if(!values.npw.trim()){
         err.npw = "New Password Is Required";
     }
     else if(values.npw.length < 8){
         err.npw = "New Password Must Be More Than 8 Characters";
     }
     if(!values.ncpw.trim()){
         err.ncpw = "New Password Is Required";
     }
     else if (values.ncpw !== values.npw){
         err.ncpw = "Retype Password Does Not Match";
     }

     return err;
 }
 export default chekErrors;