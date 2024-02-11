import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateUser() {
    const navigate = useNavigate({});
    const [inputs, setInputs] = useState({});
    const handleChange =(event)=>{
        const name =event.target.name;
        const value =event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };
    const handleSubmit =(event)=>{
        event.preventDefault();
        axios.post('http://localhost/api/user/save',inputs).then(function(responce){
            console.log(responce.data);
            navigate('/');
        }) ;
    }
    return(
        <React.Fragment>
            <div className="container">
                <h1>List Users</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <label>Name :</label>
                                </th>
                                <td>
                                    <input type="text" name="name" onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>Email :</label>
                                </th>
                                <td>
                                    <input type="text" name="email" onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>Mobile :</label>
                                </th>
                                <td>
                                    <input type="text" name="mobile" onChange={handleChange}/>
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


export default CreateUser;