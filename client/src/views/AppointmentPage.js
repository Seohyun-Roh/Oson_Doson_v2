import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Button, withStyles } from '@material-ui/core';
import axios from 'axios';

import MenuBar from '../components/MenuBar';
import Calendar from '../components/Calendar';
import AnimalLoad from '../components/AnimalLoad';
import HospitalLoad from '../components/HospitalLoad';

const styles = theme => ({
    loginForm: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginRight:'40px',
        paddingRight:'10px',
        '& h2':{
            margin:'0 0 30px 0'
        }
    },
    pageContainer:{
        display:'grid',
        placeItems:'center',
        height:'83vh',
        backgroundColor:'#eff0f2'
    },
    loginFormBox:{
        width:'85%',
        maxWidth:'900px',
        height:'75%',
        maxHeight:'800px',
        display:'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridColumnGap: '20px',
        boxShadow:'27px 43px 43px -26px rgb(89 89 89 / 39%)',
        backgroundColor:'#ffffff',
        borderRadius:'6px'
    },
    logo:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:'20px',
        '& img':{
            width:'35vw',
            height:'35vw',
            maxWidth:'400px',
            maxHeight:'400px',
        }
    },
    btnLogin:{
        width:'30%',
        fontSize:'15px',
        textAlign:'center',
        textDecoration:'none',
        fontFamily: 'Noto Sans KR',
        height:'30px',
        display:'inline-block',
        border:'none',
        borderRadius:'4px',
        backgroundColor:'#d9d9d9',
        '&:hover':{
            cursor:'pointer',
            backgroundColor:'#ffc000'
        },
        transition:'0.3s ease'
    }
});

class AppointmentPage extends Component {

    constructor(props){
        super(props);
        const { cookies } = props;
        this.state = {
            loginUser: cookies.get('loginUser'),
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            min: 0,
            dateTime: '',
            selectedAnimal: '',
            selectedHospital: '',
            animal_num: 0,
            h_num: 0
        }
    }

    getDateTime = (year, month, day, hour, min) => {
        this.setState({
            year: year,
            month: month,
            day: day,
            hour: hour,
            min: min
        });
        setTimeout(() => {
            this.convertDate();
        }, 1);
    }

    getSelectedAnimalName = (name) => {
        this.setState({
            selectedAnimal: name
        });
        console.log(name)
    }

    getSelectedHospital = (name) => {
        this.setState({
            selectedHospital: name
        });
        console.log(name)
    }

    convertDate = () => {
        let newDate = new Date(
            Date.UTC(
            this.state.year,
            this.state.month,
            this.state.day,
            this.state.hour,
            this.state.min));

        let result = JSON.stringify(newDate);
        result=result.substring(1,17).replace('T', ' ');
        this.setState({
            dateTime: result
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        
        if(this.state.dateTime === ''){
            alert("날짜, 시간을 선택해주세요.");
        } else{
            axios.post('/api/animals/animal_num', 
            { animal_name: this.state.selectedAnimal })
            .then((response) => {
                this.setState({
                    animal_num: response.data[0].animal_num
                })
            })
            setTimeout(() => {
                axios.post('/api/hospitals/h_num', 
                { h_name: this.state.selectedHospital })
                .then((response) => {
                    this.setState({
                        h_num: response.data[0].h_num
                    })
                })
            }, 10);
            setTimeout(() => {
                axios.post('/api/appointment',
                {
                    date_time: this.state.dateTime,
                    id: this.state.loginUser,
                    animal_num: this.state.animal_num,
                    h_num: this.state.h_num
                })
                .then((response) => {
                    alert(response.data.message);
                    this.props.history.push('/');
                })
            }, 1000);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <MenuBar />
                <div className={classes.pageContainer}>
                    <div className={classes.loginFormBox}>
                        <div className={classes.logo}>
                            <img src='http://placedog.net/400/400' alt='logo' />
                        </div>
                        <div className={classes.loginForm}>
                            <h2>진료 예약</h2>
                            <Calendar getDateTime={this.getDateTime}/>
                            <AnimalLoad getSelectedAnimalName={this.getSelectedAnimalName}/>
                            <HospitalLoad getSelectedHospital={this.getSelectedHospital}/>
                            <button className={classes.btnLogin} onClick={this.handleFormSubmit}>예약하기</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withCookies(withStyles(styles)(AppointmentPage));