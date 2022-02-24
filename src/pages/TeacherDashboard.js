import React, { useEffect, useState } from 'react'
import TeacherDashboardHeader from '../components/TeacherDashboardHeader';
import '../assets/css/dashboard.css'
import { Link, Redirect, Route } from 'react-router-dom';
import ProfileSettings from './ProfileSettings';
import MangeCourse from './MangeCourse';
import UserStatus from '../utils/hooks/UserStatus';
import AcDetails from '../utils/hooks/AcDetails';
import TeacherMainDashboard from './TeacherMainDashboard';
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';
import CreateCourse from './CreateCourse';
import CourseView from './CourseView';
import TcModels from './TcModels';
import CreateSubject from './CreateSubject';
import CreateModels from './CreateModels';
import GeneEnrollmentkeys from './GeneEnrollmentkeys';
import UpdateSubject from './UpdateSubject';
import UpdateCourse from './UpdateCourse';
import UpdateModule from './UpdateModule';

export default function TeacherDashboard() {

    const [toggle, settoggle] = useState(false);
    const [toggelProfile, settoggelProfile] = useState(false);
    
    const {log,hadelLogOut} = UserStatus();//custom hook
    const [teachProfilepic] =AcDetails();
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(activeAccount());
    },[dispatch])
    
    const togglemenu = ()=>{
        settoggle(!toggle);
    }

    if(!log){
        return <Redirect to="/"/>
    }

    const full = () =>{
        let elem = document.documentElement;
        if(!window.screenTop && !window.screenY){
            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
              elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
              elem.msRequestFullscreen();
            }
        }
        else{
            if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
              }
        }
    }

    return (
        <div className="main">
            <div className={`main_column ${toggle ? 'active' : ''}`}>
                <TeacherDashboardHeader/>
            </div>
            <div className="main_column">
                <div className="head">
                    <div className="column">
                        <i onClick={togglemenu} className="fas fa-bars"></i>
                    </div>
                    <div className="column">
                        <div className="sec">
                            <span><i className="fas fa-expand" onClick={full}></i></span>
                        </div>
                        <div className="sec">
                            <div className="profile">
                                <img src={`http://127.0.0.1:8000${teachProfilepic}`} alt="" onClick={()=>{settoggelProfile(!toggelProfile)}} />
                                <div className={`drop_down ${toggelProfile ? 'prActive' : ''}`}>
                                    <div className="drop_down_list" style={toggelProfile ? {display:'block'} : {display:'none'}}>
                                        <ul>
                                            <Link to='/teacherdashboard/profilesettings'><li><i className="far fa-user-circle"></i>Profile</li></Link>
                                            <li onClick={hadelLogOut}><i className="fas fa-sign-out-alt" ></i>Log Out</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sub_column">
                    <Route path='/teacherdashboard/teachermaindashboard'>
                        <TeacherMainDashboard/>
                    </Route>
                    <Route path='/teacherdashboard/createsubject'>
                        <CreateSubject/>
                    </Route>
                    <Route path='/teacherdashboard/createcourse/:id'>
                        <CreateCourse/>
                    </Route>
                    <Route path='/teacherdashboard/createmodels/:id'>
                        <CreateModels/>
                    </Route>
                    <Route path='/teacherdashboard/managecourse'>
                        <MangeCourse/>
                    </Route>
                    <Route path='/teacherdashboard/viewcourse/:id'>
                        <CourseView/>
                    </Route>
                    <Route path='/teacherdashboard/models/:id'>
                        <TcModels/>
                    </Route>
                    <Route path='/teacherdashboard/profilesettings'>
                        <ProfileSettings/>
                    </Route>
                    <Route path='/teacherdashboard/updatesubject/:subid'>
                        <UpdateSubject/>
                    </Route>
                    <Route path='/teacherdashboard/updatecourse/:subid'>
                        <UpdateCourse/>
                    </Route>
                    <Route path='/teacherdashboard/updatemodule/:cosid'>
                        <UpdateModule/>
                    </Route>
                    <Route path='/teacherdashboard/keys'>
                        <GeneEnrollmentkeys/>
                    </Route>
                </div>
            </div>
        </div>
    )
}
