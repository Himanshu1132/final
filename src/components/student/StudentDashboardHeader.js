import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function StudentDashBoardHeader() {

    const {initialState} = useSelector(state => state.StudentDetails);

    return (
        <div>
            <div className="logo">
                <h1>OnDev <span>LMS</span></h1>
            </div>
            <div className="profile_menu">
                <div className="pro_pic">
                <img src={`${initialState && `${process.env.REACT_APP_LMS_MAIN_URL}${initialState.profile_pic}` }`} alt="" />
                </div>
                <div className="details">
                    <h2>{initialState && initialState.user.first_name} {initialState && initialState.user.last_name}</h2>
                    <h3>Student</h3>
                </div>
            </div>
            <div className="main_section">
                <div className="list">
                    <ul>
                        <Link to="/studentdashboard/maindashboard/"><li><i className="fas fa-home"></i> My Subjects</li></Link>
                        <Link to ="/studentdashboard/allsubjects/">
                            <li><i className="fas fa-graduation-cap"></i>All Subject</li>
                        </Link>
                        <Link to="/studentdashboard/studentprofile/">
                            <li><i className="far fa-user-circle"></i>My Profile</li>
                        </Link>
                        <li><i className="fas fa-mobile-alt"></i>Contact Us</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
