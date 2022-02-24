import React, { useRef, useState } from 'react';
import { useSpring,animated } from 'react-spring';
import "cropperjs/dist/cropper.min.css";
import '../assets/css/modelStyles.css';
import Axios from 'axios';
import {useSelector } from 'react-redux';
import { Cropper } from 'react-cropper';
import { useHistory } from 'react-router-dom';

export default function UploadPropicModel({setshowModel,showModel,filePath,setfilePath,image,getCropData,setCropper,cropData,setCropData}) {

    const modelBGref = useRef();
    const [cropHide, setcropHide] = useState(false);
    const [uploadPresentage, setuploadPresentage] = useState(0);
    //get acDetails from Redux Store
    const usDetails = useSelector(state => state.accountDetails);

    const modelBGclick = (e) =>{
        if(modelBGref.current === e.target){
            setshowModel(false);
            setcropHide(false);
            setfilePath('');
            setCropData('#');
        }
    }
    const clearPR = () =>{
        setfilePath('');
        setCropData('#');
    }

    //animations
    const modelAni = useSpring({
        config:{
            duration:350
        },
        opacity:showModel ? 1 : 0
    })

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


    const history = useHistory();

    //upload image
    const HadelUploadImage = (e) =>{
        e.preventDefault();

        let contentType = filePath.type;
        let input = cropData.split(',')[1];
        const blob = b64toBlob(input, contentType);

        let form_data = new FormData();
        form_data.append('profile_pic',blob,filePath.name);
        Axios.post(`${process.env.REACT_APP_LMS_MAIN_URL}/account-api/updateteacher/${usDetails.id}/`,form_data,{
            headers:{
                Authorization: "Token " + usDetails.key,
                'content-type':'multipart/form-data'
            },onUploadProgress:progressEvent=>{
                setuploadPresentage(
                    parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                )
            }
        }).then(()=>{
               history.go(0);
        }).catch(err=>console.log(err))
    }
    
    return (
        <>
        {
            showModel ? 
            <div className="model_page" ref={modelBGref} onClick={modelBGclick}>
                <animated.div style={modelAni} className='cropup'>
                <div className="on_model_page">
                    <div className="close_but">
                        {
                            uploadPresentage === 0 &&
                                <button onClick={()=>{setshowModel(!showModel);setcropHide(false);clearPR()}}><i className="fas fa-times"></i></button>
                        }
                    </div>
                    <div className="model_content">
                        <div className={`image_crop_container ${cropHide ? 'disnone' : null}`}>
                                <Cropper
                                    style={{ height: '100%', width: "100%" }}
                                    initialAspectRatio={16 / 9}
                                    aspectRatio={1 / 1}
                                    preview=".img-preview"
                                    src={image}
                                    viewMode={1}
                                    guides={true}
                                    minCropBoxHeight={10}
                                    minCropBoxWidth={10}
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                    checkOrientation={false}
                                    onInitialized={(instance) => {
                                    setCropper(instance);
                                    }}
                                />
                        </div>
                        {
                            image !== '#' && image !== ''?
                            <div className={`butbut ${cropHide ? 'disnone' : null}`}>
                                <button onClick={(e)=>{getCropData(e);setcropHide(true)}}>Crop Profile Image</button>
                            </div>
                            :''
                        }
                        <div className={`preview_container ${!cropHide ? 'disnone' : null}`}>
                            <div className="loader">
                                <svg>
                                    <circle cx="150" cy="150" r="150"></circle>
                                    <circle cx="150" cy="150" r="150" style={{strokeDashoffset:`calc(972 - (972 * ${uploadPresentage}) / 100)`}}></circle>
                                </svg>
                                <div className="imgwrap">
                                    <img className="image_preview" alt="" src={cropData}/> 
                                </div>
                            </div>
                            <div className="butbut">
                                {
                                    uploadPresentage === 0 ?
                                                <form onSubmit={HadelUploadImage}>
                                                    <button>Upload Profile Picture</button>
                                                </form>
                                    : 
                                <h1 className="count">Uploading {uploadPresentage}%</h1>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                </animated.div>
            </div>
            : null
        }
        </>
    )
}
