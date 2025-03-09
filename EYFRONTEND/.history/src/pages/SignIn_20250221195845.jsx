import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SignIn() {
  return (
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add authentication logic here
        history.push('/dashboard');
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
    <div>SignIn</div>
  );
}
