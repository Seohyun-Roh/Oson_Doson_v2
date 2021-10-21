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
                <TableCell>{this.props.chart_num}</TableCell>
                <TableCell>{this.props.chart_date}</TableCell>
                <TableCell>{this.props.chart_details}</TableCell>
                <TableCell>{this.state.h_name}</TableCell>
                <TableCell>{this.props.classify ? '접종' : '진료'}</TableCell>
            </TableRow>
        );
    }
}

export default Appointment;