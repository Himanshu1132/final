import { AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import ReactPlayer from 'react-player/lazy';
import StModuleBody from './StModuleBody';
import ReactHtmlParser  from 'react-html-parser';

export default function StOneModule({name,msg,moduleFiles,id}) {

    //filtering message and embed react player
    function filterTags(nodes){
        let media = [];
        if(nodes.length > 0){
            for(let i=0;i<nodes.length;i++){
                if(nodes[i].type === 'figure' && nodes[i].props.className === 'media'){
                    if(nodes[i].props.children){
                        for(let x=0;x<nodes[i].props.children.length;x++){
                            if(nodes[i].props.children[x].type ==='oembed'){
                                media.push(
                                    <div className='re_player' key={i}>
                                        <ReactPlayer url={nodes[i].props.children[x].props.url} controls={true} pip={true} className='player' width='100%' height='100%'/>
                                    </div>
                                    )
                            }
                            else{
                                media = [...media,nodes[i]];
                            }
                        }
                    }
                    else{
                        media = [...media,nodes[i]];
                    }
                }
                else{
                    media = [...media,nodes[i]];
                }
            }
            return media;
        }
    }

    return (
        <AnimateSharedLayout>
            <StModuleBody name={name} >
                <div className="on_model_body">
                    {
                        msg &&
                            <div className="model_body_row">
                                {filterTags(ReactHtmlParser(msg))}
                            </div>
                    }
                    {
                        moduleFiles.length !== 0 ? 

                            moduleFiles.map((files)=>(
                                parseInt(Object.keys(files)) === id &&
                                Object.values(files)[0].map(fl =>(
                                    <div className="model_body_row" key={fl.id}>
                                        <p>
                                            {
                                                fl.file.substring(fl.file.lastIndexOf('.')+1) === 'jpg' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'png' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'jpeg' ?
                                                            <i className="fas fa-file-image"></i>
                                                : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'pdf' ?
                                                            <i className="fas fa-file-pdf"></i>
                                                : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'pptx' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'pptm' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'ppt' ?
                                                            <i className="fas fa-file-powerpoint"></i>
                                                : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'mp4' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'mkv' ?
                                                            <i className="fab fa-youtube"></i>
                                                : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'mp3' ?
                                                            <i className="far fa-file-audio"></i>
                                                : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'xlsx' || fl.file.substring(fl.file.lastIndexOf('.')+1) === 'xlsb' ?
                                                        <i className="far fa-file-excel"></i>
                                                : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'html' ?
                                                        <i className="fab fa-html5"></i>
                                                : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'css'?
                                                        <i className="fab fa-css3-alt"></i>
                                                : fl.file.substring(fl.file.lastIndexOf('.')+1) === 'js' ?    
                                                        <i className="fab fa-js-square"></i>
                                                : <i className="far fa-file-alt"></i>
                                            } 
                                            <a href={`${process.env.REACT_APP_LMS_MAIN_URL}${fl.file}`} target="_blank" download>{fl.file_name || fl.id}</a> </p>
                                    </div>
                                ))
                            ))

                        : ''
                    }
                </div>
            </StModuleBody>
        </AnimateSharedLayout>
    )
}
