import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ModelPreviewAllStudents from '../components/ModelPreviewAllStudents';
import ReactTimeAgo from 'react-time-ago';
import { Link, Redirect} from 'react-router-dom';

export default function ModelsCourseDescri({id}) {

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    const [courseDetails, setcourseDetails] = useState({});
    const [redirect, setredirect] = useState(false);
    const [subid, setsubid] = useState('');

    useEffect(async () => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/list/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setcourseDetails({...courseDetails,...res.data});
                setsubid(res.data.subject);
            })
        }
    }, [usDetails]);

    const deleteCourse = async () =>{
        let confirms = window.confirm('Are You Sure?🙄');
        if(confirms){
            await Axios.delete(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/deletecourse/${id}/`,{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(()=>{
                setredirect(true);
            })

        }
    }

    if(redirect){
        return <Redirect to={`/teacherdashboard/viewcourse/${subid}`} />
    }

    return (
        <div className='colCourseView'>
            <div className="course_desc_head">
                <div className="course_pic">
                    <img src={`${courseDetails.course_cover}`} alt=""/>
                    <div className="cos_options">
                        <Link to={`/teacherdashboard/updatecourse/${id}/`}>
                            <button title="Edit This Course"><i className="fas fa-pencil-alt"></i><span>Edit Course</span></button>
                        </Link>
                        <button title="Delete This Course" onClick={deleteCourse}><i className="fas fa-trash-alt"></i><span>Delete Course</span></button>
                    </div>
                </div>
                <h2>{courseDetails.course_name}</h2>
                {
                    courseDetails.created_at && 
                        <h3><ReactTimeAgo date={Date.parse(courseDetails.created_at)} locale="en-US" /></h3>
                }
            </div>
            <div className="course_desc_body">
                <div className="course_short_desc">
                    <h3>Course Description</h3>
                    <p>{courseDetails.course_description}</p>
                </div>
                <div className="course_all_student">
                    <h3>Students</h3>
                    <ModelPreviewAllStudents/>
                </div>
            </div>
        </div>
    )
}
