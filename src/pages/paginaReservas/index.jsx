import api from '../../services/index';
import React, { useState, useEffect } from 'react';
import { ReservationForm } from "../../components/reservationForm";
import { useParams, useNavigate } from 'react-router-dom';
import './calendar.scss';

const PaginaReserva = () => {
    const [produtos, setProdutos] = useState({
        "id": null,
        "name": "",
        "description": "",
        "category": {
            "id": null,
            "title": "",
            "description": "",
            "imageUrl": "",
            "totalProducts": null
        },
        "city": {
            "id": null,
            "name": "",
            "country": ""
        },
        "images": [
            {
                "id": null,
                "title": "",
                "url": ""
            },
            {
                "id": null,
                "title": "",
                "url": ""
            },
            {
                "id": null,
                "title": "",
                "url": ""
            },
            {
                "id": null,
                "title": "",
                "url": ""
            },
            {
                "id": null,
                "title": "",
                "url": ""
            }
        ],
        "characteristics": [
            {
                "id": null,
                "name": "",
                "icon": ""
            }
        ]
    });
    const { id } = useParams();


    useEffect(() => {
        api.get(`/products/${id}`).then(response => {
            setProdutos(response.data);
        })
    }, [id]);


    return (
        <>
            {/* Bloco de Titulo */}
            <div className="p-1 d-flex align-items-center" style={{ backgroundColor: "#545776" }}>
                <div>
                    <h6 className="ms-5 mt-2 mb-0 text-light" >{produtos.category.title}</h6>
                    <h2 className="ms-5 my-0 fw-bold text-light">{produtos.name}</h2>
                </div>
                <div className="ms-auto me-5 text-light">
                    <a href={`/produto/${id}`}>voltar</a>
                </div>
            </div>

            <div className="mt-5 d-lg-flex justify-content-center">

                {/* Formulario */}
                <ReservationForm product={produtos} />
            </div>
        </>
    )
}

export default PaginaReserva;