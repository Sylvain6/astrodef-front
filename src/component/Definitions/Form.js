import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import getSubjects from '../../actions/subjects';
import { postDefinition } from '../../actions/definitions';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const FormDef = () => {
   const formik = useFormik({
     initialValues: {
        name: '',
        content: '',
        subject: ''
     },
     onSubmit: async (values) => {
       const response = await postDefinition(values);
       setNewDef(response.data);
       resetForm({});
     },
   });
  const {
    values,
    handleChange,
    handleSubmit,
    resetForm
  } = formik;
  const [subjects, setSubjects] = useState(null);
  const [newDef, setNewDef] = useState('');
  const fetchSubjects = async () => {
    const { data } = await getSubjects();
    setSubjects(data);
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      {subjects &&
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={values.name} onChange={handleChange} placeholder="Definition" />
              </Form.Group>

            <Form.Group as={Col} controlId="formGridSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control name="subject" as="select" defaultValue="" value={values.subject} onChange={handleChange}>
                <option key="lol" value="">Choose a subject</option>
                {subjects.map((subject, key) => <option key={key} value={subject.name}> {subject.name} </option>)}
              </Form.Control>
            </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridCOntent">
              <Form.Label>Content</Form.Label>
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
        </div>}
      {newDef && <Card key="new" bg='info' style={{ width: '18rem', margin: '10px' }}>
                                <Card.Header>{newDef.name}</Card.Header>
                                <Card.Body>
                                    <Card.Text>{newDef.content}
                            </Card.Text>
                                </Card.Body>
                            </Card>}
    </div >
  )
};

export default FormDef;