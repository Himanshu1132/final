import React from 'react'

export default function StAcDetailsSettingsFrm({values,hadelChange,hadelSubmitForm,hideError,errors,hide}) {
    return (
        <div>
            <form onSubmit={hadelSubmitForm}>
                <div className="sectpr">
                    <p>
                        <label htmlFor="fn">First Name</label>
                        <input type="text" id="fn" name="firstName" value={values.firstName || ''} onChange={hadelChange} onFocus={hideError}/>
                        {
                            errors.firstName && <span className={`tip ${hide.firstName ? 'hidetip' : ''}`}>{errors.firstName}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="ln">Last Name</label>
                        <input type="text" id="ln" name="lastName"  value={values.lastName || ''}  onChange={hadelChange} onFocus={hideError}/>
                        {
                            errors.lastName && <span className={`tip ${hide.lastName ? 'hidetip' : ''}`}>{errors.lastName}</span>
                        }
                    </p>
                </div>
                <div className="sectpr">
                    <p>
                        <label htmlFor="un">User Name</label>
                        <input type="text" id="un" name="userName" value={values.userName || ''} onChange={hadelChange} onFocus={hideError}/>
                        {
                            errors.userName && <span className={`tip ${hide.userName ? 'hidetip' : ''}`}>{errors.userName}</span>
                        }
                    </p>
                    <p>
                        <label htmlFor="pn">Phone Number</label>
                        <input type="text" id="pn" name="phoneNumber" value={values.phoneNumber || ''} onChange={hadelChange} onFocus={hideError}/>
                        {
                            errors.phoneNumber && <span className={`tip ${hide.phoneNumber ? 'hidetip' : ''}`}>{errors.phoneNumber}</span>
                        }
                    </p>
                </div>
                <div className="sectpr">
                    <p>
                        <label htmlFor="ad">Email</label>
                        <input type="text" id="ad" name="email" value={values.email || '' } onChange={hadelChange} onFocus={hideError} />
                        {
                            errors.email && <span className={`tip ${hide.email ? 'hidetip' : ''}`}>{errors.email}</span>
                        }
                    </p>
                </div>
                <div className="sectpr">
                    <p>
                        <label htmlFor="ad">Address</label>
                        <input type="text" id="ad" name="address" value={values.address || ''} onChange={hadelChange} onFocus={hideError}/>
                        {
                            errors.address && <span className={`tip ${hide.address ? 'hidetip' : ''}`}>{errors.address}</span>
                        }
                    </p>
                </div>
                <div className="sectpr">
                    <p>
                        <label htmlFor="ad">Descriptions</label>
                        <textarea cols="30" rows="10" name="des" value={values.des === 'null' ||values.des === null ? '' : values.des } onChange={hadelChange} onFocus={hideError}></textarea>
                        {
                            errors.des && <span className={`tip ${hide.des ? 'hidetip' : ''}`}>{errors.des}</span>
                        }
                    </p>
                </div>
                <div className="sectpr">
                    <p>
                        <label htmlFor="pw" style={{fontWeight:'bold'}}>Password</label>
                        <input type="password" name="pw" id="pw" value={values.pw} onChange={hadelChange} onFocus={hideError} style={{borderColor:'#f57100'}}/>
                        {
                            errors.pw && <span className={`tip ${hide.pw ? 'hidetip' : ''}`}>{errors.pw}</span>
                        }
                    </p>
                </div>
                <div className="pro_edit_sub">
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}
