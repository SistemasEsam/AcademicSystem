import React from 'react';
import './Card.css';

interface CardProps {
  image: string;  // Debe ser string si son rutas
  title: string;
  href: string;
}

const Card: React.FC<CardProps> = ({ image, title, href }) => { // Corregir destructuring
  return (
    <a 
      className="card card-animation" 
      href={href}
      role="button"
      aria-label={`Ir a ${title}`}
    >
      <div className="overlay"></div>
      
      <div className="circle">
        <img 
          src={image}  // Usar la prop image como src
          className="svg-icon" 
          aria-hidden="true"
          alt={`Icono ${title}`}
        />
      </div>
       <div className='titletext'>
      <h1 className='h1text'>{title}</h1>
       </div>
    </a>
  );
};

export default Card;
