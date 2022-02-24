import React, { useEffect, useRef } from 'react'

export default function CouponKeyTableBody({data,index,selectKeys,setselectKeys,check}) {
    
    const checkBoxref = useRef();
    const hadelCheck = (e) =>{
        setselectKeys([
            ...selectKeys,parseInt(e.target.value)
        ]);

    }

    useEffect(() => {
        if(check!==null){
            checkBoxref.current.checked = true;
        }
        else{
            checkBoxref.current.checked = false;
        }
    }, [check]);

    return (
            <tr>
            <td>{index+1}</td>
            <td>{data.coupon_key}</td>
            <td>
                <label htmlFor={index} className="toggle">
                    <input type="checkbox" ref={checkBoxref} name="actigen" value={data.id} onChange={hadelCheck} id={index} />
                    <div className="toggle_fill"></div>
                </label>
            </td>
        </tr> 
    )
}
