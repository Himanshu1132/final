import React from 'react';
import rjs from '../../img/rjs.jpg'
import ModelPreviewAllStudents from '../ModelPreviewAllStudents';

export default function StCourseModuleDes() {
    return (
        <div className='colCourseView'>
            <div className="course_desc_head">
                <div className="course_pic">
                    <img src={rjs} alt=""/>
                    <div className="cos_options">
                        <button><i className="fas fa-trash-alt"></i><span>Unenroll Me</span></button>
                    </div>
                </div>
                <h2>{'courseDetails.course_name'}</h2>
                {
                    //courseDetails.created_at && 
                       /* <h3><ReactTimeAgo date={Date.parse(courseDetails.created_at)} locale="en-US" /></h3>*/
                       <h3>One Hour Ago</h3>
                }
            </div>
            <div className="course_desc_body">
                <div className="course_short_desc">
                    <h3>Course Description</h3>
                    <p>{'courseDetails.course_description'}</p>
                </div>
                <div className="course_all_student">
                    <h3>Students</h3>
                    <ModelPreviewAllStudents/>
                </div>
            </div>
        </div>
    )
}
