import React, { useState } from 'react';
import StProfileBottom from '../../components/student/StProfileBottom';
import AboutStUser from '../../components/student/AboutStUser';
import StProfileHead from '../../components/student/StProfileHead';
import StProfileSettings from '../../components/student/StProfileSettings';

export default function StProfile() {

    const [settings, setsettings] = useState(false);

    const switchHadel = (e)=>{
        if(e.target.innerText === "Settings"){
            setsettings(true);
        }
        else{
            setsettings(false);
        }
    }

    return (
        <div>
            <div className="main_profile">
                <div className="tcprofilecolumn">
                    <div className="profile_sub_column">
                        <StProfileHead/>
                    </div>
                    <div className="profile_sub_column">
                        <StProfileBottom/>
                    </div>
                </div>    
                <div className="tcdisoncolumn">
                    <div className="about_header">
                        <ul>
                            <li onClick={switchHadel}><i className="far fa-user-circle"></i>About Me</li>
                            <li onClick={switchHadel}><i className="fas fa-cog"></i>Settings</li>
                        </ul>
                    </div>
                    <div className="about_main_body">
                        <div className={`about_us ${settings ? 'inactivate' : 'activate' } `}>
                            <AboutStUser/>
                        </div>
                        <div className={`settings_us ${!settings ? 'inactivate' : 'activate'}`}>
                            <StProfileSettings setsettings={setsettings}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
