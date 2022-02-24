import Axios from 'axios';
import { useEffect, useState } from 'react'
import ValidateLogin from '../../components/ValidateLogin';

function StValidateLogin() {
    const [values, setvalues] = useState({email:"",pw:""});
    const [errors, seterrors] = useState({email:"",pw:"",comerrors:""});
    const [isSubmitting, setisSubmitting] = useState(false);
    const [hide, sethide] = useState({email:false,pw:false});

    const [acDetails, setacDetails] = useState({});

    const hadelOnChange = (e)=>{
        const {name,value} = e.target;
            setvalues({...values,[name]:value});
     }

     const hadelSubmit = (e)=>{
         e.preventDefault();
         //hadlling errors
         seterrors(ValidateLogin(values))
         setisSubmitting(true);
         sethide({email:false,pw:false});
     }

     const hideError = (e)=>{
        Object.entries(errors).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })

    }

    function submit() {
        console.log();
        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/rest-auth/login/`,{
            username:values.email,
            password:values.pw
        }).then(res=>{
            setacDetails(res.data);
        }).catch(err=>{
            seterrors({...errors,"comerrors":err.response.data.non_field_errors});
        })
    }

     useEffect(() => {
        
        if(Object.keys(errors).length ===0 && isSubmitting){
            submit();
        }

     }, [errors]);

     //save data in Local Storage
     useEffect(() => {
         localStorage.setItem("usValues",JSON.stringify(acDetails));//for save to local storage
     }, [acDetails]);

     
        return ([values,hadelOnChange,hadelSubmit,errors,hideError,hide,acDetails])
    
}

export default StValidateLogin;
