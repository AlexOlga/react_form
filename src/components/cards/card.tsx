import React from 'react';
import { IFormFilds } from '../../types';
import './card.css';
type CardProps = {
  user: IFormFilds;
};

function Card(props: CardProps) {
  const { name, age, email, gender, country, foto } = props.user;

  return (
    <div className="card-wrapper">
      <h3 className="user_name">{name}</h3>
      <img
        className="user_img"
        src={foto ? foto : `./no-image.jpg`}
        alt="Character image"
      />
      <div className="text-contener">
        <p>
          <span className="user_category">Age: </span> {age}
        </p>
        <p>
          <span className="user_category">Gender: </span>
          {gender}
        </p>
        <p>
          <span className="user_category">Country: </span>
          {country}
        </p>
        <p>
          <span className="user_category">email: </span>
          {email}
        </p>
      </div>
    </div>
  );
}
export default Card;
