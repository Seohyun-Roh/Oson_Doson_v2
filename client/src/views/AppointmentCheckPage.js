import React, { Component } from 'react';
import axios from 'axios';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, withStyles } from '@material-ui/core';
import { withCookies } from 'react-cookie';

import MenuBar from '../components/MenuBar';
import Appointment from '../components/Appointment';

const styles = theme => ({
  pageContainer:{
    backgroundColor: '#eff0f2',
    height:'82vh'
  },
  root:{
    overflowX: 'auto',
    margin: '20px 70px 20px 70px'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  }
})

class AppointmentCheckPage extends Component {

    constructor(props){
        super(props);
        const { cookies } = props;
        this.state = {
          users: '',
          id: cookies.get('loginUser')
        }
    }

    componentDidMount() {
        setTimeout(() => {
            axios.post('/api/appointment/check', {
                id: this.state.id
            })
            .then((response) => {
                this.setState({
                    users: response.data
                })
            })
            .catch(err => console.log(err))
        }, 10);        
    }


    render() {
        const filteredComponents = (data) => {
            return data.map((c) => {
                return <Appointment key={c.date_time} date_time={c.date_time} animal_num={c.animal_num} h_num={c.h_num}/>
            })
        }

        const {classes}=this.props;
        const cellList = ["예약 날짜", "동물 이름", "병원 이름"];

        return (
          <div>
            <MenuBar />
            <div className={classes.pageContainer}>
              <div className={classes.root}>
                <h1>예약 조회 🐾</h1>
                <Paper>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        {cellList.map(c => {
                          return <TableCell className={classes.tableHead}>{c}</TableCell>
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users ? 
                            filteredComponents(this.state.users) :
                        <TableRow>
                            <TableCell colSpan="6" align="center"></TableCell>
                        </TableRow> }
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            </div>
          </div>
        );
    }
}


export default withCookies(withStyles(styles)(AppointmentCheckPage));