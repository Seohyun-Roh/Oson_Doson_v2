import React, { Component } from 'react'
import MenuBar from '../components/MenuBar';
import Calendar from '../components/Calendar';
import Button from '@material-ui/core/Button';

class AppointmentPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            dateTime: ''
        }
    }

    getDateTime = (text) => {
        this.setState({
            dateTime: text
        });
    }

    handleSubmit = () => {
        console.log(this.state.dateTime)
    }

    render() {
        // const { classes } = this.props;
        return (
            <div>
                <MenuBar />
                진료 내역 확인 페이지
                <Calendar getDateTime={this.getDateTime}/>
                <Button onClick={this.handleSubmit}>예약하기</Button>
            </div>
        )
    }
}


export default AppointmentPage;