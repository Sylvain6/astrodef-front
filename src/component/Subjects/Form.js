import React, { useState } from 'react';
import { postSubject } from '../../actions/subjects';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default () => {
   const formik = useFormik({
     initialValues: {
        name: ''
     },
     onSubmit: async (values) => {
       const response = await postSubject(values);
       setNewSubject(response.data.name);
       resetForm({});
     },
   });
  const {
    values,
    handleChange,
    handleSubmit,
    resetForm
  } = formik;
    const [newSubject, setNewSubject] = useState('');

    return (
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={values.name} onChange={handleChange} placeholder="Definition" />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
        </Form>
        {newSubject && <Button key="new" variant="primary" size="lg" style={{ margin: '15px' }}>
          {newSubject}
        </Button>}
  </div>
)};
