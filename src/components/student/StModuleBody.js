import { motion } from 'framer-motion';
import React, { useState } from 'react'

export default function StModuleBody({children,name}) {
    const [isToggle, setisToggle] = useState(true);

    return (
        <motion.div layout className="al_on_model">
            <motion.div layout className="on_model_head">
                <h1>{name}</h1>
                <div className="heads_buts">
                    <button onClick={()=>setisToggle(!isToggle)}><i className="fas fa-chevron-down"></i></button>
                </div>
            </motion.div>
            {
                isToggle ? children : ''
            }
        </motion.div>
    )
}
