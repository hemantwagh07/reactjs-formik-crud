import React from 'react'
import { Table } from 'reactstrap';

export default function UserTable(props) {
    return (
        <div>
            <Table responsive striped bordered size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Gender</th>
                        <th>Language</th>
                        <th>Location</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item, ind) => {
                        return <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{item.fname}</td>
                            <td>{item.lname}</td>
                            <td>{item.email}</td>
                            <td>{item.mobileno}</td>
                            <td>{item.gender}</td>
                            <td>{item.language.join(',')}</td>
                            <td>{item.city}</td>
                            <td className="actiontd" onClick={(evt) => props.editclicked(ind)}>Edit</td>
                            <td className="actiontd" onClick={(evt) => props.deleteclicked(ind)}>Delete</td>
                        </tr>;
                    })}
                </tbody>
            </Table>
        </div>
    )
}
