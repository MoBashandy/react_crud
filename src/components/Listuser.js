import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Listuser() {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        getUsers();
    }, []);

    function getUsers(){
        axios.get('http://localhost/api/user/save').then(function(responce){
            console.log(responce.data);
            setUsers(responce.data);
        }) ;
    }
    
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-4">
                        <div>
                            <h5>Listuser</h5>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user,key) =>
                                    <tr key={key}>
                                        <td style={{marginRight:"20px",marginLeft:"20px"}}>{user.id}</td>
                                        <td style={{marginRight:"20px",marginLeft:"20px"}}>{user.name}</td>
                                        <td style={{marginRight:"20px",marginLeft:"20px"}}>{user.email}</td>
                                        <td style={{marginRight:"20px",marginLeft:"20px"}}>{user.mobile}</td>
                                        <td>
                                            <Link className="btn btn-primary" style={{marginRight:"10px",marginLeft:"10px"}} to={`/user/${user.id}/edit`}>Edit</Link>
                                            <button className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

}


export default Listuser;