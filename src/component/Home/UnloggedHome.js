import React, { useState } from 'react';
import { postSubject } from '../../actions/subjects';
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

    return (
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label style={{color: 'white'}}>Token</Form.Label>
                <Form.Control name="token" value={values.name} onChange={handleChange} placeholder="Token" />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
        </Form>
  </div>
)
}
export default UnloggedHome;