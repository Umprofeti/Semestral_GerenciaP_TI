'use client'
import React from 'react';
import './Logo.scss';
import LogoHZG from '../assets/logo.svg'

 export const Logo = () => {
    return (
        <div className="logo">
            <img
                src={LogoHZG.src}
                alt='HospitalZG Logo' />
        </div>
    );
}

export default Logo