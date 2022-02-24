import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import CourseCreateForm from '../components/CourseCreateForm';
import { checkErrors } from '../components/CourseFormValidation';
import ThreeStepSection from '../components/ThreeStepSection'
import CropImages from '../utils/hooks/CropImages';

export default function CreateCourse() {

    const [image,getCropData,setCropper,onChange,cropData,err,file] = CropImages();//custom h
    const [showCropper , setshowCropper] = useState(false);

    const [courseValue, setcourseValue] = useState({course_name:"",course_price:"",course_description:"",hr:""});
    const [courseErrors, setcourseErrors] = useState({course_name:"",course_price:"",course_description:"",hr:""});
    const [hide, sethide] = useState({course_name:false,course_price:false,course_description:false,hr:false});
    const [isSubmitting, setisSubmitting] = useState(false);
    const [progress, setprogress] = useState(false);
    const [redirec, setredirec] = useState({err:"",id:""});
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);
    
    const {id} = useParams();

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
        console.log("submit");
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

        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/course-api/createcourse/${id}/${usDetails.id}/`,form_data,{
            headers:{Authorization:"Token "+usDetails.key},onUploadProgress:progressEvent=>{
                if(progressEvent.isTrusted){
                    setprogress(true);
                }
            }
        }).then(res=>{
            setredirec({id:res.data.id});
        }).catch(err=>{
            if(err.response.data.message){
                setredirec({err:true});
            }
        })
    }
    
    if(!id){
        return <Redirect to="/"/>
    }
    if(redirec.err){
        return <Redirect to={`/teacherdashboard/createsubject`} />
    }
    if(redirec.id){
        return <Redirect to={`/teacherdashboard/createmodels/${redirec.id}`} />
        
    }

    return (
       <div className="subject_form">
            <ThreeStepSection set="cc"/>
            <div className="main_form">
                <h1>Create Course</h1>
                <CourseCreateForm handelSubmit={handelSubmit} showCropper={showCropper} cropData={cropData} err={err} image={image} setCropper={setCropper} onChange={onChange} setshowCropper={setshowCropper} getCropData={getCropData} courseValue={courseValue} handelFormValues={handelFormValues} hideError={hideError} courseErrors={courseErrors} hide={hide} progress={progress}/>
            </div>
        </div>
    )
}
