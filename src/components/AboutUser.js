import React from 'react'
import AcDetails from '../utils/hooks/AcDetails'

export default function AboutUser() {

    const [teachProfilepic,profileDetails] = AcDetails();

    return (
        <div>
            <div className="about_body">
                <h3>About</h3>
                <div className="ab_main_card">
                    <div className="ab_card">
                    <h3>Name</h3>
                    <h4>{profileDetails.name && `${profileDetails.name} ${profileDetails.lname}`}</h4>
                    </div>
                    <div className="ab_card">
                    <h3>User Name</h3>
                    <h4>{profileDetails.userName && profileDetails.userName}</h4>
                    </div>
                    <div className="ab_card">
                    <h3>Mobile</h3>
                    <h4>{profileDetails.phoneNumber && profileDetails.phoneNumber}</h4>
                    </div>
                    <div className="ab_card">
                    <h3>Email</h3>
                    <h4>{profileDetails.email && profileDetails.email}</h4>
                    </div>
                </div>
                <div className="disdis">
                    <p>{profileDetails.des && profileDetails.des !== 'null' && profileDetails.des}</p>    
                </div>
                    {
                        (profileDetails.ed1 || profileDetails.ed2 || profileDetails.ed3) &&
                            <div className="ac_education">
                                <h3>Education</h3>
                                {
                                    profileDetails.ed1 && profileDetails.ed1 !== 'null' && <h4>{profileDetails.ed1}</h4>
                                }
                                {
                                    profileDetails.ed2  && profileDetails.ed2 !== 'null' && <h4>{profileDetails.ed2}</h4>
                                }
                                {
                                    profileDetails.ed3  && profileDetails.ed3 !== 'null' && <h4>{profileDetails.ed3}</h4>
                                }
                            </div>
                    }
                    {
                        (profileDetails.ex1 || profileDetails.ex2 || profileDetails.ex3) &&
                            <div className="ac_experience">
                                <h3>Experiences</h3>
                                {
                                    profileDetails.ex1 &&  profileDetails.ex1 !== 'null' && <h4>{profileDetails.ex1}</h4>
                                }
                                {
                                    profileDetails.ex2 &&  profileDetails.ex2 !== 'null' && <h4>{profileDetails.ex2}</h4>
                                }
                                {
                                    profileDetails.ex3 &&  profileDetails.ex3 !== 'null' && <h4>{profileDetails.ex3}</h4>
                                }
                            </div>
                    }
            </div>
        </div>
    )
}
