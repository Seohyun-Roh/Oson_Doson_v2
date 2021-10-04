import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function ( SpecificComponent, option, adminRoute = null){
    //option
    //null:아무나 출입이 가능한 페이지
    //true: 로그인한 유저만 출입 가능한 페이지
    //false: 로그인한 유저는 출입 불가능한 페이지
    
    //adminRoute: admin만 들어갈 수 있게 하고싶으면 true 넘겨주기
    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                //로그인하지 않은 상태
                if(!response.payload.isAuth){
                    if(option) {
                        props.history.push('/login')
                    }
                } else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        //admin이 아니면 메인 화면으로 이동
                        props.history.push('/')
                    } else{
                        if(option === false){
                            //로그인한 유저는 출입 불가능한 페이지
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }


    return AuthenticationCheck
}