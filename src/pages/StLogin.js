import React, { useEffect } from 'react';
import "../assets/css/stlogin.css";
import StLoginForm from '../components/StLoginForm';
import logsvg from '../img/svg/booklover.svg';
import logpic from '../img/child.png';
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';

export default function StLogin() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
      },[dispatch])

    return (
        <div className="login_body">
            <div className="login_column">
                <div className="svg">
                    <img src={logsvg} alt=""/>
                </div>
            </div>
            <div className="login_column">
                <div className="login_form">
                    <div className="logpic">
                        <img src={logpic} alt=""/>
                    </div>
                    <h2>Login</h2>
                    <StLoginForm/>
                </div>
            </div>
        </div>
    )
}
