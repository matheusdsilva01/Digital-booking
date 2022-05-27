import Arrow from '../../assets/icons/arrow.svg';
import React from 'react';
import './index.scss'

export default function Pagination({ page, onChange }) {
    return (
        <div className="pagination-container">
            <div className="pagination-box">
                <button
                    className="pagination-button"
                    disabled={page.first}
                    onClick={() => onChange(page.number - 1)}
                >
                    <img src={Arrow} className='arrow' />
                </button>
                <p>{`${page.number + 1} de ${page.totalPages}`}</p>
                <button
                    className="pagination-button"
                    disabled={page.last}
                    onClick={() => onChange(page.number + 1)}
                >
                    <img src={Arrow} className='arrow flip-horizontal' />
                </button>
            </div>
        </div>
    )
}
