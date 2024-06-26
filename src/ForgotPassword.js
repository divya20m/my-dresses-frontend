import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppBar } from "./AppBar";

export function ForgotPassword({cartItems}) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
const navigate=useNavigate()
  const handleSendEmail = async () => {
    try {
      const response = await fetch('https://my-dresses-backend.onrender.com/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        console.log(data.resetLink);
        setError('');
      } else {
        setMessage('');
        setError(data.error || 'Failed to send email.');
      }
    } catch (error) {
      setMessage('');
      setError('An error occurred. Please try again.');
    }
  };

  

  return (
    <div className='form'>
      <div style={{position: "fixed", top: 0, left: 0, right: 0,padding:"1rem"}}><AppBar cartItems={cartItems}/></div>
      <h1 className='custom-heading'>Unlock Your Account Now!</h1>
      <div className="error-container">
      {message && <Typography style={{color:"green"}}>{message}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      </div>
      <form className="textbars" onSubmit={handleSendEmail}>
      <TextField
        id="outlined-basic-email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button color='secondary' variant='contained' onClick={handleSendEmail} color='secondary'>Send Reset Email</Button>
      </form>
      </div>
   
  );
}
