import React from 'react'

import CreateNote from './CreateNote'
import './Body.css'
import Notes from './Notes'
const Body = (props) => {
    const {showAlert}=props;
    return (
        <div className='container' id="body">
            <div className='row'>
                <div className='text-center'>
                    <CreateNote showAlert={showAlert} />
                </div>
                <div className='notes my-4'>
                    <Notes showAlert={showAlert}/>
                </div>
            </div>
        </div>
    )
}

export default Body
