import React from 'react'

export default function GenerateKeyForm({submithandler,value,handelValues,hide,hideError,err}) {
    return (
        <form onSubmit={submithandler}>
            <p>
                <label htmlFor="ks">How Many Keys?</label>
                <input type="number" min="0" step="1" name="hw" id="ks" value={value.hw} onChange={handelValues} onFocus={hideError}/>  
                {
                     err.hw && <span className={`tip ${hide.hw ? 'hidetip' : ''}`}>{err.hw}</span>
                }  
             </p>

            <div className="gen_sub">
                <button>Generate</button>
            </div>
        </form>
    )
}
