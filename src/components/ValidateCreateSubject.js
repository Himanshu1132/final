export default function  ValidateSubjectCreateForm(values){
    let errors = {};

    if(!values.subject_title.trim()){
        errors.subject_title ="Subject Title Is Required";
    }
    if(!values.subject_shdes.trim()){
        errors.subject_shdes ="Short Description Is Required";
    }
    if(values.subject_shdes.length >200){
        errors.subject_shdes ="Short Description Must Be Less Than 200 Characters";
    }
    if(values.sub_des.length >500){
        errors.subject_des ="Description Must Be Less Than 500 Characters";
    }
    if(!values.class_type){
        errors.class_type ="Class Type Is Required";
    }
    if(!values.subject_type){
        errors.subject_type ="Subject Type Is Required";
    }
    
    return errors;
}