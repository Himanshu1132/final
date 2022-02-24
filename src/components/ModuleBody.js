import { motion } from 'framer-motion';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function ModuleBody({children,name,id,handelDeleteModule}) {
    const [isToggle, setisToggle] = useState(true);

    return (
        <motion.div layout className="al_on_model">
            <motion.div layout className="on_model_head">
                <h1>{name}</h1>
                <div className="heads_buts">
                    <Link to={`/teacherdashboard/updatemodule/${id}`}>
                        <button><i className="fas fa-edit"></i></button>
                    </Link>
                    <button onClick={()=>handelDeleteModule(id)}><i className="fas fa-trash"></i></button>
                    <button onClick={()=>setisToggle(!isToggle)}><i className="fas fa-chevron-down"></i></button>
                </div>
            </motion.div>
            {
                isToggle ? children : ''
            }
        </motion.div>
    )
}

export default ModuleBody
