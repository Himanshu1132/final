const checkErrors = (values,mediafiles)=>{
    let errors={};
    if(!values.mn.trim()){
        errors.mn = "Module Name Is Required";
    }
    if(values.msg !== ''){
        if(mediafiles.length===0){
            errors.comerr ="Do not Have Anything Please Select Media Or Create Message"
        }
    }
    return errors;
}
export default checkErrors;