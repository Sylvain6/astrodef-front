import React, { useEffect, useState } from 'react';
import { getDefinitionsFromSubject } from '../../actions/definitions';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";

export default () => {
    const { name } = useParams();
    const [definitions, setDefinitions] = useState(null);
    useEffect(() => {
        const fetchDefBySubject = async () => {
            const { data } = await getDefinitionsFromSubject(name);
            setDefinitions(data);
        }
        fetchDefBySubject();
    }, [])

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
                            </Card>))}
                        </div>
                    </>:
                        <Spinner animation="border" />}
            </div>
        </>
    )};