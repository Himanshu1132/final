import Axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ValidateSubjectCreateForm from '../../components/ValidateCreateSubject';

export default function UpdateSubjectFunc(submitForm,subid) {

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    const [formValue, setformValue] = useState({subject_title:"",subject_shdes:"",sub_des:"",class_type:"",subject_type:"",subject_cover:""});
    const [formErrors, setformErrors] = useState({subject_title:"",subject_shdes:"",sub_des:"",class_type:"",subject_type:""});
    const [hide, sethide] = useState({subject_title:false,subject_shdes:false,sub_des:false,class_type:false,subject_type:false});
    const [isSubmitting, setisSubmitting] = useState(false);

    /*Getting subject details*/
    useEffect(async () => {
        if(usDetails.key){
            Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/subject/${subid}/`,{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(res=>{
                setformValue({...formValue,subject_title:res.data.subject_name,subject_shdes:res.data.short_description,sub_des:res.data.description,class_type:res.data.class_type,subject_type:res.data.subject_type,subject_cover:res.data.subject_cover});
            })
        }

    }, [usDetails])


    const hadelChabgeFormValues = (e) =>{
        const {name,value} = e.target;
        setformValue({
            ...formValue,[name] : value
        })
    }

    const handelSubmit = (e) =>{
        e.preventDefault();
        //handling Errors
        setformErrors(ValidateSubjectCreateForm(formValue));
        sethide({subject_title:false,subject_shdes:false,sub_des:false,class_type:false,subject_type:false,hr:false});
        setisSubmitting(true);
    }
    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmitting){
            submitForm();
        }
    }, [formErrors])

    const hideError = (e)=>{
        Object.entries(formErrors).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })
    }

    return ({hadelChabgeFormValues,formValue,handelSubmit,hideError,hide,formErrors})
}
