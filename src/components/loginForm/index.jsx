import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/context";
import { toast } from 'react-toastify';
import api from "../../services/index";
import visible from '../../assets/icons/visible.svg';
import invisible from '../../assets/icons/invisible.svg';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import { setLoading, removeLoading } from "../functions/loading";
import React from "react";

const LoginForm = () => {
    const navigate = useNavigate();
    const { handleLogin, logado } = useContext(Context);
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (logado) {
            navigate('/');
        }
    })

    const notify = () => toast.error(' Preencha os campos corretamente!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    /** Salva os dados fornecidos pelo usuario */
    const fillLogin = (event) => {
        let { name, value } = event.target
        setLogin({ ...login, [name]: value })
    }

    /** Faz a verificação dos campos preenchidos pelo usuario*/
    const verifyInputs = () => {
        let inputs = document.getElementsByTagName('input');
        // Verifica se todos os campos estão preenchidos
        for (let e of inputs) {
            // verificação de vazio ou com pseudoelemento :invalid
            if (e.value === '') {
                e.classList.add('error');
                e.focus();
                // Retorna mensagem de erro
                e.nextSibling.style.visibility = 'visible'
                e.nextSibling.textContent = 'Este campo é obrigatorio'
                return false
            } else {
                // Retira mensagem de erro
                e.classList.remove('error');
                if (e.type === 'password') {
                    e.nextSibling.textContent = 'Este campo é obrigatorio'
                }
                e.nextSibling.style.visibility = 'hidden'
            }

            // Verifica o tamanho da senha
            if (e.type === 'password' && e.value.length >= 1 && e.value.length < 6) {
                e.classList.add('error');
                e.focus();
                // Retorna mensagem de erro
                e.nextSibling.style.visibility = 'visible'
                e.nextSibling.textContent = 'A senha deve ter no mínimo 6 caracteres'
                return false
            }
        }

        if (inputs[0].value === '' || inputs[1].value === '') {
            notify();
            return false
        }
        return true
    }
    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    /** Ofetua o login do usuario e o redireciona para a home */
    const loginUser = async (e) => {
        e.preventDefault()
        const submit = e.nativeEvent.submitter;
        let { email, password } = login;
        setLoading(submit)
        if (verifyInputs()) {
            setLoading(submit)
            await api.post('/users/login', { email, password }).then(response => {
                let token = response.data.accessToken;
                let user = parseJwt(token);
                handleLogin(token, user);
                navigate('/', { replace: true });
                removeLoading(submit)
            }).catch(error => {
                removeLoading(submit);
                toast.error("Por favor, tente novamente, suas credenciais são inválidas", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
        }
        removeLoading(submit)
    }


    /** Função faz a troca da visibilidade da senha */
    const togleVisibilityPassword = () => {
        let input = document.getElementById('password');
        let visible = document.getElementById('visible');
        let invisible = document.getElementById('invisible');
        if (input.type === 'password') {
            input.type = 'text'
            visible.style.display = 'none'
            invisible.style.display = 'flex'
        }
        else {
            input.type = 'password'
            visible.style.display = 'flex'
            invisible.style.display = 'none'
        }
    }




    return (
        <>
            <div id="LoginForm">
                <div className="container-loginForm">
                    <h1 className="title">Iniciar Sessão</h1>
                    <form onSubmit={(e) => loginUser(e)}>
                        <div className="user-details">
                            <div className="input-box email">
                                <label htmlFor="email" >Email</label>
                                <input onChange={fillLogin} name="email" type="email" id="email" />
                                <span className="error-message d-flex justify-content-end" >Este campo é obrigatorio</span>
                            </div>

                            <div className="input-box password">
                                <label htmlFor="password" >Senha</label>
                                <input id="password" onChange={fillLogin} name="password" type="password" />
                                <span className="error-message d-flex justify-content-end">Este campo é obrigatorio</span>
                                <a onClick={togleVisibilityPassword}>
                                    <img id="visible" src={visible} alt="password-visible" />
                                    <img id="invisible" src={invisible} alt="password-invisible" />
                                </a>
                            </div>
                        </div>
                        <div className="button" >
                            <button type="submit">Entrar</button>
                        </div>
                    </form>
                    <p>Ainda não tem conta? <Link to='/register'>Registre-se</Link></p>
                </div>
            </div>
        </>
    )
}

export default LoginForm;