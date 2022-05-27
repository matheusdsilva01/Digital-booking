import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DatePicker from 'react-datepicker';
import api from '../../services/index';
import { Context } from "../../context/context";
import { toast } from 'react-toastify';
import StarRating from "../../components/avaliationStars";
import Classification from "../../components/classification";
import ProdutosModal from "../../components/produtosModal";
import React from 'react'
import Map from "../../components/locationMap/Map";
import './calendar.scss'
import 'react-datepicker/dist/react-datepicker.css';

const PaginaProdutos = () => {
    const { logado } = useContext(Context);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [largeWidth, setLargeWidth] = useState(false);
    const [resevations, setResevations] = useState([])
    const navigate = useNavigate()
    const { id } = useParams();
    const [produtos, setProdutos] = useState({
        "id": null,
        "name": "",
        "score": 0.0,
        "description": "",
        "rules": "",
        "healthAndSafety": "",
        "cancellationPolicy": "",
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
        ],
    });

    useEffect(() => {
        const get = async () => {
            await api.get(`/products/${id}`).then(response => {
                setProdutos(response.data);
            })
            await api.get(`/reservations/productId=${id}`).then(response => {
                setResevations(response.data);
            })
        }
        get()
    }, [id]);

    useEffect(() => {
        window.innerWidth > 559 ? setLargeWidth(true) : setLargeWidth(false);
        const handleResize = () => {
            if (window.innerWidth > 559) {
                setLargeWidth(true);
            } else {
                setLargeWidth(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const userLogged = () => {
        if (!logado) {
            notifyErrorReservaLogin()
            navigate('/login')
        } else {
            navigate(`/produto/${id}/reserva`)
        }
    }

    const notifyErrorReservaLogin = () => toast.error('Para fazer uma reserva você precisa estar logado', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
    });

    // calendar
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const locale = {
        localize: {
            day: (n) => days[n],
            month: (n) => months[n],
        },
        formatLong: {
            date: () => 'mm/dd/yyyy',
        },
    };

    const setValuesDate = (dates) => {
        let [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const generateNewDate = (date) => {
        let day;
        let month;
        let year;
        day = new Date(date).getUTCDate();
        month = new Date(date).getUTCMonth();
        year = new Date(date).getUTCFullYear();
        return new Date(year, month, day);
    }
    const generateExcludeDatesInterval = () => {
        let dates = [{
            start: new Date(),
            end: new Date()
        }];
        resevations.map(reserva => {
            dates.push({
                start: generateNewDate(reserva.checkinDate),
                end: generateNewDate(reserva.checkoutDate)
            })
        })
        return dates;
    }
    return (
        <>
            {/* Bloco de Titulo */}
            <div className="p-1 d-flex align-items-center" style={{ backgroundColor: "#545776" }}>
                <div>
                    <h6 className="ms-5 mt-2 mb-0 text-light" >{produtos.category.title}</h6>
                    <h2 className="ms-5 my-0 fw-bold text-light">{produtos.name}</h2>
                </div>
                <div className="ms-auto me-5 text-light">
                    <Link to={-1}>voltar</Link>
                </div>
            </div>

            {/* Bloco de Endereço */}
            <div className="p-1 d-flex align-items-around" style={{ backgroundColor: "#bfbfbf" }}>
                <div className="mx-5 d-flex align-items-center">

                    <StarRating />

                </div>
                <div className="ms-auto mx-5 d-flex align-items-center">
                    <Classification />
                </div>
            </div>

            {/* Bloco de Imagem */}
            <div className="p-2 border d-flex align-items-center justify-content-center mw-100">


                <div className="p-1 w-50" >
                    <img key={produtos.images[0].id} className="img-fluid rounded-3" src={produtos.images[0].url} alt="" srcSet="" />
                </div>

                <div className="w-25" >
                    <div className="p-1 w-100">
                        <img key={produtos.images[1].id} className="img-fluid rounded-3" src={produtos.images[1].url} alt="" srcSet="" />
                    </div>
                    <div className="p-1 w-100">
                        <img key={produtos.images[2].id} className="img-fluid rounded-3" src={produtos.images[2].url} alt="" srcSet="" />
                    </div>
                </div>

                <div className="w-25" >
                    <div className="p-1 w-100">
                        <img key={produtos.images[3].id} className="img-fluid rounded-3" src={produtos.images[3].url} alt="" srcSet="" />
                    </div>
                    <div className="p-1 w-100 position-relative">
                        <ProdutosModal />
                        <img key={produtos.images[4].id} className="img-fluid rounded-3" src={produtos.images[4].url} alt="" srcSet="" />
                    </div>
                </div>

            </div>

            {/* Bloco de Descrição */}
            <div className="p-3" >
                <div className="p-1 rounded-3" style={{ backgroundColor: "#bfbfbf" }}>
                    <h2 className="ms-3" >Descrição</h2>
                </div>
                <div className="ms-5 p-1">
                    <p>{produtos.description}</p>
                </div>
            </div>

            {/* Bloco de Caracteristicas do Produto */}
            <div className="p-3 rounded-3">
                <div className="p-1 rounded-3" style={{ backgroundColor: "#bfbfbf" }}>
                    <h2 className="ms-3" style={{ backgroundColor: "#bfbfbf" }}>Caracteristicas</h2>
                </div>
                <div className="my-3 d-flex justify-content-around">
                    {produtos.characteristics.map(characteristic => (
                        <div className="p-1 d-flex flex-row" key={characteristic.id}>
                            <img className="me-1" src={characteristic.icon} alt={characteristic.name} style={{ width: '20px' }} />
                            <p className="ms-1">{characteristic.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Calendario */}
            <section className="container-reserva">
                <h1>Datas disponiveis</h1>
                <div className="container-calendar">
                    <DatePicker
                        inline
                        id="calendar"
                        locale={locale}
                        formatWeekDay={(locale) => locale[0]}
                        selected={startDate}
                        onChange={setValuesDate}
                        shouldCloseOnSelect={false}
                        excludeDateIntervals={generateExcludeDatesInterval()}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date() - 2}
                        dateFormat="dd/MM/yyyy"
                        selectsRange={true}
                        monthsShown={largeWidth ? 2 : 1}
                    />
                    <div className="content-calendar">
                        <h3>Adicione as datas da sua viagem para obter preço exatos</h3>
                        <button className="btn border-3 w-100 p-2 text-light fw-bold" style={{ backgroundColor: '#1DBEB4', border: '#1DBEB4' }} onClick={() => userLogged()}>
                            Iniciar reserva</button>
                    </div>
                </div>
            </section>

            {/* Mapa */}

            <div className="mb-2 p-3">
                <div className=" my-3 p-1 rounded-3" style={{ backgroundColor: "#bfbfbf" }}>
                    <h2 className="ms-3 " style={{ backgroundColor: "#bfbfbf" }}>Onde você vai estar</h2>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <Map product={produtos} />
                </div>
            </div>

            {/* Bloco Politicas do Produto */}
            <div className="p-3">
                <div className="p-1 rounded-3" style={{ backgroundColor: "#bfbfbf" }}>
                    <h2 className="ms-3 " style={{ backgroundColor: "#bfbfbf" }}>Politicas da acomodação</h2>
                </div>
                <div className="p-4 d-flex flex-column justify-content-between">
                    <div>
                        <h5>Regras da Casa</h5>
                        <p>{produtos.rules}</p>
                    </div>

                    <div>
                        <h5>Saúde e Segurança</h5>
                        <p> {produtos.healthAndSafety} </p>
                    </div>

                    <div>
                        <h5>Politicas de Cancelamento</h5>
                        <p> {produtos.cancellationPolicy} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaginaProdutos;