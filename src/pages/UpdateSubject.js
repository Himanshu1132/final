import React, { useState } from 'react'
import CropImages from '../utils/hooks/CropImages';
import UpdateSubjectFunc from '../utils/hooks/SubjectUpdateValidation';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { store } from 'react-notifications-component';
import { Redirect, useParams } from 'react-router-dom';
import UpdateSujectForm from '../components/UpdateSujectForm';

export default function UpdateSubject() {

    const {subid} = useParams();
    const {hadelChabgeFormValues,formValue,handelSubmit,hideError,hide,formErrors} = UpdateSubjectFunc(submitForm,subid);
    const [image,getCropData,setCropper,onChange,cropData,err,file] = CropImages();//custom hook
    const [showCropper , setshowCropper] = useState(false);
    const [isUploading, setisUploading] = useState(false);
    const [isredirect, setisredirect] = useState(false);

    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    //function for base64 to blob 
    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    function submitForm(){
        let form_data = new FormData();

        if(cropData !== '#'){
            let input = cropData.split(',')[1];
            const blob = b64toBlob(input,file.type)
            form_data.append("subject_cover",blob,file.name);
        }

        form_data.append("subject_name",formValue.subject_title);
        form_data.append("short_description",formValue.subject_shdes);
        form_data.append("description",formValue.sub_des);
        form_data.append("class_type",formValue.class_type);
        form_data.append("subject_type",formValue.subject_type);

        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/updatesubject/${subid}/`,form_data,{
            headers:{Authorization:"Token " + usDetails.key},onUploadProgress:progressEvent=>{
                if(progressEvent.isTrusted){
                    setisUploading(true);
                }
            }
        }).then(()=>{
            setisUploading(false);
            //showing alert
            store.addNotification({
                title: "Subject Updated!",
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
            setisredirect(true);

        }).catch(e=>{
            console.log(e);
        })
    }

    if(isredirect){
        return <Redirect to='/teacherdashboard/managecourse'/>
    }
    return (
        <div className="subject_form">
            <div className="main_form">
                <h1>Update Subject</h1>
                   <UpdateSujectForm hadelChabgeFormValues={hadelChabgeFormValues} handelSubmit={handelSubmit} hideError={hideError} hide={hide} formErrors={formErrors} image={image} getCropData={getCropData} setCropper={setCropper} onChange={onChange} err={err} showCropper={showCropper} setshowCropper={setshowCropper} isUploading={isUploading} formValue={formValue} cropData={cropData} />  
            </div>
        </div>
    )
}
