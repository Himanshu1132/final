import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { store } from 'react-notifications-component';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { useSpring,animated  } from 'react-spring';
import '../assets/css/displayissuekeys.css'
import ProfileLoader from '../components/ProfileLoader';
import empty from '../img/svg/bookladder.svg';

export default function ViewIssuedKeys() {

    const {id} = useParams();
    const [allKeys, setallKeys] = useState([]);
    const [isRedirect,setisRedirect] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    //animations
    const animiCircle = useSpring({
        config:{
            duration:300
        },
        from:{bottom: 200},
        to:{bottom: 50}
    })

    useEffect(async () => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/issuedcoupon/${id}/`,{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(res=>{
                setisLoading(false);
                setallKeys([...res.data])
            }).catch(()=>{
                setisRedirect(true);
            })
        }
    }, [usDetails]);

    if(isRedirect){
        //showing alert
        store.addNotification({
            title: "Invalid Module!",
            message: "OnDevlms",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
            showIcon:true
            },
            width:600
        });

        return <Redirect to="/teacherdashboard/managecourse/"/>
    }

    const csvFile = () =>{
        let cvData = [];
        if(allKeys){
            allKeys.map((keys,index)=>(
                cvData.push({'id':index+1,'key':keys.coupon_key})

            ))
        }
        return cvData;
    }

    if(isLoading){
        return <ProfileLoader/>
    }
    return (
        <div className='disp_all_issu_keys'>
            <div className="disp_issu_keys">
                {
                    allKeys.length !== 0 && 
                        <animated.div style={animiCircle} className="csv_down_circle">
                            <CSVLink filename='Enrollment-Keys.csv' data={csvFile()}>
                            <i className="fas fa-download"></i>
                            </CSVLink>
                        </animated.div>
                }
                {
                    allKeys.length !==0 ?
                        <div className="table_issu_hd">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Key</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allKeys &&
                                            allKeys.map((keys,index)=>(
                                                <tr key={keys.id}>
                                                    <td>{index+1}</td>
                                                    <td>{keys.coupon_key}</td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                    </div>
                        : 
                        <div className="no_keys">
                            <h1>No Issued Enrollment Keys Available...</h1>
                            <div className="svg">
                                <img src={empty} alt=""/>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
