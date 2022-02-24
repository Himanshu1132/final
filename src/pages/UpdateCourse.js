import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { store } from 'react-notifications-component';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { checkErrors } from '../components/CourseFormValidation';
import UpdateCourseForm from '../components/UpdateCourseForm';
import CropImages from '../utils/hooks/CropImages';

export default function UpdateCourse() {

    const [image,getCropData,setCropper,onChange,cropData,err,file] = CropImages();//custom hook
    const [showCropper , setshowCropper] = useState(false);
    const [courseValue, setcourseValue] = useState({course_name:"",course_price:"",course_description:"",hr:"",course_img:""});
    const [courseErrors, setcourseErrors] = useState({course_name:"",course_price:"",course_description:"",hr:""});
    const [hide, sethide] = useState({course_name:false,course_price:false,course_description:false,hr:false});
    const [isSubmitting, setisSubmitting] = useState(false);
    const [progress, setprogress] = useState(false);
    const [redirec, setredirec] = useState({err:"",id:""});
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    
    const {subid} = useParams();

    useEffect(async() => {
        if(usDetails.key){
            await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/list/${subid}/`,{
                headers:{Authorization:"Token "+usDetails.key}
            }).then(res=>{
                console.log(res.data);
                setcourseValue({course_name:res.data.course_name,course_price:res.data.price,course_description:res.data.course_description,hr:res.data.duration,course_img:res.data.course_cover});
            }).catch(err=>{
                console.log(err.response.data.detail);
                if(err.response.data.detail){
                    setredirec({...redirec,err:err.response.data.detail});    
                }
            })
        }

    }, [usDetails]);

    const handelFormValues =(e)=>{
        const {name,value} = e.target;
        setcourseValue({
            ...courseValue,[name]:value
        })
    }
    const handelSubmit = (e)=>{
        e.preventDefault();
        setcourseErrors(checkErrors(courseValue));
        sethide({course_name:false,course_price:false,course_description:false});
        setisSubmitting(true);
    }

    const hideError = (e)=>{
        Object.entries(courseErrors).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })
    }

    useEffect(() => {
        if(Object.keys(courseErrors).length === 0 && isSubmitting){
            submit();
        }
    }, [courseErrors])

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

    function submit(){
        let form_data = new FormData();

        if(cropData !== '#'){
            let input = cropData.split(',')[1];
            const blob = b64toBlob(input,file.type)
            form_data.append("course_cover",blob,file.name);
        }

        form_data.append('course_name',courseValue.course_name);
        form_data.append('course_description',courseValue.course_description);
        form_data.append('price',courseValue.course_price);
        form_data.append('duration',courseValue.hr);

        Axios.put(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/updatecourse/${subid}/`,form_data,{
            headers:{Authorization:"Token "+usDetails.key},onUploadProgress:progressEvent=>{
                if(progressEvent.isTrusted){
                    setprogress(true);
                }
            }
        }).then(res=>{
            setprogress(false)
            //showing alert
            store.addNotification({
                title: "Course Updated!",
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

            setredirec({id:res.data.id});
        }).catch(err=>{
            if(err.response.data.message){
                setredirec({err:true});
            }
        })
    }

    if(redirec.err){
        return <Redirect to='/teacherdashboard/managecourse/'/>
    }
    if(redirec.id){
        return <Redirect to={`/teacherdashboard/models/${redirec.id}`}/>
    }

    return (
        <div className="subject_form">
            <div className="main_form">
            <h1>Update Course</h1>
                <UpdateCourseForm handelSubmit={handelSubmit} showCropper={showCropper} cropData={cropData} err={err} image={image} setCropper={setCropper} courseValue={courseValue} onChange={onChange} setshowCropper={setshowCropper} getCropData={getCropData} handelFormValues={handelFormValues} hideError={hideError} courseErrors={courseErrors} hide={hide} progress={progress}/>
            </div>
        </div>
    )
}
