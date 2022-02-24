import Axios from 'axios';
import React from 'react';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { loadStDetails } from '../../actions/stDetailsAction';
import UseStprofileUpdate from '../../utils/hooks/Student/UseStprofileUpdate';
import UserChangedPassword from '../UserChangedPassword';
import StAcDetailsSettingsFrm from './StAcDetailsSettingsFrm';

export default function StProfileSettings({setsettings}) {

    const {values,hadelChange,hadelSubmitForm,hideError,errors,hide,seterrors} = UseStprofileUpdate(submit);

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    const dispatch = useDispatch();

    function submit(){
        let all_data = new FormData();

        all_data.append('first_name',values.firstName);
        all_data.append('last_name',values.lastName);
        all_data.append('username',values.userName);
        all_data.append('phone_number',values.phoneNumber);
        all_data.append('email',values.email);
        all_data.append('address',values.address);
        all_data.append('password',values.pw);

        all_data.append('description',values.des);

       Axios.put(`${process.env.REACT_APP_LMS_MAIN_URL}/account-api/updateuser/${usDetails.id}/`,all_data,{
           headers:{Authorization:"Token " + usDetails.key}
       }).then(()=>{
            Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/account-api/updatestudent/${usDetails.id}/`,all_data,{
                headers:{Authorization: "Token " + usDetails.key}
            }).then(()=>{
                dispatch(loadStDetails());
                setsettings(false);
                
                store.addNotification({
                    title: "Profile Changed Successfully!",
                    message: "OnDevlms",
                    type: "success",
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
            })
        }).catch(err=>{
            
            if(err.response.data.detail){
                seterrors({...errors,pw:err.response.data.detail})
            }
            if(err.response.data.username){
                seterrors({...errors,userName:err.response.data.username})
            }
            if(err.response.data.email){
                seterrors({...errors,email:err.response.data.email})
            }
        })
    }

    return (
        <div>
            <div className="tc_profile_settings">
                <div className="ac_det">
                    <h2>Account Settings</h2>
                    <StAcDetailsSettingsFrm values ={values} hadelChange = {hadelChange} hadelSubmitForm = {hadelSubmitForm} hideError={hideError} errors={errors} hide={hide}/>
                </div>
                <div className="set_password">
                    <UserChangedPassword setsettings={setsettings}/>
                </div>
            </div>
        </div>
    )
}
