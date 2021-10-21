import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, Typography } from '@material-ui/core';

class UserDelete extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteUser(id){
        // api/users/7 id가 7인 고객 데이터를 삭제
        const url='/api/users/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh(); //삭제 이후 새롭게 바뀐 고객 목록 출력
    }

    render(){
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteUser(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default UserDelete;