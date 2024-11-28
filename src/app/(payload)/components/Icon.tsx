'use client'
import React from 'react';
import './Logo.scss';
import IconHZG from '../assets/logo.svg'

export const Icon = () => {
    return (
        <div className="icon">
            <img
                src={IconHZG.src}
                alt='HospitalZG Logo' />
        </div>
    );
}

export default Icon