import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { store } from 'react-notifications-component';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import '../assets/css/formgenkey.css';
import CouponKeyTableBody from './CouponKeyTableBody';
import empty from '../img/svg/bookladder.svg';
import GenerateKeyForm from './GenerateKeyForm';
import ProfileLoader from './ProfileLoader';

function GenerateKeys() {

    const [value, setvalue] = useState({hw:""});
    const [err,seterr] = useState({hw:""});
    const [hide, sethide] = useState({hw:false});
    const [isSubmitting, setisSubmitting] = useState(false);
    const [resMessage, setresMessage] = useState(false);
    const [couponData, setcouponData] = useState([]);
    const [selectKeys, setselectKeys] = useState([]);
    const [check, setcheck] = useState(null);
    const [redirect, setredirect] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    const {id} = useParams();

    const handelValues = (e) =>{
        const {name,value} = e.target;
        setvalue({
            ...value,[name]:value
        });
    }

    const validate = (values) =>{
        let error = {};

        if(!values.hw.trim()){
            error.hw = "Please Enter Number For Generate Keys";
        }
        if(!isNaN(value.hw)){
            if(value.hw > 500){
                error.hw = "Number Of keys Must Be Less Than 500";
            }
        }
        else{
            error.hw = "Please Enter Valid Number";
        }
        return error;
    }

    const submithandler = (e)=>{
        e.preventDefault();
        seterr(validate(value));
        setisSubmitting(true);
        sethide({hw:false});
    }

    useEffect(() => {
        if(Object.keys(err).length === 0 && isSubmitting){
            submit();
        }
    }, [err])

    const hideError = (e)=>{
        Object.entries(err).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })

    }

    function submit(){
        setresMessage(false);
        setisLoading(true);
        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/coupon/${value.hw}/${id}/`,{},{
            headers:{Authorization: 'Token '+usDetails.key}
        }).then(res=>{
            if(res.data.message){
                setresMessage(true);
                setvalue({hw:""})
                
                store.addNotification({
                    title: `${value.hw} Keys Created`,
                    message: "OnDevlms",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true,
                      pauseOnHover: true,
                      showIcon:true
                    },
                    width:400
                });
            }
        })
        
    }
    //getting not issued keys
    useEffect(async() => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/availablecoupon/${id}/`,{
                headers:{Authorization:'Token '+usDetails.key}
            }).then(res=>{
                setcouponData(res.data);
                setisLoading(false);
            }).catch(err=>{
                console.log(err);
                if(err){
                    setredirect(true);
                }
            })
        }
    }, [usDetails,isSubmitting,resMessage,selectKeys,check])

    //select all keys
    const handelckeckall =() =>{
        setcheck(true);

        if(couponData){
            let ft = [];
            couponData.map(cuData=>(
                ft = [...ft,cuData.id]
                ))
            setselectKeys(ft);
            }
    }

    useEffect(() => {
        if(selectKeys.length !== 0){
            //set issued coupon
            setTimeout(function(){
                Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/issuecoupon/`,{
                    "issued_coupons":selectKeys
                },{
                    headers:{Authorization:'Token '+usDetails.key}
                }).then(()=>{
                    setcheck(false);
                    setcheck(null);
                    setselectKeys([]);

                    store.addNotification({
                        title: 'Keys Issued',
                        message: "OnDevlms",
                        type: "info",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 2000,
                          onScreen: true,
                          pauseOnHover: true,
                          showIcon:true
                        },
                        width:400
                    });

                })
            },300);
            clearTimeout();
        }
    }, [selectKeys])

    if(redirect){
        return <Redirect to='/teacherdashboard/managecourse'/>
    }

    return (
        <div className="genkeysform">
            <div className="main_gen_form">
                <GenerateKeyForm submithandler={submithandler} value={value} handelValues={handelValues} hide={hide} hideError={hideError} err={err}/>
                {
                    isLoading ? <ProfileLoader/>
                    :
                        couponData.length !== 0 ?
                        <div className="ac_table">
                                <div className="mid_row">
                                    <p>Not issue Keys</p>
                                    <button onClick={handelckeckall}><i className="fas fa-key"></i> Issue All</button>
                                </div>
                                <div className="disp_gen_keys">
                                    <div className="table_hd">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Key</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    couponData.length !== 0 &&
                                                            couponData.map((data,index)=>(
                                                                <CouponKeyTableBody key={index} data={data} index={index} selectKeys={selectKeys} setselectKeys={setselectKeys} check={check}/>  
                                                            ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                           
                    </div>
                    :
                    <div className="no_keys">
                        <h1>No Enrollment Keys Available...</h1>
                        <div className="svg">
                            <img src={empty} alt=""/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default GenerateKeys
