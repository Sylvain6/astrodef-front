import React, { useEffect, useState } from 'react';
import getDefinitions from '../../actions/definitions';
import Spinner from 'react-bootstrap/Spinner';
import DefinitionForm from './Form';
import Card from 'react-bootstrap/Card';

export default () => {
    const [definitions, setDefinitions] = useState(null);
    useEffect(() => {
        const fetchDef = async () => {
            const { data } = await getDefinitions();
            setDefinitions(data);
        }
        fetchDef();
    }, [])

    return (
        <>
            <div  style={{padding: '10px', paddingRight: '170px', paddingLeft: '170px'}}>
                {definitions ?
                    <>
                            <DefinitionForm />
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