import React from 'react'
import { Table } from 'reactstrap';

export default function UserTable(props) {
    let rows = [];
    for (let index = 0; index < props.data.length; index++) {
        rows.push(<><td>{index + 1}</td>
            <td>{props.data[index].fname}</td>
            <td>{props.data[index].lname}</td>
            <td>{props.data[index].email}</td>
            <td>{props.data[index].mobileno}</td>
            <td>{props.data[index].gender}</td>
            <td>{props.data[index].language.join(',')}</td>
            <td>{props.data[index].city}</td>
            <td className="actiontd" onClick={(evt) => props.deleteclicked(index)}>Delete</td></>);
    }

    return (
        <div>
            <Table responsive bordered size="sm">
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, ind) => {
                        return <tr key={ind}>{item}</tr>;
                    })}
                    {/* {props.data.map((item, ind) => {
                        return <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{item.fname}</td>
                            <td>{item.lname}</td>
                            <td>{item.email}</td>
                            <td>{item.mobileno}</td>
                            <td>{item.gender}</td>
                            <td>{item.language.join(',')}</td>
                            <td>{item.city}</td>
                            <td className="actiontd" onClick={(evt) => props.deleteclicked(ind)}>Delete</td>
                        </tr>;
                    })} */}
                </tbody>
            </Table>
        </div>
    )
}
