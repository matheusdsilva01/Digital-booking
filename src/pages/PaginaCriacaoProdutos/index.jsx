import React, { useEffect, useState } from "react";
import { Form, FormGroup, FormLabel, FormControl, FormText, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services";
import { setLoading, removeLoading } from '../../components/functions/loading';
import './index.scss';

const CriacaoProdutos = () => {
    const [categories, setCategories] = useState([]);
    const [city, setCities] = useState([]);
    const [characteristics, setCharacteristics] = useState([]);
    const [form, setForm] = useState({
        "cancellationPolicy": "",
        "healthAndSafety": "",
        "rules": "",
        "name": "",
        "latitude": "",
        "longitude": "",
        "description": "",
        "categoryId": "",
        "cityId": "",
        "image": [],
        "characteristics": []
    });

    useEffect(() => {
        api.get("categories").then(response => {
            setCategories(response.data);
        });
        api.get("cities").then(response => {
            setCities(response.data);
        });
        api.get("characteristics").then(response => {
            setCharacteristics(response.data);
        })
    }, [])

    const handleChange = (e) => {
        document.getElementsByName(e.target.name)[0].classList.remove('is-invalid');
        setForm({
            ...form, [e.target.name]: e.target.value
        })
        if (e.target.name === "categoryId") {
            setForm({
                ...form, [e.target.name]: parseInt(e.target.value)
            })
        }
    }

    const validate = () => {
        function valid() {
            let retorno;
            if (form.name === "") {
                document.getElementsByName("name")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (form.categoryId === "") {
                document.getElementsByName("categoryId")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (form.description.length < 10) {
                document.getElementsByName("description")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (form.cityId === "") {
                document.getElementsByName("cityId")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (form.image.length === 0) {
                document.getElementsByName("image")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (form.characteristics.length === 0) {
                document.getElementsByName("characteristics")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (form.latitude === "") {
                document.getElementsByName("latitude")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (form.longitude === "") {
                document.getElementsByName("longitude")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (form.rules === "") {
                document.getElementsByName("rules")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (form.cancellationPolicy === "") {
                document.getElementsByName("cancellationPolicy")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (form.healthAndSafety === "") {
                document.getElementsByName("healthAndSafety")[0].classList.add("is-invalid");
                retorno = false;
            }
            if (retorno === false) {
                return false;
            } else {
                return true;
            }
        }
        if (valid()) {
            return true
        } else {
            toast.error("Preencha todos os campos corretamente!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    }

    const sendData = async (e) => {
        setLoading(e.nativeEvent.submitter);
        parseLatAndLongForFloat(form.latitude, form.longitude);
        setCityIdInt();
        var formData = new FormData();
        // gerar um formData com os dados do form para post
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("categoryId", form.categoryId);
        formData.append("cityId", form.cityId);
        formData.append("latitude", form.latitude);
        formData.append("longitude", form.longitude);
        formData.append("characteristics", form.characteristics);;
        for (let i = 0; i < form.image.length; i++) {
            // if para pegar a primeira imagem do array e setar o name com o form.name
            if (i === 0) {
                formData.append("images", form.image[i], form.name + ".jpg");
            } else {
                formData.append("images", form.image[i])
            }
        }
        formData.append("rules", form.rules);
        formData.append("healthAndSafety", form.healthAndSafety);
        formData.append("cancellationPolicy", form.cancellationPolicy);
        // enviar o formData para o backend
        await api.post("/products/add", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            removeLoading(e.nativeEvent.submitter)
            toast.success("Produto cadastrado com sucesso!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        }).catch(error => {
            removeLoading(e.nativeEvent.submitter)
            toast.error("Erro ao cadastrar produto!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        })
        removeLoading(e.nativeEvent.submitter)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        if (validate()) {
            sendData(e)
        }
    }
    const setImages = (e) => {
        setForm({
            ...form, "image": e.target.files
        })
    }

    const handleCheck = (e) => {
        if (e.target.checked) {
            setForm({
                ...form, "characteristics": [...form.characteristics, parseInt(e.target.value)]
            })
        } else {
            setForm({
                ...form, "characteristics": form.characteristics.filter(item => item !== e.target.value)
            })
        }
    }

    const parseLatAndLongForFloat = (latitude, longitude) => {
        const lat = parseFloat(latitude);
        const long = parseFloat(longitude);
        setForm({
            ...form,
            latitude: lat,
            longitude: long
        })
    }

    const setCityIdInt = () => {
        const cityId = parseInt(form.cityId);
        setForm({
            ...form,
            "cityId": cityId
        })
    }

    return (
        <>
            <div className="p-3 d-flex align-items-center" style={{ backgroundColor: "#545776" }}>
                <h2 className="ms-5 my-0 fw-bold text-light">Administração de Produtos</h2>
                <div className="ms-auto me-5 text-light">
                    <a href="/">voltar</a>
                </div>
            </div>

            <div className="p-5">
                <h4 className="fw-bold">Criar Produto</h4>

                <Form onSubmit={e => handleSubmit(e)}>
                    <div className="d-flex div-nome-cat">
                        <FormGroup className="me-2 p-1 w-100">
                            <FormLabel>Nome do Produto</FormLabel>
                            <FormControl className="shadow" type="text" maxLength={255} placeholder="Digite o Nome do Produto" name="name" onChange={e => handleChange(e)} />
                        </FormGroup>

                        <FormGroup className=" p-1 w-100 cat-prod ">
                            <FormLabel>Categoria do Produto</FormLabel>
                            <Form.Select
                                className="shadow"
                                name="categoryId"
                                onChange={e => handleChange(e)}
                            >
                                <option>selecione uma categoria</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.title}</option>
                                ))}
                            </Form.Select>
                        </FormGroup>
                    </div>

                    <FormGroup className="my-3 p-1">
                        <FormLabel>Descrição do Produto</FormLabel>
                        <FormControl maxLength={1000} className="shadow" as="textarea" rows={5} placeholder="Digite a Descrição do Produto" name="description" onChange={e => handleChange(e)} />
                    </FormGroup>

                    <FormGroup className="my-3 p-1">
                        <FormLabel>Cidade</FormLabel>
                        <Form.Select className="shadow" name="cityId" onChange={e => handleChange(e)}>
                            <option>selecione uma cidade</option>
                            {city.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </Form.Select>
                    </FormGroup>

                    <div className="my-3 p-1 d-flex justify-content-between lat-long">
                        <FormGroup className="w-100 mb-3">
                            <FormLabel>Latitude</FormLabel>
                            <FormControl className="shadow" type="text" placeholder="Digite a Latitude" name="latitude" onChange={e => handleChange(e)} />
                        </FormGroup>
                        <FormGroup className="w-100">
                            <FormLabel>Longitude</FormLabel>
                            <FormControl className="shadow" type="text" placeholder="Digite a Longitude" name="longitude" onChange={e => handleChange(e)} />
                        </FormGroup>
                    </div>

                    <div className="d-flex">
                        {/* setCharacteristics por um checkBox */}
                        <FormGroup className="p-1 w-100">
                            <FormLabel>Caracteristicas do Produto</FormLabel>
                            {characteristics.map(characteristic => (
                                <Form.Check key={characteristic.id} type="checkbox" name='characteristics' label={characteristic.name} value={characteristic.id} onChange={e => handleCheck(e)} />
                            ))}
                        </FormGroup>
                    </div>

                    <div className="d-flex">
                        <FormGroup className="my-3 me-2 p-1 w-100">
                            <FormLabel>Imagens do Produto</FormLabel>
                            <FormControl className="shadow" type="file" accept="image/png, image/jpeg" multiple={true} placeholder="coloque aqui o link da imagem do produto" name="image" onChange={e => setImages(e)} />
                        </FormGroup>
                    </div>

                    <FormGroup className="my-3 p-1">
                        <FormLabel>Politicas do Produto</FormLabel>
                        <div className="d-flex justify-content-between politicas" >
                            <div className="mx-2 w-100">
                                <FormText>Regras da Casa</FormText>
                                <FormControl maxLength={1000} className="shadow" as="textarea" rows={7} name="rules" onChange={e => handleChange(e)} />
                            </div>
                            <div className="mx-2 w-100">
                                <FormText>Saúde e Segurança</FormText>
                                <FormControl maxLength={1000} className="shadow" as="textarea" rows={7} name="healthAndSafety" onChange={e => handleChange(e)} />
                            </div>
                            <div className="mx-2 w-100">
                                <FormText>Politicas de Cancelamento</FormText>
                                <FormControl maxLength={1000} className="shadow" as="textarea" rows={7} name="cancellationPolicy" onChange={e => handleChange(e)} />
                            </div>
                        </div>
                    </FormGroup>

                    <Button className="mt-5 fw-bold d-flex justify-content-center align-items-center" type="submit" style={{ backgroundColor: '#1DBEB4', border: '#1DBEB4' }}>Criar</Button>

                </Form>
            </div>
        </>
    )
};

export default CriacaoProdutos;