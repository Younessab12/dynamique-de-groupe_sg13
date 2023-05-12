import React from "react";
import "./Modal.css"


const Modal =(props)=>{
    const action = props.setShow;
    return (
        <div className={`modal ${props.show ? `show`:``}`} onClick={()=>{action(false)}}>
            <div className="modal-content" onClick={(e)=>{e.stopPropagation()}}>
                <div className="modal-header">
                    <h1 className="modal-title">are you sure</h1>
                </div>
                <div className="modal-body">
                    your vote is " {props.value} "
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={props.handelSubmit} >yes</button >
                    <button className="button" onClick={()=>action(false)} >no</button >
                </div>
            </div>
        </div>
    )
}

export default Modal;