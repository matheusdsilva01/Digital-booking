import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/context';
import logo from '../../assets/pictures/logo.svg';
import menu from '../../assets/icons/header-átomo-menu.svg';
import facebook from '../../assets/icons/facebook.svg';
import instagram from '../../assets/icons/ig.svg';
import twitter from '../../assets/icons/twitter.svg';
import linkedin from '../../assets/icons/linkedin.svg';
import './index.scss';

const Header = () => {
    const { handleLogout, logado } = useContext(Context)
    const [initials, setInitials] = useState('');
    const [isVisible, setisVisible] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
            setInitials((user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()));
        } else {
            setInitials('');
        }
    }, [logado]);

    const toggleHamburger = () => {
        setisVisible(!isVisible)
    }

    return (
        <>
            <header className="d-flex align-items-center justify-content-between sticky-top">
                <div className="d-flex ">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <h1 className="align-items-end" >Sinta-se em casa</h1>
                </div>
                {initials ?
                    <div className={user.role === 'ADMIN' ? "registrado admin" : 'registrado'}>
                        {user.role === 'ADMIN' ? <Link to='/criacaoProdutos' className='admin-create-product'>Criar produto</Link> : ''}
                        <div id="icon">{initials}</div>
                        <p>
                            Olá,<br />
                            <span>{`${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
                             ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`}</span>
                        </p>
                        <button id="logout" onClick={() => (handleLogout())}>X</button>
                    </div>
                    :
                    <div className='navigation'>
                        <ul>
                            {location.pathname === '/register' ?
                                '' : <Link to='/register' >Criar conta</Link>}
                            {location.pathname === '/login' ?
                                '' : <Link to='/login' >Iniciar sessão</Link>}
                        </ul>
                    </div>}
                <button onClick={toggleHamburger} id="btn-mobile" className="hamburger">
                    <img src={menu} className={`burger burger1${isVisible ? "-open" : ''}`} />
                </button>
                <div className={`modal${isVisible ? "-active" : ""}`}>
                    <div className="part-1">
                        <button onClick={toggleHamburger} id="btn-mobile" className="m-3 hamburger">X</button>
                        {initials ?
                            <div className='details-user'>
                                <div id='icon'>{initials.toUpperCase()}</div>
                                <p>Olá, <br /><span>{user.firstName} {user.lastName}</span></p>
                            </div> :
                            <h2>MENU</h2>}
                    </div>
                    {initials ?
                        <>
                            {user.role === 'ADMIN' ? <p><Link onClick={toggleHamburger} to='/criacaoProdutos' className='admin-create-product'>Criar produto</Link></p> : ''}
                            <nav className='logout'>
                                <p>Deseja <span onClick={() => (handleLogout())}>encerrar a sessão</span>?</p>
                                <div id="linha-horizontal" />
                            </nav> </> :
                        <nav>
                            {location.pathname === "/register" ?
                                '' : <p><Link to="/register" onClick={toggleHamburger}>Criar conta</Link></p>}
                            {location.pathname === "/login" || location.pathname === "/register" ? '' : <div id="linha-horizontal" />}
                            {location.pathname === "/login" ?
                                '' : <p><Link to="/login" onClick={toggleHamburger}>Fazer login</Link></p>}
                        </nav>}
                    <section className="bottom d-flex justify-content-end ">
                        <ul className="d-flex ">
                            <li><img src={facebook} alt="facebook" srcSet="" /></li>
                            <li><img src={linkedin} alt="linkedin" srcSet="" /></li>
                            <li><img src={twitter} alt="twitter" srcSet="" /></li>
                            <li><img src={instagram} alt="instagram" srcSet="" /></li>
                        </ul>
                    </section>
                </div>
            </header>
        </>
    )
}

export default Header;