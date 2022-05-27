import { useState } from "react"
import { Modal, Button } from "react-bootstrap";
import ProdutosCarrosel from "../produtosCarrosel";
import React from 'react';

const ProdutosModal = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    return (
        <>
            <a className="btn position-absolute end-0 bottom-0 text-light mb-3 me-3" style={{ backgroundColor: "#00000090" }} onClick={handleShow} >ver mais</a>

            <Modal className="" size="lg" autoFocus={true} show={show} onHide={handleClose} animation={false}>

                <ProdutosCarrosel />

            </Modal>
        </>
    )
}

export default ProdutosModal