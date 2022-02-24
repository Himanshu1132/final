import React from 'react'
import rjs from '../../img/rjs.jpg';
import child from '../../img/child.png';
import '../../assets/css/student/stallsubjects.css'
import { Link } from 'react-router-dom';

export default function StAllSubjects() {
    return (
        <div className="all_st_subs">
            <div className="pagetop">
                <h1>All Subjects</h1>
                <div className="search_row">
                    <input type="text" name='search' placeholder="Search Subject By Subject Name Instructor Name Or Class Type"/>
                    <button><i className="fas fa-search"></i></button>
                </div>
            </div>
            <div className="all_sub_body">
                <div className="al_sub_card">
                    <Link to='/studentdashboard/stcourses/'>
                        <div className="sub_card_row">
                            <div className="image_sub">
                                <img src={rjs} alt=""/>
                            </div>
                            <div className="sub_ins_pro">
                                <div className="ins_outer">
                                    <img src={child} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="sub_card_row">
                            <h3>English for 2016 A/L Students</h3>
                            <p>English for 2016 A/L Students</p>
                            <div className="sub_type">
                                <ul>
                                    <li><i className="fas fa-graduation-cap"></i>A/L</li>
                                    <li><i className="fas fa-school"></i>Revision</li>
                                </ul>
                            </div>
                        </div>
                        <div className="sub_card_row">
                            <h3>By:Osada Manohara</h3>
                            <div className="al_sub_time">
                                <h3>One Month Ago</h3>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="al_sub_card">
                    <div className="sub_card_row">
                        <div className="image_sub">
                            <img src={rjs} alt=""/>
                        </div>
                        <div className="sub_ins_pro">
                            <div className="ins_outer">
                                <img src={child} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="sub_card_row">
                        <h3>English for 2016 A/L Students</h3>
                        <div className="sub_type">
                            <ul>
                                <li><i className="fas fa-graduation-cap"></i>A/L</li>
                                <li><i className="fas fa-school"></i>Revision</li>
                            </ul>
                        </div>
                    </div>
                    <div className="sub_card_row">
                        <h3>By:Osada Manohara</h3>
                        <div className="al_sub_time">
                            <h3>One Month Ago</h3>
                        </div>
                    </div>
                </div>
                <div className="al_sub_card">
                    <div className="sub_card_row">
                        <div className="image_sub">
                            <img src={rjs} alt=""/>
                        </div>
                        <div className="sub_ins_pro">
                            <div className="ins_outer">
                                <img src={child} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="sub_card_row">
                        <h3>English for 2016 A/L Students</h3>
                        <div className="sub_type">
                            <ul>
                                <li><i className="fas fa-graduation-cap"></i>A/L</li>
                                <li><i className="fas fa-school"></i>Revision</li>
                            </ul>
                        </div>
                    </div>
                    <div className="sub_card_row">
                        <h3>By:Osada Manohara</h3>
                        <div className="al_sub_time">
                            <h3>One Month Ago</h3>
                        </div>
                    </div>
                </div>
                <div className="al_sub_card">
                    <div className="sub_card_row">
                        <div className="image_sub">
                            <img src={rjs} alt=""/>
                        </div>
                        <div className="sub_ins_pro">
                            <div className="ins_outer">
                                <img src={child} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="sub_card_row">
                        <h3>English for 2016 A/L Students</h3>
                        <div className="sub_type">
                            <ul>
                                <li><i className="fas fa-graduation-cap"></i>A/L</li>
                                <li><i className="fas fa-school"></i>Revision</li>
                            </ul>
                        </div>
                    </div>
                    <div className="sub_card_row">
                        <h3>By:Osada Manohara</h3>
                        <div className="al_sub_time">
                            <h3>One Month Ago</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
