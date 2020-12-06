import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';

const UnloggedHome = () => {
  const [cookies, setCookie] = useCookies(['mln-astrodef']);
const formik = useFormik({
     initialValues: {
        token: ''
     },
  onSubmit: async (values) => {
    if (values.token === process.env.REACT_APP_TOKEN) {
       setCookie('mln-astrodef', values.token);
    }

    resetForm({});
     },
   });
  const {
    values,
    handleChange,
    handleSubmit,
    resetForm
  } = formik;

  return (<>
    <img style={{width: '10rem', height:'10rem', left: '50%', position:'fixed', transform: 'translate(-50%, 400%)'}}
      src="https://icons-for-free.com/iconfiles/png/512/color+cinema+icons+Astronaut-1320567850764192548.png"></img>
        <h2 style={{color:'white', left: '50%', position:'fixed', transform: 'translate(-50%, 500%)'}}>Welcome to the secret Mln's astro def app,</h2>
        <h2 style={{color:'white', left: '50%', position:'fixed', transform: 'translate(-50%, 600%)'}}>access is granted only to VIP astros.</h2>
        <h2 style={{color:'white', left: '50%', position:'fixed', transform: 'translate(-50%, 700%)'}}>Have you a token ?</h2>
        <div style={{width:'18rem',
  position: 'fixed',
  top: '50%',
  left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Control type="password" name="token" value={values.name} onChange={handleChange} placeholder="Token" />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit" style={{}}>
              Submit
            </Button>
        </Form>
  </div>
  </>
)
}
export default UnloggedHome;