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
    const [variant, setVariant] = useState('success');
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
        if (res.data) {
            setAlert(`Definition ${name} deleted`);
        } else {
            setVariant('danger');
            setAlert(`Definition ${name} not deleted : ${res.message}`);
        };
        setDefinitions(definitions.filter(item => item.name !== name));
    }

    return (
        <>
            <div  style={{padding: '10px', paddingRight: '170px', paddingLeft: '170px'}}>
            <h1>{name}</h1>
                {definitions ?
                    <>
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                            {definitions.map((definition, key) => (
                                <Card key={key} style={{ width: '100rem', marginBottom: '25px', marginTop: '25px' }}>
                                <Card.Header className="text-center" ><b>{definition.name}</b></Card.Header>
                                <Card.Body>
                                    <Card.Text>{definition.content}</Card.Text>
                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                deleteDef(definition._id, definition.name)}>
                                            Delete "{definition.name}"
                                        </Button>
                                </Card.Body>
                            </Card>))}
                        </div>
                            {alert && <Alert key="deleted" variant={variant}>
                                {alert}
                            </Alert>}
                    </>:
                        <Spinner animation="border" />}
            </div>
        </>
    )};