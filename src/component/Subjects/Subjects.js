import React, { useEffect, useState } from 'react';
import getSubjects from '../../actions/subjects';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import SubjectForm from './Form';


export default () => {
    const [subjects, setSubjects] = useState(null);
    useEffect(() => {
        const fetchSubjects = async () => {
            const { data } = await getSubjects();
            setSubjects(data);
        }
        fetchSubjects();
    }, [])

    return (
            <div  style={{padding: '10px', paddingRight: '170px', paddingLeft: '170px'}}>
                {subjects ?
                    <>
                    <SubjectForm />
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '100px' }}>
                        {subjects.map((subject, key) =>
                            <Button key={key} variant="dark" size="lg" style={{ margin: '15px' }} href={`/list/${subject.name}`}>
                                {subject.name}
                            </Button>)}
                            </div>
                    </>:
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
            </div>
    )};