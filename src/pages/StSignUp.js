import React, { useEffect } from 'react';
import StSignupForm from '../components/StSignupForm';
import "../assets/css/stsignup.css";
import signupsvg from "../img/svg/signup.svg";
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';

export default function StSignUp() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
      },[])
    return (
        <div className="siup_body">
            <div className="siup_column">
                <div className="svg">
                    <img src={signupsvg} alt=""/>
                </div>
                <div className="circle"></div>
            </div>
            <div className="siup_column">
                <div className="siup_form">
                    <h2>Student Sign Up</h2>
                    <StSignupForm/>
                </div>
            </div>
        </div>
    )
}
