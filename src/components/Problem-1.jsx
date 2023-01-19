import React, {useState} from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
const Problem1 = () => {

    const [show, setShow] = useState('all');
    const[users, setUsers]= useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/allUsers/${show}`)
            .then(res => res.json())
        .then(data=>setUsers(data))
   },[show])
  

    const handleClick = (val) => {
        console.log(show)
 
        setShow(val)
     
    }
  
console.log(users)

    

    const handelSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const status = form.status.value;
  
        const user = {
            name,
            status
        }

        fetch('http://localhost:5000/users', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
           },
            body: JSON.stringify(user)
            
        })
            .then(res => res.json())
            .then(data => {
                alert('user save successfully')
                form.reset()
            })
       
    }
        
    
    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form
                        
                        onSubmit={handelSubmit}
                        className="row gy-2 gx-3 align-items-center mb-4">
                        
                        <div className="col-auto">
                            <input type="text" name="name" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="col-auto">
                            <input type="text" name='status' className="form-control" placeholder="Status"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('Active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('Completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            {
                                users?.map(user => <tr>
                                
                                    <td>{user?.name}</td>
                                    <td>{ user?.status}</td>

                                </tr>)
                            }
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;