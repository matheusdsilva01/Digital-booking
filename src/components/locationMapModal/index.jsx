import { useState } from "react"
import { Modal, Card } from "react-bootstrap";
import React from 'react';
import Map from "../locationMap/Map";

const LocationMapModal = () => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    return (
        <>
            <Card.Link className="btn text-decoration-none fw-bold" style={{ color: '#1DBEB4' }} onClick={handleShow}>Mostrar no Mapa</Card.Link>

            <Modal className="rounded-3" size="lg" autoFocus={true} show={show} onHide={handleClose} animation={false}>

                <Map />

            </Modal>
        </>
    )
}

export default LocationMapModal