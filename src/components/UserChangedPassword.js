import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { store } from 'react-notifications-component';
import { useSelector } from 'react-redux';
import chekErrors from './PasswordValidation';

function UserChangedPassword({setsettings}) {
    const [values, setvalues] = useState({cpw:"",npw:"",ncpw:""});
    const [errors, seterrors] = useState({});
    const [hide, sethide] = useState({cpw:false,npw:false,ncpw:false});
    const [isSubmitting, setisSubmitting] = useState(false);

    const handelValues =(e) =>{
        setvalues({
            ...values,[e.target.name]:e.target.value
        });
    };
    const hadelFormSubmit =(e)=>{
        e.preventDefault();
        sethide({cpw:false,npw:false,ncpw:false});
        seterrors(chekErrors(values));
        setisSubmitting(true);
    };
    
    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            submit();
        }
    }, [errors])

    const hideError = (e)=>{
        Object.entries(errors).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })
    }

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    
    const submit = () =>{
        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/rest-auth/password/change/`,{
            old_password:values.cpw,
            new_password1:values.npw,
            new_password2:values.ncpw,
        },{
            headers:{Authorization: "Token " + usDetails.key}
        }).then(res=>{
            if(res.data.detail){
                setvalues({...values,cpw:"",npw:"",ncpw:""});

                store.addNotification({
                    title: "Password Changed Successfully!",
                    message: "OnDevlms",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true,
                      pauseOnHover: true,
                      showIcon:true
                    },
                    width:600
                });
                setsettings(false);
            }
        }).catch(e=>{
            if(e.response.data.old_password){
                seterrors({...errors,"cpw":e.response.data.old_password})
                setvalues({...values,cpw:"",npw:"",ncpw:""});
            }
            else if(e.response.data.new_password2){
                seterrors({...errors,"npw":e.response.data.new_password2[1]})
                setvalues({...values,npw:"",ncpw:""});
            }
        })
    }

    return (
        <div>
            <h2>Change Password</h2>
                 <div className="reset_pw">
                    <form onSubmit={hadelFormSubmit}>
                        <p>
                            <label htmlFor="cpw">Current Password</label>
                            <input type="password" id="cpw" name="cpw" value={values.cpw} onChange={handelValues} onFocus={hideError}/>
                            {
                                errors.cpw && <span className={`tip ${hide.cpw ? 'hidetip' : ''}`}>{errors.cpw}</span>
                            }
                        </p>
                        <p>
                            <label htmlFor="npw">New Password</label>
                            <input type="password" id="npw" name="npw" value={values.npw} onChange={handelValues} onFocus={hideError}/>
                            {
                                errors.npw && <span className={`tip ${hide.npw ? 'hidetip' : ''}`}>{errors.npw}</span>
                            }
                        </p>
                        <p>
                            <label htmlFor="ncpw">Retype Password</label>
                            <input type="password" id="ncpw" name="ncpw" value={values.ncpw} onChange={handelValues}onFocus={hideError}/>
                            {
                                errors.ncpw && <span className={`tip ${hide.ncpw ? 'hidetip' : ''}`}>{errors.ncpw}</span>
                            }
                        </p>
                        <div className="butset">
                            <button>Change Password</button>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default UserChangedPassword
