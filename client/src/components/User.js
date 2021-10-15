import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UserDelete from './UserDelete';

class User extends React.Component{
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birth}</TableCell>
                <TableCell>{this.props.userid}</TableCell>
                <TableCell>{this.props.userpw}</TableCell>
                <TableCell><UserDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /></TableCell>
            </TableRow>
        );
    }
}

export default User;