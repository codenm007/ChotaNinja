import { useState } from 'react';
import {Button,Modal,Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode,faDownload } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode.react';
import ninjapic from "../ninja.png";
const QRCODE =  ({link}) =>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  // download QR code
  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }
  
    return (
      <>
         <Button variant="outline-dark" style={{marginLeft:"10px"}} onClick={handleShow}>
         Scan <FontAwesomeIcon icon={faQrcode} />
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title> Scan the Ninja QR </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className ="d-flex justify-content-center">
          <QRCode
         id="qrCodeEl"
         size={220}
         value={link}
         includeMargin
         imageSettings={{src:ninjapic, excavate:true}}
         />
         </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick = {()=>{downloadQRCode()}}>
            <FontAwesomeIcon icon={faDownload} />
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default QRCODE;