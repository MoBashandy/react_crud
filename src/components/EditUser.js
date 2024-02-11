import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
function EditUser() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const {id} = useParams();
    useEffect(()=>{
        getUser();
    }, [id]);

    function getUser(){
        axios.get(`http://localhost/react_crud/api/user/${id}`).then(function(responce){
            console.log(responce.data);
            setInputs(responce.data);
        }) ;
    }
    const handleChange =(event)=>{
        const name =event.target.name;
        const value =event.target.value;
        setInputs({...inputs, [name]: value});
    };

    const handleSubmit =(event)=>{
        event.preventDefault();
        axios.put(`http://localhost/react_crud/api/user/${id}/edit`,inputs).then(function(responce){
            console.log(responce.data);
            navigate('/');
        }) ;

    };
    return(
        <React.Fragment>
            <div className="container">
                <h1>Edit Users</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <label>Name :</label>
                                </th>
                                <td>
                                    <input value={inputs.name || ''} type="text" name="name" onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>Email :</label>
                                </th>
                                <td>
                                    <input value={inputs.email || ''} type="text" name="email" onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>Mobile :</label>
                                </th>
                                <td>
                                    <input value={inputs.mobile || ''} type="text" name="mobile" onChange={handleChange}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <button>Save</button>
                </form>
            </div>
        </React.Fragment>
    );

}

export default EditUser;