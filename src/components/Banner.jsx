import React from 'react';
import bannerImage from '../assets/Banner.png';
import '../styles/theme.css';

export default function Banner() {
  return (
    <div className="banner-container">
      <img src={bannerImage} alt="BigBurger Banner" className="banner-img" />
    </div>
  );
}
