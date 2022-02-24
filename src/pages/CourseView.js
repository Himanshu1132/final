import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useSpring,animated } from 'react-spring';
import CourseSect from '../components/CourseSect';
import ProfileLoader from '../components/ProfileLoader';
import Empty from '../components/Empty';
import { AnimateSharedLayout, motion } from 'framer-motion';
import '../assets/css/courseview.css';
import '../assets/css/mediaFiles/viewcoursemedia.css';

export default function CourseView() {

    const {id} = useParams();
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    const [courseData, setcourseData] = useState([]);
    const [subData, setsubData] = useState({});
    const [isRedirect, setisRedirect] = useState(false);
    const [isShowDes, setisShowDes] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    
    useEffect(async() => {
        if(usDetails.key){

            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/subject/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setisLoading(false);
                if(res.data){
                    setsubData({...subData,'sub_name':res.data.subject_name,'sub_cover':res.data.subject_cover,'sub_sdes':res.data.short_description,'description':res.data.description});
                }
            }).catch(err=>{
                if(err.response.data.message){
                    setisRedirect(true);
                }
            })

            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/courses/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                setisLoading(false);
                setcourseData(res.data);
            }).catch(err=>{
                console.log(err);
            })
        }
    }, [usDetails]);
    
    const clk =()=>{
        let choose = window.confirm('Are You Sure?')
        
        if(choose){
            Axios.delete(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/deletesubject/${id}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(()=>{
                setisRedirect(true)
            })
        }
    }

    if(isRedirect){
        return <Redirect to="/teacherdashboard/managecourse/"/>
    }
    if(isLoading){
        return <ProfileLoader/>
    }
    return (
        <div className="ful_manage_course">
            <div className="top_manage_course">
                <img src={process.env.REACT_APP_LMS_MAIN_URL+subData.sub_cover} alt=""/>
                <div className="top_manage_head">
                    <h1>{subData.sub_name || ''}</h1>
                    <h3>{subData.sub_name || ''}</h3>
                </div>
                
                <div className="options_subs">
                    <h3><i className="fas fa-sliders-h"></i></h3>
                        <div className="options_manage">
                            <ul>
                                <li onClick={clk}><i className="far fa-trash-alt"></i> Delete Subject</li>
                                <Link to={`/teacherdashboard/updatesubject/${id}`}>
                                    <li><i className="far fa-edit"></i> Edit Subject</li>
                                </Link>
                            </ul>
                        </div>
                </div>
                {
                    subData.description ?
                        <motion.div layout className="down">
                            <motion.i layout className={`fas fa-chevron-down ${isShowDes ? 'up' : ''}`} onClick={()=>setisShowDes(!isShowDes)}></motion.i>
                        </motion.div>
                    :''
                }
            </div>
                    <motion.div layout>
                        <AnimateSharedLayout>
                        {
                            isShowDes && subData.description ?
                                <div  className="sub_des_show">
                                    <p>{subData.description}</p>
                                </div>
                            : ''
                        }
                        </AnimateSharedLayout> 
                    </motion.div>
            <div className="top_manage_body">
                <div className="mange_cos_body">
                    <div className="manage_course_nav">
                        <Link to={`/teacherdashboard/createcourse/${id}`}>
                            <button>Create Course</button>
                        </Link>
                    </div>
                    <div className="manage_course_grid">
                        {
                            courseData.length !== 0 ? 
                                    courseData.map((cdata,index)=> <CourseSect key={index} course_cover={cdata.course_cover} course_name={cdata.course_name} duration={cdata.duration} price={cdata.price} duration={cdata.duration} created_at={cdata.created_at} courseid={cdata.id} no={index}/>)
                            :  <Empty target='No Courses'/>
                        }
                    </div>
                </div>     
            </div>
        </div>
    )
}