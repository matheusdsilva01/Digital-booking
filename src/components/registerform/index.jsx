import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import api from "../../services/index";
import visible from '../../assets/icons/visible.svg';
import invisible from '../../assets/icons/invisible.svg';
import { setLoading, removeLoading } from "../functions/loading";
import './index.scss';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [userForRegister, setUserForRegister] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const notify = () => toast.error(' Preencha os campos corretamente!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });
    const notifyError = () => toast.error(' Email já cadastrado!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });

    const registerConfirm = () => {
        toast.success('Você se registrou com sucesso', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
                navigate('/');
            }
        })
    }

    const fillUserForRegister = (e) => {
        setUserForRegister({
            ...userForRegister,
            [e.target.name]: e.target.value
        })
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

    /** Função que faz o cadastro do usuário */
    const registerUser = async (e) => {
        e.preventDefault();
        const submit = e.nativeEvent.submitter;
        setLoading(submit);
        if (verifyInputs()) {
            await api.post('/users/customers/register', userForRegister)
                .then(response => {
                    registerConfirm()
                    resetInputs();
                    removeLoading(submit);
                }).catch(error => {
                    removeLoading(submit);
                    notifyError()
                })
        }
        removeLoading(submit);
    }

    const verifyInputs = () => {
        let inputs = document.getElementsByTagName('input');
        // Verifica se todos os campos estão preenchidos
        function verify() {
            for (let e of inputs) {
                if (e.value === '') {
                    e.classList.add('error');
                    e.focus();
                    // Retorna mensagem de erro
                    e.nextSibling.style.visibility = 'visible';
                    e.nextSibling.textContent = 'Este campo é obrigatorio';
                    // Retira mensagem de erro
                    notify();
                    return false
                } else {
                    e.nextSibling.style.visibility = 'hidden';
                    e.classList.remove('error');
                }
                if ((e.id === 'password' || e.id === 'ConfirmarSenha') && e.value.length >= 1 && e.value.length < 8) {
                    e.classList.add('error');
                    e.focus();
                    // Retorna mensagem de erro
                    e.nextSibling.style.visibility = 'visible'
                    e.nextSibling.textContent = 'A senha deve ter no mínimo 8 caracteres'
                    notify();
                    return false
                }
            }
            if (inputs.ConfirmarSenha.value !== inputs.password.value) {
                inputs.ConfirmarSenha.classList.add('error');
                inputs.ConfirmarSenha.focus();
                // Retorna mensagem de erro
                inputs.ConfirmarSenha.nextSibling.style.visibility = 'visible'
                inputs.ConfirmarSenha.nextSibling.textContent = 'As senhas devem ser iguais'
                notify();
                return false
            }
            return true
        }
        return verify()
    }
    const resetInputs = () => {
        let inputs = document.getElementsByTagName('input');
        for (let e of inputs) {
            e.value = '';
            e.nextSibling.style.visibility = 'hidden';
            e.classList.remove('error');
        }
    }
    return (
        <>
            <div id="RegisterForm">
                <div className="container-form">
                    <h1 className="title">Criar conta</h1>
                    <form onSubmit={(e) => registerUser(e)}>
                        <section className="nome-sobrenome">
                            <div className="input-box name">
                                <label htmlFor="Nome" >Nome</label>
                                <input onChange={(e) => fillUserForRegister(e)} type="text" id="Nome" name="firstName" />
                                <span className="error-message d-flex justify-content-end">Este campo é obrigatorio</span>
                            </div>
                            <div className="input-box lastname">
                                <label htmlFor="Sobrenome" >Sobrenome</label>
                                <input type="text" id="Sobrenome" onChange={(e) => fillUserForRegister(e)} name="lastName" />
                                <span className="error-message d-flex justify-content-end">Este campo é obrigatorio</span>
                            </div>
                        </section>
                        <div className="input-box email" >
                            <label htmlFor="Email" >Email</label>
                            <input onChange={(e) => fillUserForRegister(e)} type="email" id="Email" name="email" />
                            <span className="error-message d-flex justify-content-end">Este campo é obrigatorio</span>
                        </div>
                        <div className="input-box password">
                            <label htmlFor="password" >Senha</label>
                            <input onChange={(e) => fillUserForRegister(e)} id="password" type="password" name="password" />
                            <span className="error-message d-flex justify-content-end">Este campo é obrigatorio</span>
                            <a onClick={togleVisibilityPassword}>
                                <img id="visible" src={visible} alt="password-visible" />
                                <img id="invisible" src={invisible} alt="password-invisible" />
                            </a>
                        </div>
                        <div className="input-box checkpass">
                            <label htmlFor="ConfirmarSenha" >Confirmar Senha</label>
                            <input type="password" id="ConfirmarSenha" name="confirm" />
                            <span className="error-message d-flex justify-content-end">Este campo é obrigatorio</span>
                        </div>
                        <div className="btn">
                            <button type="submit" >Criar conta</button>
                            <p>Já tem uma conta? <Link to="/login">Iniciar sessão</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterForm