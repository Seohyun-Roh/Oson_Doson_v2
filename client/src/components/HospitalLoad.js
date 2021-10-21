import React, { Component } from 'react';
import { NativeSelect, InputLabel } from '@material-ui/core';
import axios from 'axios';

class AnimalLoad extends Component {
    constructor(props){
        super(props);
        this.state={
            hospitalList: [],
            selectedHospital: ''
        }
    }

    componentDidMount(){
        axios.get('/api/hospitals')
        .then((response) => {
            this.setState({
                hospitalList: response.data.map((res)=>res.h_name)
            })
        })
        .catch(err => console.log(err))
        setTimeout(() => {
            if(this.state.selectedHospital===''){
                this.setState({
                    selectedHospital: this.state.hospitalList[0]
                })
                this.props.getSelectedHospital(this.state.selectedHospital)
            }
        }, 100);
    }

    handleSelectChange = (e) => {
        this.setState({
            selectedHospital: e.target.value
        })
        setTimeout(() => {
            this.props.getSelectedHospital(this.state.selectedHospital);    
        }, 100);
        
    }

    render() {
        return (
            <div>
                <InputLabel>병원 이름</InputLabel>
                <NativeSelect onChange={this.handleSelectChange}>
                    {
                    this.state.hospitalList.map((list, idx) => (
                        <option key={idx} value={list}>{list}</option>
                    ))
                    }
                </NativeSelect>
            </div>
        )
    }
}

export default AnimalLoad;