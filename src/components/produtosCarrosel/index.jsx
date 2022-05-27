import { } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/index';
import React from 'react'

const ProdutosCarrosel = () => {

    const [imagem, setImagem] = useState(null);

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
            <div className="p-3 " style={{ opacity: '2' }}>
                <img src={imagem !== null ? imagem : produtos.images[0].url} alt="" className="src img-fluid rouded-3" />
            </div>
            <div className="mx-3 mb-3 d-flex justify-content-center">
                <a className="m-2 border-none w-100 rounded-3" onClick={() => setImagem(produtos.images[0].url)}>
                    <img src={produtos.images[0].url} alt="" className="src img-fluid" />
                </a>

                <a className="m-2 border-none w-100 rounded-3" onClick={() => setImagem(produtos.images[1].url)}>
                    <img src={produtos.images[1].url} alt="" className="src img-fluid" />
                </a>

                <a className="m-2 border-none w-100 rounded-3" onClick={() => setImagem(produtos.images[2].url)}>
                    <img src={produtos.images[2].url} alt="" className="src img-fluid" />
                </a>

                <a className="m-2 border-none w-100 rounded-3" onClick={() => setImagem(produtos.images[3].url)}>
                    <img src={produtos.images[3].url} alt="" className="src img-fluid" />
                </a>

                <a className="m-2 border-none w-100 rounded-3" onClick={() => setImagem(produtos.images[4].url)}>
                    <img src={produtos.images[4].url} alt="" className="src img-fluid" />
                </a>
            </div>
        </>
    )
}

export default ProdutosCarrosel