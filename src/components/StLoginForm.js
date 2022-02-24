import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import StValidateLogin from '../utils/hooks/StValidateLogin'

export default function StLoginForm() {

   const[values,hadelOnChange,hadelSubmit,errors,hideError,hide,acDetails] = StValidateLogin();

   if(Object.values(acDetails).length !== 0){
       if(!acDetails.user.is_teacher){
           return <Redirect to="/studentdashboard/maindashboard" />
        }
        else if(acDetails.user.is_teacher){
            return <Redirect to="/teacherdashboard/teachermaindashboard" />
        }
   }

    return (
        <div>
            <form onSubmit={hadelSubmit}>
                {
                    errors.comerrors && <p className={`comtip ${hide.email ? 'hidetip' : ''}`}>{errors.comerrors}</p>
                }
                <p>
                    <label htmlFor="em">Email</label>
                    <input type="text" name="email" id="em" value={values.email} onChange={hadelOnChange} className={errors.email ? "error" : ""} onFocus={hideError} />
                    {
                        errors.email && <span className={`tip ${hide.email ? 'hidetip' : ''}`}>{errors.email}</span>
                    }
                </p>
                <p>
                    <label htmlFor="pw">Password</label>
                    <input type="password" name="pw" id="pw" value={values.pw} onChange={hadelOnChange} className={errors.pw ? "error" : ""} onFocus={hideError} />
                    {
                        errors.pw && <span className={`tip ${hide.pw ? 'hidetip' : ''}`}>{errors.pw}</span>
                    }
                </p>
                <div className="but">
                    <input type="submit" value="Log In" name="submit"/>

                    <div className="fpw">
                        <p>Forget Password?</p>
                        <p>
                            <Link to="/stsignup">Don't You Have An Account?</Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}
