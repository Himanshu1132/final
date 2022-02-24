import React, { useState } from 'react'

function CropImages() {
    const [image, setImage] = useState('');
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();
    const [err, seterr] = useState({});
    const [file, setfile] = useState('');

    const onChange = (e) => {
      e.preventDefault();
      setCropData('#');
      let files;
      if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
            reader.onload = () => {
            setImage(reader.result);
      };
      
      if(files[0]){
        setfile(files[0]);
          if(files[0].type === 'image/jpg' || files[0].type === 'image/jpeg' || files[0].type === 'image/png'){
              seterr({});
              reader.readAsDataURL(files[0]);
          }
          else{
              seterr({err,"img":'Invalid File Type'});
          }
      }
    };
  
    const getCropData = (e) => {
        e.preventDefault();
      if (typeof cropper !== "undefined") {
        setCropData(cropper.getCroppedCanvas().toDataURL());
      }
    };
    return ([image,getCropData,setCropper,onChange,cropData,err,file,setImage,setCropData])
}

export default CropImages
