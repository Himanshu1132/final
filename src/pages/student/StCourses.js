import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import rjs from '../../img/rjs.jpg';
import '../../assets/css/student/stcourse.css';

export default function StCourses() {
    const [isShowDes, setisShowDes] = useState(false);
    const [ismodel, setismodel] = useState(false);
    const modelOuter = useRef();

    const openModel = () =>{
        if(!ismodel){
            setismodel(true);
        }
        else{
            setismodel(false);
        }
    }

    const closemodel = () =>{
        if(ismodel ){
            setismodel(false);
        }
    }

    const closemodelouter = (e) =>{
        if(e.target.className === modelOuter.current.className){
            setismodel(false);
        }
    }

    const modelAni = {
        visible:{
            opacity:1
        },
        hidden:{
            opacity:0
        }
    }
    const pageAni = {
        visible:{
            opacity:1,
            transition:{delay:0.5}
        },
        hidden:{
            opacity:0
        }
    }

    return (
        <>
            <AnimatePresence exitBeforeEnter>
        {
            ismodel ?
                    <motion.div className="key_model_outer" ref={modelOuter} onClick={closemodelouter} variants={modelAni} animate='visible' initial='hidden' exit='hidden'>
                        <motion.div className="key_model_page" variants={pageAni} animate='visible' initial='hidden'>
                            <div className="close_key_mod">
                                <i onClick={closemodel} className="fas fa-times-circle"></i>
                            </div>
                            <h3>Enter Key</h3>
                            <div className="inpu">
                                <input type="text" name="key"/>
                                <button>Enroll</button>
                            </div>
                        </motion.div>
                    </motion.div>
            : ''
        }
        </AnimatePresence>
        <div className="ful_manage_course">
            <div className="top_manage_course">
                <img src={rjs} alt=""/>
                <div className="top_manage_head">
                    <h1>English For 2016 A/L students</h1>
                    <h3>English For All</h3>
                </div>
                
                {
                    //subData.description ?
                        <motion.div layout className="down">
                            <motion.i layout className={`fas fa-chevron-down ${isShowDes ? 'up' : ''}`} onClick={()=>setisShowDes(!isShowDes)}></motion.i>
                        </motion.div>
                    //:''
                }
            </div>
                    <motion.div layout>
                        <AnimateSharedLayout>
                        {
                            isShowDes /*&& subData.description*/ ?
                                <div  className="sub_des_show">
                                    <p>{'subData.description'}</p>
                                </div>
                            : ''
                        }
                        </AnimateSharedLayout> 
                    </motion.div>
            <div className="st_top_manage_body">
                <div className="st_mange_cos_body">
                    <div className="st_manage_cos_search">
                        <input type="text" name='search' placeholder="Search Courses"/>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                    <div className="st_manage_course_grid">
                        <div className="st_grid_card_manage">
                            <Link to={`#`}>
                                <div className="st_grid_card_mg_head">
                                    <img src={rjs} alt=""/>
                                    <div className="dura">
                                        <h3><i className="far fa-clock cl"></i>25 Hrs</h3>
                                    </div>
                                </div>
                                <div className="st_cos_manage_num">
                                    <h3>{`01`}</h3>
                                </div>
                            </Link>
                            <div className="st_cos_options_mna">
                                <h3><i className="fas fa-chevron-circle-up"></i></h3>
                                <div className="st_options_manage">
                                    <ul>
                                        <Link to={`#`}>
                                            <li><i className="fas fa-exclamation"></i>Unenrolled Me</li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                            <Link to="#'">
                                <div className="st_grid_card_mg_body">
                                    <h3>Active Voice</h3>
                                    <h4>LKR 255</h4>
                                    <div className="st_purchase_row">
                                        <button><i className="fas fa-shopping-cart"></i>Buy Key</button>
                                        <button onClick={openModel}><i className="fas fa-key"></i>Key</button>
                                    </div>
                                    <div className="cs_st_tail">
                                        {/*<h4><ReactTimeAgo date={Date.parse(created_at)} locale="en-US" /></h4>*/}
                                        {<h4>One  Month Ago</h4>}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>     
            </div>
        </div>
        </>
    )
}
