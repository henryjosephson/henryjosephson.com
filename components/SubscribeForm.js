import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    try {
      const response = await fetch('https://lnj1jz9jq1.execute-api.us-east-2.amazonaws.com/prod/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      setStatus('Please check your email to confirm.');
      setEmail('');
    } catch (error) {
      setStatus('Error: Please try again.');
      console.error('Error:', error);
    }
  };
  
  return (
    <div style={{ textAlign: 'center' }}>
      <p>
        If you like my posts, get new ones emailed to you:
        <span className="email-control">
          <input
            type="email"
            className="email-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="subscribe-button" onClick={handleSubmit}>
            subscribe
          </button>
          <span className="status-message" style={{ display: status ? 'inline-block' : 'none' }}>
            {status}
          </span>
        </span>
      </p>
    </div>
  );
}