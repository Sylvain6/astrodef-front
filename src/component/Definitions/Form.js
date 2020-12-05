import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import getSubjects from '../../actions/subjects';
import { postDefinition } from '../../actions/definitions';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const FormDef = () => {
  const [subjects, setSubjects] = useState(null);
  const [alert, setAlert] = useState('');
  const [variant, setVariant] = useState('success');
   const formik = useFormik({
     initialValues: {
        name: '',
        content: '',
        subject: ''
     },
     onSubmit: async (values) => {
       const response = await postDefinition(values);
        if (response.data) {
         setAlert(`Definition ${values.name} added`)
       } else {
         setVariant("danger");
         setAlert(`Definition ${values.name} not added : ${response.message}`);
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
  const fetchSubjects = async () => {
    const { data } = await getSubjects();
    setSubjects(data);
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      {subjects ?
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label style={{color: 'white'}}>Name</Form.Label>
                <Form.Control name="name" value={values.name} onChange={handleChange} placeholder="Definition" />
              </Form.Group>

            <Form.Group as={Col} controlId="formGridSubject">
              <Form.Label style={{color: 'white'}}>Subject</Form.Label>
              <Form.Control name="subject" as="select" defaultValue="" value={values.subject} onChange={handleChange}>
                <option key="lol" value="">Choose a subject</option>
                {subjects.map((subject, key) => <option key={key} value={subject.name}> {subject.name} </option>)}
              </Form.Control>
            </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridCOntent">
              <Form.Label style={{color: 'white'}}>Content</Form.Label>
              <Form.Control as="textarea" rows={3}
                  name="content"
                  placeholder="Lorem ipsum"
                  onChange={handleChange}
                  value={values.content} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div> : <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
      {alert && <Alert key="added" variant={variant}>
        {alert}
      </Alert>}
    </div >
  )
};

export default FormDef;