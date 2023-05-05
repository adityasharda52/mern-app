import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Read() {
  function click(){
    console.log("HEhdf");
  }
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function getData() {
    const responce = await fetch("http://localhost:3000");
    const result = await responce.json();

    if (!responce.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (responce.ok) {
      setData(result);
    }
  }
  const handleDelete = async (id)=>{
    const response = await fetch(`http://localhost:3000/${id}`,{
      method:'DELETE'
    });
    const result = await response.json();
    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    if(response.ok){
      setError("Deleted Scessfully");
      setTimeout(()=>{
        setError("");
        getData();
      },1000);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <>
      <div className='container my-2'>
      {error && <div class='alert alert-danger'>{error}</div>}
        <h2 className='text-center'> All Data</h2>
        <div className='row'>
          {data?.map((ele) => (
            <div key = {ele._id} className='col-3'>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">{ele.name}</h5>
                  <h6 className="card-text text-center">{ele.email}</h6>
                  <p className='text-center'>{ele.age}</p>
                  <a href="#" className="card-link text-center" onClick={()=>handleDelete(ele._id)}>Delete</a>
                  <Link onClick={() => click()} to={`/${ele._id}`} className="card-link text-center">Edit</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Read