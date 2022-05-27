import { Stack } from "react-bootstrap";
import React, { Component } from 'react';

const Classification = () => {

    return (
        <>
           <Stack className="d-flex align-items-start justify-content-end w-25">
               <div className="flex-column justify-content-center">
                <h5 className="text-center text-light rounded bg-dark w-50 mx-auto my-0">8</h5>
                <p className="text-center fw-bold my-0" style={{fontSize: '10px'}}>Muito Bom</p>
               </div>
           </Stack>   
        </>
    )
}

export default Classification;