import React, { useState } from 'react'
import Cropper from 'react-cropper';

export default function CreateSubjectForm({formValue,hadelChabgeFormValues,handelSubmit,formErrors,hide,hideError,image,getCropData,setCropper,onChange,cropData,err,uploading}) {
    const [showCropper , setshowCropper] = useState(false);

    return (
                <form onSubmit={handelSubmit}>
                    <p>
                        <label htmlFor="st">Subject Title</label>
                        <input type="text" name="subject_title" id="st" value={formValue.subject_title} onChange={hadelChabgeFormValues} onFocus={hideError}/>
                        {
                                formErrors.subject_title && <span className={`tip ${hide.subject_title ? 'hidetip' : ''}`}>{formErrors.subject_title}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="ssd">Subject Short Description</label>
                        <input type="text" name="subject_shdes" id="ssd" value={formValue.subject_shdes} onChange={hadelChabgeFormValues} onFocus={hideError}/>
                        {
                                formErrors.subject_shdes && <span className={`tip ${hide.subject_shdes ? 'hidetip' : ''}`}>{formErrors.subject_shdes}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="sd">Subject Description</label>
                        <textarea name="sub_des" id="sd" rows="10" value={formValue.subject_des} onChange={hadelChabgeFormValues} onFocus={hideError}></textarea>
                        {
                                formErrors.subject_des && <span className={`tip ${hide.subject_des ? 'hidetip' : ''}`}>{formErrors.subject_des}</span>
                        }
                    </p>
                    <div className="up_pro_pic">
                        {
                            showCropper && cropData === '#' && !err.img &&
                            <div className="cropper_be">
                                <Cropper
                                    style={{ height: '100%', width: "100%" }}
                                    initialAspectRatio={16 / 9}
                                    aspectRatio={16 / 9}
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
                        }
                        {
                            cropData !== '#' && 
                                <div className="finCropImg">
                                    <img style={{ width: "100%" }} src={cropData} alt="cropped" />
                                </div>
                        }
                        <p>
                            <label htmlFor="file">{cropData === '#' ? 'Upload Subject Cover' : 'Changed Subject Cover'}</label>
                            <input type="file" name="file" id="file" onChange={(e)=>{onChange(e);setshowCropper(true)}}/>
                            {
                                showCropper && cropData === '#' && !err.img? <button className="cp" onClick={getCropData}>Crop Image</button> : ''
                            }
                        </p>
                    </div>
                    <div className="sub_sect">
                        <p>
                            <label htmlFor="ct">Class Type</label>
                            <select name="class_type" id='ct' value={formValue.class_type} onChange={hadelChabgeFormValues} onFocus={hideError}>
                                <option value="" disabled>Select Class Type</option>
                                <option value="a/l">A/L</option>
                                <option value="o/l">O/L</option>
                                <option value="other">Other</option>
                            </select>
                            {
                                formErrors.class_type && <span className={`tip ${hide.class_type ? 'hidetip' : ''}`}>{formErrors.class_type}</span>
                            }
                        </p>
                        <p>
                            <label htmlFor="st">Subject Type</label>
                            <select name="subject_type" id="st" value={formValue.subject_type} onChange={hadelChabgeFormValues} onFocus={hideError}>
                                <option value="" disabled>Select Subject Type</option>
                                <option value="revision">Revision</option>
                                <option value="theory">Theory</option> 
                                <option value="group">Group</option> 
                            </select>
                            {
                                formErrors.subject_type && <span className={`tip ${hide.subject_type ? 'hidetip' : ''}`}>{formErrors.subject_type}</span>
                            }
                        </p>
                    </div>
                    <p>
                        <button className="sub" type={`${uploading ? 'button' : 'submit'}`} name="create"><span>Create Subject</span> <i className={`fas fa-circle-notch notch ${!uploading ? 'dis' : ''}`}></i></button>
                    </p>
                </form>
    )
}
