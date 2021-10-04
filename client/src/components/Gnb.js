import React from 'react'
import axios from 'axios'

function Gnb(props){

    return (
        <ul className="user-gnb">
            <li>
                <a href="#none" className="user-gnb__book">진료예약</a>
            </li>
            <li>
                <a href="#none" className="user-gnb__bookcheck">예약조회</a>
            </li>
            <li>
                <a href="#none" className="user-gnb__treatment">진료내역조회</a>
            </li>
            <li>
                <a href="#none" className="user-gnb__info">회원정보</a>
            </li>
            <li>
                <button onClick={onClickHandler}>로그아웃</button>
            </li>
        </ul>
    )
}

export default Gnb;