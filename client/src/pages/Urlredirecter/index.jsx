import * as React from 'react';
import { useParams } from 'react-router-dom';
import { REDIRECT_URL } from '../../api/shorten';
import axios from 'axios';
import { Link, Box, Typography, Button } from '@mui/material';

const UrlRedirector = () => {
    const params = useParams();
    const [error , setError] = React.useState('')
    React.useEffect(() => {
        axios
        .get(REDIRECT_URL+params.id)
        .then(res => {
            window.location.href = res.data.data.long_url;

        })
        .catch(err => {
            setError(err);
            console.log('Error:', err);
        }) 

    },[])
  return (
    <>
    {error && (
    <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.paper',
        color: 'text.primary',
        }}
    >
        <Box maxWidth="md" px={4} py={12}>
        <Typography variant="h1" sx={{ fontSize: '8xl', fontWeight: 'bold' , textAlign:'center' }}>
            404
        </Typography>
        <Typography variant="body1" sx={{ mt: 4, color: 'text.secondary' , textAlign:'center'}}>
            Oops, the page you are looking for could not be found.
        </Typography>
        <Button
            variant="contained"
            disableElevation
            sx={{
            mt: 8,
            borderRadius: 'md',
            backgroundColor: 'primary.main',
            color: 'text.primary',
            '&:hover': { backgroundColor: 'primary.dark' },
            '&:focus': {
                outline: 0,
                ring: 2,
                ringColor: 'primary.contrastText',
                ringOffset: 2,
            },
            }}
            href="/"
        >
            Go back home
        </Button>
        </Box>
    </Box>
    )}
    </>
  )
}

export default UrlRedirector