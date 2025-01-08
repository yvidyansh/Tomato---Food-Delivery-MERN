import React, { useContext } from 'react'
import './Navbar.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
    const [menu, setmenu] = useState('home');
    const { getTotal,token,settoken } = useContext(StoreContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        settoken("");
        navigate('/')
    }
    const handleScroll = (sectionId) => {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMenuClick = (menuName, sectionId) => {
        setmenu(menuName);
        if (window.location.pathname !== '/') {
            navigate('/');
        }
        setTimeout(() => handleScroll(sectionId), 100); // Allow time for navigation
    };

    return (
        <div className='navbar'>
            <Link to='/' onClick={() => setmenu('home')}>
                <img src={assets.logo} alt='logo' className='logo' />
            </Link>
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setmenu('home')} className={menu === 'home' ? 'active' : ''}>
                    home
                </Link>
                <p onClick={() => handleMenuClick('menu', '#ExploreMenu')} className={menu === 'menu' ? 'active' : ''}>
                    menu
                </p>
                <p onClick={() => handleMenuClick('mobile-app', '#app-download')} className={menu === 'mobile-app' ? 'active' : ''}>
                    mobile-app
                </p>
                <p onClick={() => handleMenuClick('contact-us', '#footer')} className={menu === 'contact-us' ? 'active' : ''}>
                    contact us
                </p>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt='search-icon' />
                <div className='navbar-basket-icon'>
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt='basket-icon' />
                    </Link>
                    <div className={getTotal() ? 'dot' : ''}></div>
                </div>
                {!token?<button onClick={() => setShowLogin(true)}>sign in</button> 
                : <div className='navbar-profile'>
                    <img src={assets.profile_icon}/>
                    <ul className='nav-profile-dropdown'>
                        <li onClick={() => navigate("/myorders")}><img src={assets.bag_icon}/><p>Orders</p></li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
                    </ul>
                </div>}
                
            </div>
        </div>
    );
};

export default Navbar;
