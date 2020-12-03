import React, { useEffect, useState } from 'react';
import { getDefinitionsFromSubject, deleteDefinition } from '../../actions/definitions';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";

export default () => {
    const { name } = useParams();
    const [definitions, setDefinitions] = useState(null);
    const [alert, setAlert] = useState('');
    useEffect(() => {
        const fetchDefBySubject = async () => {
            const { data } = await getDefinitionsFromSubject(name);
            setDefinitions(data);
        }
        fetchDefBySubject();
    }, []);
    const deleteDef = async (id, name) => {
        console.log(id);
        const res = await deleteDefinition(id);
        res.data ?
            setAlert(`Definition ${name} deleted`) :
            setAlert(`Definition ${name} not deleted : ${res.message}`);
        setDefinitions(definitions.filter(item => item.name !== name));
    }

    return (
        <>
            <h1>All your definitions of the subject : {name}</h1>
            <div  style={{padding: '10px', paddingRight: '170px', paddingLeft: '170px'}}>
                {definitions ?
                    <>
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                            {definitions.map((definition, key) => (
                            <Card key={key} bg='info' style={{ width: '18rem', margin: '10px' }}>
                                <Card.Header>{definition.name}</Card.Header>
                                <Card.Body>
                                    <Card.Text>{definition.content}
                                        </Card.Text>

                                </Card.Body>
                                <Button variant="primary" onClick={() => deleteDef(definition._id, definition.name)}>Delete</Button>
                            </Card>))}
                        </div>
                            {alert && <Alert key="deleted" variant="success">
                                {alert}
                            </Alert>}
                    </>:
                        <Spinner animation="border" />}
            </div>
        </>
    )};