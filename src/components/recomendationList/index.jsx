import { useState, useEffect } from "react";
import { Row, Card, CardGroup } from "react-bootstrap";
import { MdRoom, MdWifi, MdPool } from "react-icons/md";
import StarRating from "../avaliationStars";
import api from '../../services/index';
import Classification from "../classification";
import FavoriteHeart from "../favoriteHeart";
import { useNavigate } from "react-router-dom"
import React from 'react'
import LocationMapModal from "../locationMapModal";
import './index.scss'

const RecomendationList = () => {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([{
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
            }
        ],
        "characteristics": [
            {
                "id": null,
                "name": "icon",
                "icon": ""
            },
            {
                "id": null,
                "name": "icon",
                "icon": ""
            },
            {
                "id": null,
                "name": "icon",
                "icon": ""
            },
            {
                "id": null,
                "name": "icon",
                "icon": ""
            },
        ]
    }]);


    useEffect(() => {
        api.get(`/products?size=8`).then(response => {
            setProdutos(response.data.content);
        })
    }, []);

    const getCoverImage = (images, name) => {
        let url = "";
        images.map(image => {
            if (image.title === name) {
                url = image.url;
            }
        })
        return url;
    }

    return (
        <>
            <section className="">
                <h3 className="my-3 ms-5 fw-bold ">Recomendações</h3>
                <section className="justify-content-center d-flex flex-wrap">
                    {produtos.map((item, i) => (

                        <Card item={item} key={item.id} className="shadow rounded m-3 p-0 d-flex flex-md-row justify-content-md-center w-100" style={{ maxWidth: '40rem' }}>

                            <Card.Body className="m-0 p-0 d-flex position-relative" style={{ height: "300px" }}>
                                <Card.Img className="img" style={{ width: '335px', objectFit: "cover" }} src={getCoverImage(item.images, item.name)} />
                                <FavoriteHeart />
                            </Card.Body>

                            <Card.Body className="p-3 my-auto">

                                <Card.Body className="d-flex flex-row justify-content-sm-between w-100 mb-2 p-0">
                                    <Card.Title className="mb- fw-bold">
                                        <Card.Subtitle className="mb-1 d-flex flex-row align-items-center fw-bold" style={{ fontSize: '12px' }}>
                                            {item.category.title}
                                            <StarRating />
                                        </Card.Subtitle>
                                        {item.name}
                                    </Card.Title>
                                    <Classification />
                                </Card.Body>

                                <Card.Text className="mb-0 ">
                                    <MdRoom className="me-1" />
                                    {item.city.name}
                                    <LocationMapModal />
                                </Card.Text>
                                {item.characteristics.map((c, index) => {

                                    return (
                                        <Card.Img key={index} className="mx-1" src={c.icon} alt={c.name} style={{ width: '15px' }} />
                                    )
                                })}
                                <Card.Text className="mt-2 mt-sm-3" style={{ fontSize: '10px' }}>
                                    {item.description.substring(0, 100)}
                                    <a className="ms-1" href={`/produto/${item.id}`} style={{ color: '#1DBEB4' }}>mais...</a>
                                </Card.Text>
                                <Card.Link className="btn mt-sm-4 text-decoration-none text-light fw-bold w-100" style={{ backgroundColor: '#1DBEB4', border: '#1DBEB4' }} onClick={() => navigate(`/produto/${item.id}`)} >Ver Mais</Card.Link>

                            </Card.Body>
                        </Card>

                    ))}
                </section>
            </section>
        </>
    )
}

export default RecomendationList;
