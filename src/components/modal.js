import React from 'react';
import '../styles/modal.css';

function Modal(props) {
    const icon = (props.actionType === 'danger') 
    ? (<i style={{color: 'crimson'}} className="fas fa-exclamation-triangle"></i>)
    : (<i style={{color: 'darkorange'}} className="fas fa-question-circle"></i>)
    return (
        <div className="modalContainer d-flex flex-column justify-content-center align-items-center">
            <div className="modalContent py-4 px-3">
                <h1 className="text-center icon">{icon}</h1>
                <h5 className="text-center modalMessage my-3">{props.message}</h5>
                <hr />
                <div className="w-75 mx-auto d-flex justify-content-around">
                    <button className="d-block btn btn-light" onClick={props.closeModal}>Cancel</button>
                    <button className={`d-block btn btn-${props.actionType}`} onClick={props.action}>{props.actionMessage}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;