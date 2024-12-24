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
              <span>ShopMe</span>
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
            <img src="./profile.jpg" alt="admin-picture" />
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
                <span>Home</span>
              </a>
            </li>
            <li onClick={() => handleNavigation('products')} className={visibleSection === 'products' ? 'side-nav__active' : ''}>
              <a href="#">
                <svg>
                  <use xlinkHref='./icons.svg#icon-package'></use>
                </svg>
                <span>Products</span>
              </a>
            </li>
            <li onClick={() => handleNavigation('users')} className={visibleSection === 'users' ? 'side-nav__active' : ''}>
              <a href="#">
                <svg>
                  <use xlinkHref='./icons.svg#icon-user'></use>
                </svg>
                <span>Users</span>
              </a>
            </li>
            <li onClick={() => handleNavigation('orders')} className={visibleSection === 'orders' ? 'side-nav__active' : ''}>
              <a href="#">
                <svg>
                  <use xlinkHref='./icons.svg#icon-briefcase'></use>
                </svg>
                <span>Orders</span>
              </a>
            </li>
            <li onClick={() => handleNavigation('account')} className={visibleSection === 'account' ? 'side-nav__active' : ''}>
              <a href="#">
                <svg>
                  <use xlinkHref='./icons.svg#icon-settings'></use>
                </svg>
                <span>Account</span>
              </a>
            </li>
          </ul>
        </nav>

        <footer className="footer">
          <p>&copy; ShopMe Corporation by Anish Manandhar</p>
        </footer>
      </div>

      <main className="main main-content">
        {visibleSection === 'main' && <div className="header"><h1>Welcome back, Anish 😎</h1></div>}
        {visibleSection === 'products' && <section className="product-section"><h1>Products</h1></section>}
        {visibleSection === 'users' && <section className="user-section"><h1>Users</h1></section>}
        {visibleSection === 'orders' && <section className="order-section"><h1>Orders</h1></section>}
        {visibleSection === 'account' && <section className="account-section"><h1>Account</h1></section>}
      </main>
    </div>
  );
};

export default AdminDashboard;
