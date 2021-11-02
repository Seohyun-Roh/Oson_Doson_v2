import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Button, withStyles } from '@material-ui/core';
import axios from 'axios';

import MenuBar from '../components/MenuBar';
import Calendar from '../components/Calendar';
import AnimalLoad from '../components/AnimalLoad';
import HospitalLoad from '../components/HospitalLoad';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItem: 'center',
        justifyContent: 'center',
        margin: '30px 30px 30px 30px'
    },
    button: {
        width:'20%'
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
                <div className={classes.root}>
                    <Calendar getDateTime={this.getDateTime}/>
                    <AnimalLoad getSelectedAnimalName={this.getSelectedAnimalName}/>
                    <HospitalLoad getSelectedHospital={this.getSelectedHospital}/>
                    <Button className={classes.button} variant="contained" color="primary" onClick={this.handleFormSubmit}>예약하기</Button>
                </div>
            </div>
        )
    }
}


export default withCookies(withStyles(styles)(AppointmentPage));