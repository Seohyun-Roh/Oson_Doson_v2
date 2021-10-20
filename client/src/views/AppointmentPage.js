import React, { Component } from 'react'
import MenuBar from '../components/MenuBar';
import Calendar from '../components/Calendar';
import AnimalLoad from '../components/AnimalLoad';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class AppointmentPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            dateTime: '',
            selectedAnimal:''
        }
    }

    getDateTime = (text) => {
        this.setState({
            dateTime: text
        });
    }

    getSelectedAnimalName = (name) => {
        this.setState({
            selectedAnimal: name
        });
        console.log(name)
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.dateTime)
        console.log(this.state.selectedAnimal)
    }

    render() {
        // const { classes } = this.props;
        return (
            <div>
                <MenuBar />
                진료 내역 확인 페이지
                <Calendar getDateTime={this.getDateTime}/>
                <AnimalLoad getSelectedAnimalName={this.getSelectedAnimalName}/>
                <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>예약하기</Button>
            </div>
        )
    }
}


export default AppointmentPage;