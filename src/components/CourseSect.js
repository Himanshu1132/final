import Axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'

export default function CourseSect({course_cover,course_name,price,duration,created_at,courseid,no}) {

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    const deleteCourse = async (courseid) =>{
        let confirms = window.confirm('Are You Sure?');
        if(confirms){
            await Axios.delete(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/deletecourse/${courseid}/`,{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(()=>{
                window.location.reload(false);
            })

        }
    }
    return (
        <div className="grid_card_manage">
            <Link to={`/teacherdashboard/models/${courseid}`}>
                <div className="grid_card_mg_head">
                    <img src={`${process.env.REACT_APP_LMS_MAIN_URL}${course_cover}`} alt=""/>
                    <div className="dura">
                        <h3><i className="far fa-clock cl"></i>{duration} Hrs</h3>
                    </div>
                </div>
                <div className="cos_manage_num">
                    <h3>{no<10 ? `0${no+1}` : no}</h3>
                </div>
            </Link>
                <div className="cos_options_mna">
                    <h3><i className="fas fa-chevron-circle-up"></i></h3>
                    <div className="options_manage">
                        <ul>
                            <li onClick={()=>deleteCourse(courseid)}>Delete</li>
                            <Link to={`/teacherdashboard/updatecourse/${courseid}/`}>
                                <li>Edit</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            <Link to={`/teacherdashboard/models/${courseid}`}>
                <div className="grid_card_mg_body">
                    <h3>{course_name}</h3>
                    <h4>LKR {price}</h4>
                    <div className="cs_tail">
                        <h4><ReactTimeAgo date={Date.parse(created_at)} locale="en-US" /></h4>
                    </div>
                </div>
            </Link>
        </div>
    )
}
