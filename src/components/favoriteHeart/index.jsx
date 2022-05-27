import "./style.scss"
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { Button } from "react-bootstrap";
import { useState } from "react";
import React, { Component } from 'react'

const FavoriteHeart = () => {
    const [favorite, setFavorite] = useState();

    return (
        <>
            {[...Array(1)].map((heart, i) => {
                const favoriteValue = i + 1;

                return (
                    <label className='position-absolute end-0 align-self-start m-2 me-4' key={i} value={heart}>
                        <input className='d-none' type='radio' name='favorite' value={favoriteValue} onClick={() => setFavorite(favoriteValue)} />
                        <AiFillHeart className="heart" color={favoriteValue <= favorite ? "red" : ""} size={25} />
                    </label>
                )
            })}


        </>
    )
}

export default FavoriteHeart;