import React, { useState } from 'react';
import './style/admin.css';


const AdminDashboard: React.FC = () => {
  const [visibleSection, setVisibleSection] = useState('main');

  const handleNavigation = (section: string) => {
    setVisibleSection(section);
  };

  return (
    <div>
      <input type="checkbox" className="menu__checkbox" id="sideview-crawl" />
      <div className="side-view">
        <nav className="admin-view__menu">
          <div className="admin-view__header">
            <h3 className="company-name">
              <span>Dashboard Docente</span>
            </h3>
            <div className="menu-icon">
              <label htmlFor="sideview-crawl" className="menu-bar">
                <svg>
                  <use xlinkHref='./icons.svg#icon-menu'></use>
                </svg>
              </label>
            </div>
          </div>
          <div className="user-profile">
            
            <h3 className="admin-name">
              <span>Admin name</span>
            </h3>
          </div>
          <ul className="side-nav">
            <li onClick={() => handleNavigation('main')} className={visibleSection === 'main' ? 'side-nav__active' : ''}>
              <a href="#">
                <svg>
                  <use xlinkHref='./icons.svg#icon-home'></use>
                </svg>
                <span>Perfil</span>
              </a>
            </li>
            <li onClick={() => handleNavigation('products')} className={visibleSection === 'products' ? 'side-nav__active' : ''}>
              <a href="#">
                <svg>
                  <use xlinkHref='./icons.svg#icon-package'></use>
                </svg>
                <span>Postulaciones Disponibles</span>
              </a>
            </li>
            <li onClick={() => handleNavigation('users')} className={visibleSection === 'users' ? 'side-nav__active' : ''}>
              <a href="#">
                <svg>
                  <use xlinkHref='./icons.svg#icon-user'></use>
                </svg>
                <span>Mis postulaciones</span>
              </a>
            </li>
          
          </ul>
        </nav>
      </div>

      <main className="main main-content">
        {visibleSection === 'main' && 
        <div className="header">
          <h1>Welcome back, Anish 😎</h1>
          
          </div>}




        {visibleSection === 'products' && <section className="product-section">
          <h1>Products</h1>
          </section>}


        {visibleSection === 'users' && <section className="user-section"><h1>Users</h1></section>}
 
      </main>
    </div>
    
  );
};

export default AdminDashboard;
