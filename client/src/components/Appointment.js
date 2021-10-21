import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import axios from 'axios';

class Appointment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animal_name:'',
            h_name:''
        }
    }

    componentDidMount(){
        axios.post('/api/animals/animal_name', {
            animal_num: this.props.animal_num
        })
        .then((response) => {
            this.setState({
                animal_name: response.data[0].animal_name
            })
        })
        
        axios.post('/api/hospitals/h_name', {
            h_num: this.props.h_num
        })
        .then((response) => {
            this.setState({
                h_name: response.data[0].h_name
            })
        })
    }

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.date_time}</TableCell>
                <TableCell>{this.state.animal_name}</TableCell>
                <TableCell>{this.state.h_name}</TableCell>
            </TableRow>
        );
    }
}

export default Appointment;