import React from 'react'
import { Cropper } from 'react-cropper';

export default function CourseCreateForm({handelSubmit,showCropper,cropData,err,image,setCropper,onChange,setshowCropper,getCropData,courseValue,handelFormValues,hideError,courseErrors,hide,progress}) {
    return (
        <form onSubmit={handelSubmit}>
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
                            <label htmlFor="file">{cropData === '#' ? 'Upload Course Cover' : 'Changed Course Cover'}</label>
                            <input type="file" name="file" id="file" onChange={(e)=>{onChange(e);setshowCropper(true)}}/>
                            {
                                showCropper && cropData === '#' && !err.img? <button className="cp" onClick={getCropData}>Crop Image</button> : ''
                            }
                        </p>
                    </div>
                    <p>
                        <label htmlFor="cn">Course Name</label>
                        <input type="text" name="course_name" value={courseValue.course_name}
                        onChange={handelFormValues} onFocus={hideError}/>
                        {
                            courseErrors.course_name && <span className={`tip ${hide.course_name ? 'hidetip' : ''}`}>{courseErrors.course_name}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="cp">Course Price</label>
                        <span className="on_row">
                            <span className='curu'>LKR</span>
                            <input type="number" name="course_price" min="0" value={courseValue.course_price} onChange={handelFormValues} onFocus={hideError}/>
                        </span>
                        {
                            courseErrors.course_price && <span className={`tip ${hide.course_price ? 'hidetip' : ''}`}>{courseErrors.course_price}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="cd">Course Description</label>
                        <textarea name="course_description" id="cd" rows="10" value={courseValue.course_description} onChange={handelFormValues} onFocus={hideError}></textarea>
                        {
                            courseErrors.course_description && <span className={`tip ${hide.course_description ? 'hidetip' : ''}`}>{courseErrors.course_description}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="st">Total Hours</label>
                        <input type="number" name="hr" min='0' step="0.1" value={courseValue.hr} onChange={handelFormValues} />
                        <span className="hr">Hr</span>
                        {
                                courseErrors.hr && <span className={`tip ${hide.hr ? 'hidetip' : ''}`}>{courseErrors.hr}</span>
                        }
                    </p>
                    <p>
                        <button className="sub" type={`${progress ? 'button' : 'submit'}`} name="create">Create Course <i className={`fas fa-circle-notch notch ${!progress ? 'dis' : ''}`}></i></button>
                    </p>
                </form>
    )
}
