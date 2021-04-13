import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function Modal({ show, onClose, children }) {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
      };

    const modalContent = show ? (
        <div className="absolute inset-0 flex justify-center align-center bg-black bg-opacity-50 p-8">
            <div className="bg-white w-screen sm:max-w-sm flex-grow-0 rounded-md p-4">
                <div className="flex justify-end text-2xl">
                    <button onClick={handleCloseClick}>X</button>
                </div>
                <div className="pt-3">{ children }</div>
            </div>
            
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent, 
            document.getElementById("modal-root")
        );
      } else {
        return null;
      }    
  
}

export default Modal;