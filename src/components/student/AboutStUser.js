import React from 'react'
import { useSelector } from 'react-redux';
import '../../assets/css/student/aboutstuser.css';

export default function AboutStUser() {

    const {initialState} = useSelector(state => state.StudentDetails);
    
    return (
        <div>
            <div className="about_body">
                <h3>About</h3>
                <div className="ab_main_card">
                    <div className="ab_card">
                    <h3>Name</h3>
                    <h4>{initialState && `${initialState.user.first_name} ${initialState.user.last_name}`}</h4>
                    </div>
                    <div className="ab_card">
                    <h3>User Name</h3>
                    <h4>{initialState && initialState.user.username}</h4>
                    </div>
                    <div className="ab_card">
                    <h3>Mobile</h3>
                    <h4>{initialState && initialState.user.phone_no}</h4>
                    </div>
                    <div className="ab_card">
                    <h3>Email</h3>
                    <h4>{initialState && initialState.user.email}</h4>
                    </div>
                </div>
                <div className="disdis">
                    <p>{initialState && initialState.description !== 'null' && initialState.description}</p>    
                </div>
            </div>
            <div className="my_row">
                <div className="outer">
                    <div className="txt">
                        <h3>Total Subjects</h3>
                    </div>
                    <div className="count">
                        20
                    </div>
                </div>
                <div className="outer">
                    <div className="txt">
                        <h3>My Subjects</h3>
                    </div>
                    <div className="count">
                        20
                    </div>
                </div>
            </div>
        </div>
    )
}
