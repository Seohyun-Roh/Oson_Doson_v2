import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { NativeSelect, InputLabel, withStyles } from '@material-ui/core';
import axios from 'axios';

const styles = theme => ({
    item:{
        marginBottom: '20px',
        marginTop: '20px'
    }
});

class AnimalLoad extends Component {
    constructor(props){
        super(props);
        const { cookies } = props;
        this.state={
            loginUser: cookies.get('loginUser'),
            animalNameList: [],
            selectedAnimal: ''
        }
    }

    componentDidMount(){
        axios.post('/api/animals', { id: this.state.loginUser })
        .then((response) => {
            this.setState({
                animalNameList: response.data.map((res)=>res.animal_name)
            })
        })
        setTimeout(() => {
            if(this.state.selectedAnimal===''){
                this.setState({
                    selectedAnimal: this.state.animalNameList[0]
                })
                this.props.getSelectedAnimalName(this.state.selectedAnimal)
            }
        }, 100);
    }

    handleSelectChange = (e) => {
        this.setState({
            selectedAnimal: e.target.value
        })
        setTimeout(() => {
            this.props.getSelectedAnimalName(this.state.selectedAnimal);    
        }, 100);
        
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.item}>
                <InputLabel>동물 이름</InputLabel>
                <NativeSelect onChange={this.handleSelectChange}>
                    {
                    Object.values(this.state.animalNameList).map((list, idx) => (
                        <option key={idx} value={list}>{list}</option>
                    ))
                    }
                </NativeSelect>
            </div>
        )
    }
}

export default withCookies(withStyles(styles)(AnimalLoad));