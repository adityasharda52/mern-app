import React,{ useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

function Update() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [age,setAge] = useState(0);
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    //getSingleUserData
    const deleteSingleUser = async()=>{
      const response = await fetch(`http://localhost:3000/${id}`)

      const result = await response.json();

      if(!response.ok){
        console.log(result.error);
        setError(result.error);
      }
      if(response.ok){
        setError("");
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      }
    }


    //Send updated data to backend
    const handleUpdate = async (e) =>{
    e.preventDefault();
    const updatedUser = { name, email, age };
    const response = await fetch(`http://localhost:3000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("EHy 2.0");
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      console.log(result);
      setError("");
      navigate("/all");
    }
  }
    useEffect(()=>{
      deleteSingleUser();
    },[])
  return (
    <>
            <div className='container my-2 text-center'><h1>Edit your Data</h1>
                {error && <div class='alert alert-danger'>{error}</div>}
                <div className='text-center'>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Age</label>
                            <input type="number" className="form-control" value={age} onChange={(e)=> setAge(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
  )
}

export default Update