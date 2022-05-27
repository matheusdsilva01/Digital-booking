import { Card, CardImg, Form } from "react-bootstrap";
import StarRating from "../../components/avaliationStars";
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setLoading, removeLoading } from "../functions/loading";
import api from "../../services";

export const ReservationDetailCard = ({ reservation, verifyTime, verifyDates }) => {
    const { id } = useParams();
    const [reserva, setReserva] = useState(reservation);
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
    const setDateForPost = (date) => {
        if (date !== null) {
            let day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
            let month = date.getMonth().toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            let year = date.getFullYear();
            return year + '-' + month + '-' + day;
        }
    }
    const setCheckintimeForPost = (checkIn) => {
        if (checkIn !== null) {
            let check = checkIn + ':00'
            return check.toString();
        }
    }
    const initialReservation = {
        "checkinTime": setCheckintimeForPost(reserva.checkinTime),
        "checkinDate": setDateForPost(reserva.checkinDate),
        "checkoutDate": setDateForPost(reserva.checkoutDate),
        "customer": reserva.customer,
        "product": reserva.product
    }

    useEffect(() => {
        setReserva(reservation);
    }, [reservation])

    useEffect(() => {
        api.get(`/products/${id}`).then(response => {
            setProdutos(response.data);
        })
    }, [id]);


    const generateDate = (date) => {
        let day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
        let month = date.getMonth().toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let year = date.getFullYear();
        return day + '/' + month + '/' + year;
    }

    const postReserva = async (e) => {
        e.preventDefault();
        setLoading(e.nativeEvent.submitter);
        if (verifyTime() && verifyDates()) {
            await api.post('reservations/book', initialReservation).then(response => {
                removeLoading(e.nativeEvent.submitter);
                toast.success('Reserva realizada com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            }).catch(error => {
                if (error.response.status === 500) {
                    toast.error('Reserva já marcada no intervalo de data selecionada!');
                }
                removeLoading(e.nativeEvent.submitter);
            })
        }
        removeLoading(e.nativeEvent.submitter);
    }

    return (
        <>
            <Card className="w-md-50 h-100 mx-sm-3">
                <Card.Title className="p-1 text-center ">
                    Detalhes da Reserva
                </Card.Title>

                <CardImg src={produtos.images[0].url} />

                <Card.Body>
                    <Card.Subtitle className="mb-1 d-flex flex-row align-items-center fw-bold" style={{ fontSize: '12px' }}>{produtos.category.title}</Card.Subtitle>
                    <Card.Title className="fw-bold">{produtos.name}</Card.Title>
                    <StarRating />
                </Card.Body>
                <Form onSubmit={(e) => postReserva(e)}>
                    <Card.Subtitle className="">{produtos.city.name}</Card.Subtitle>
                    <Card.Text className="my-2">{`Check-in: ${reserva.checkinDate ? generateDate(reserva.checkinDate) : '__/__/__'}`}</Card.Text>
                    <Card.Text className="">{`Check-out: ${reserva.checkoutDate ? generateDate(reserva.checkoutDate) : '__/__/__'}`}</Card.Text>
                    <button className="mt-4 border btn w-100 decoration-none d-flex justify-content-center align-items-center" style={{ backgroundColor: '#1DBEB4', border: '#1DBEB4' }}>Confirmar Reserva</button>
                </Form>
            </Card>
        </>
    )
}