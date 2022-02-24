import React from 'react'

export default function ThreeStepSection({set}) {
    return (
            <div className="uppper_section">
                <div className="main_upper">
                    <div className="up_column">
                        <div className={`up_icon ${set==='cs' && 'act'}`}>
                            <i className="fas fa-book"></i>
                        </div>
                        <h3>Create Subject</h3>
                        <div className="line"></div>
                    </div>
                    <div className="up_column">
                        <div className={`up_icon ${set==='cc' && 'act'}`}>
                            <i className="fas fa-book-reader"></i>
                        </div>
                        <h3>Create Course</h3>
                    </div>
                    <div className="up_column">
                        <div className={`up_icon ${set==='acm' && 'act'}`}>
                        <i className="fas fa-pen-nib"></i>
                        </div>
                        <h3>Add Course Materials</h3>
                    </div>
                </div>
            </div>
    )
}
