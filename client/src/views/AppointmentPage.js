import React, { Component } from 'react'
import MenuBar from '../components/MenuBar';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

class AppointmentPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedDate: null,
            selectedTime: null,
            checkedB: false
        };
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
        console.log(this.state.selectedDate)
    }

    handleTimeChange = (time) => {
        this.setState({ selectedTime: time });
        console.log(this.state.selectedDate)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <MenuBar />
                진료 내역 확인 페이지
                <div>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <TimePicker
                        keyboard="true" placeholder="24 hours"
                        clearable
                        ampm={false}
                        label="24 hours"
                        value={this.state.selectedTime}
                        onChange={this.handleTimeChange}
                    />
                    <DatePicker
                        keyboard="true" placeholder="MM/DD/YYYY" format={"MM/DD/YYYY"}
                        value={this.state.selectedDate}
                        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                        onChange={this.handleDateChange}
                        disableopenonenter="true"
                        animateYearScrolling={false}
                        autoOk={true}
                        clearable
                        />
                    <p>{JSON.stringify(this.state.selectedDate)}</p>
                    <p>{JSON.stringify(this.state.selectedTime)}</p>
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        )
    }
}


export default AppointmentPage;