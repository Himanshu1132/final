import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import validation from '../../../components/ValidateProfileSettings';

export default function UseStprofileUpdate(submit) {

    const [values, setvalues] = useState({firstName:'',lastName:'',userName:'',phoneNumber:'',email:'',address:'',des:'',pw:''});
    const [errors, seterrors] = useState({firstName:'',lastName:'',userName:'',phoneNumber:'',email:'',address:'',des:'',pw:''});
    const [hide, sethide] = useState({firstName:false,lastName:false,userName:false,email:false,phoneNumber:false,phonenumber:false,address:false,des:false,pw:false});
    const [isSibmitting, setisSibmitting] = useState(false);

    const {initialState} = useSelector(state => state.StudentDetails);

    useEffect(() => {
        if(initialState){
            setvalues({...values,firstName:initialState.user.first_name,lastName:initialState.user.last_name,userName:initialState.user.username,phoneNumber:initialState.user.phone_no,email:initialState.user.email,address:initialState.user.address,des:initialState.description});
        }
        
    }, [initialState])
    
    //set values to states
    const hadelChange =(e)=>{
        const {name,value} = e.target
       setvalues({
           ...values,[name]:value
       })
    }

     //hadel form submit
     const hadelSubmitForm = (e)=> {
        e.preventDefault();
        //hadlling errors
        seterrors(validation(values));
        sethide({firstName:false,lastName:false,userName:false,email:false,phoneNumber:false,phonenumber:false,address:false,des:false,pw:false});
        setisSibmitting(true);
     };
     const hideError = (e)=>{
        Object.entries(errors).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })
    }
     

     useEffect(() => {
        if(Object.keys(errors).length === 0 && isSibmitting){
            submit();
        }
     }, [errors])

    return({values,hadelChange,hadelSubmitForm,hideError,errors,hide,seterrors})
}
