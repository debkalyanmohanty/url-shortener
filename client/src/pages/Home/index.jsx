import * as React from 'react';
import { Input, Button, Typography } from '@mui/material';
import { SHORTEN_URL } from '../../api/shorten';
import { CLIENT_URL } from '../../api/client';
import axios from 'axios'
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f3f4f6',
  },
  formContainer: {
    backgroundColor: '#fff', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '32px',
    width: '100%',
    maxWidth: '400px', 
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#374151',
  },
  description: {
    color: '#6b7280', 
    marginBottom: '1.5rem',
  },
  input: {
    flex: 1,
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    outline: 'none',
    transition: 'border-color 0.3s',
    '&:focus': {
      borderColor: '#2563eb', 
    },
  },
  button: {
    padding: '12px',
    borderRadius: '4px',
    backgroundColor: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#1e4bb5', 
    },
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
};
ReactGA.initialize('YOUR_TRACKING_ID');

function Home() {

    const [url , setUrl] = React.useState('');
    const [error, setError] = React.useState('');
    const [code , setCode] = React.useState('');


    const handleShorten = (e) => {
        e.preventDefault();
        if (!url.trim()) {
          setError('Please enter a URL.');
          return;
        }
        const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
        if (!validUrl) {
          setError('Please enter a valid URL.');
          return;
        }
        setError('');
        try {
          axios
          .post(SHORTEN_URL, { long_url: url })
          .then(res => {
            setCode(res.data.data.short_code);
            ReactGA.event({
              category: 'User',
              action: CLIENT_URL+res.data.data.short_code,
              label: 'URL Shortened',
            });
          })
          .catch(err => {
            if(err.response.data.message === "Url Already Shortened"){
                setCode(err.response.data.data.short_code)
            }
            console.log(err.response.data.message);
          })
        } catch (error) {
          console.error('Error shortening URL:', error);
        }
      };

    const handleChange = (e) => {
        setUrl(e.target.value);
        setError('');
      };
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>URL Shortener</h1>
        <p style={styles.description}>Enter a long URL and we'll shorten it for you.</p>
        <form style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Input
            style={styles.input}
            placeholder="Enter a long URL"
            type="text"
            onChange={handleChange}
            value={url}
          />
          <Button
            style={styles.button}
            type="submit"
            variant="contained"
            onClick={handleShorten}
          >
            Shorten
          </Button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      {
        code && (
            <div style={{
                marginTop: '10px'
            }}>
            <Typography variant='subtitle2'>The Shortened Url Is</Typography>
            <Link to={CLIENT_URL+code}>{CLIENT_URL+code}</Link>
            </div>
        )
      }
        
      </div>
    </div>
  );
}

export default Home;
