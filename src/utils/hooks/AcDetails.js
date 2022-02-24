import Axios from 'axios';
import { useEffect, useState } from 'react'
import UserStatus from './UserStatus';

function AcDetails() {

    const [teachProfilepic, setteachProfilepic] = useState('');
    const [profileDetails, setprofileDetails] = useState({});
    const {hadelLogOut} = UserStatus();//custom hook

    useEffect(async () => {
        if(localStorage.getItem("usValues") !== null){
            if(Object.keys(JSON.parse(localStorage.getItem("usValues"))).length !==0){
                const userDetails = JSON.parse(localStorage.getItem("usValues"));
                await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/account-api/profile/${userDetails.user.id}/`,{
                    headers:{Authorization:'Token '+userDetails.key}
                }).then(res=>{
                    setteachProfilepic(res.data.profile_pic);
                    setprofileDetails({name:res.data.user.first_name,lname:res.data.user.last_name,phoneNumber:res.data.user.phone_no,email:res.data.user.email,userName:res.data.user.username,address:res.data.user.address,des:res.data.description,ex1:res.data.experience1,ex2:res.data.experience2,ex3:res.data.experience3,ed1:res.data.education1,ed2:res.data.education2,ed3:res.data.education3});
                }).catch(err=>{
                    if(err){
                        hadelLogOut();
                    }
                })
            };
        }
    },[])
    return ([teachProfilepic,profileDetails])
}

export default AcDetails
