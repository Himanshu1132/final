import React, { useEffect, useState } from 'react'
import AboutUser from '../components/AboutUser';
import ProfileBottom from '../components/ProfileBottom';
import ProfileHead from '../components/ProfileHead';
import TcProfileSettings from '../components/TcProfileSettings';
import "../assets/css/usprofile.css";
import "../assets/css/mediaFiles/profilemedia.css";

function ProfileSettings() {

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
                        <ProfileHead/>
                    </div>
                    <div className="profile_sub_column">
                        <ProfileBottom/>
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
                            <AboutUser/>
                        </div>
                        <div className={`settings_us ${!settings ? 'inactivate' : 'activate'}`}>
                            <TcProfileSettings setsettings={setsettings}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings
