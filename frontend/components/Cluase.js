import React from 'react'
import Bent from '../components/Bent';
import { Accordion, Card, Button, Table } from 'react-bootstrap'
function Cluase({ handleShow, ...clause }) {
    return (
        <Accordion defaultActiveKey={clause.id}>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={clause.id}>
                        {clause.name}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={clause.id}>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Faaliyet</th>
                                    <th>Puan</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clause.subclausies.map(item => (
                                    <Bent key={item.name}
                                        maxPoint={clause.maxPoint}
                                        parentName={clause.name}
                                        name={item.name}
                                        title={item.title}
                                        point={item.point}
                                        handler={handleShow} />))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default Cluase
