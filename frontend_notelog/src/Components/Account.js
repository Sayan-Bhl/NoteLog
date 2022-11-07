import React,{useContext,useEffect} from 'react';
import './Account.css';
import NoteContext from '../Context/NoteContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const context=useContext(NoteContext);
    const navigate = useNavigate();
    const { getAccount} = context;
    const {account}=context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAccount();
        } else {
            navigate("/login")
        }
    })
    return (
        <div>
            <div className="card mx-auto" id="account">
                <div className="card-bod p-5">
                    <div style={{marginBottom:'50px'}}>
                        <h4>Account details</h4>
                    </div>
                    <div className='py-1 my-3 mx-auto'>
                        <p className='name'>Name</p>
                        <p className='detail'>{account.name}</p>
                    </div>
                    <div className='py-1 my-3 mx-auto'>
                        <p className='name'>Email Address</p>
                        <p className='detail'>{account.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
