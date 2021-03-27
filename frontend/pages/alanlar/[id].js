import React, { useState, useContext, useEffect } from 'react'
import {ProfessionContext} from '../../contexts/ProfessionContext';
import axios from 'axios';
import { Col, Container, Row, Button, Table, Modal, Form } from 'react-bootstrap'
import Cluase from '../../components/Cluase';

const getClausiesData = async (id) => (await axios.get("http://localhost:3001/clausies/by-profession/"+id)).data;

const getAllProfessionIds = async () => {
    const response = await axios.get("http://localhost:3001/professions");
    return response.data.map(item => {
        return {
          params: {
            id: String(item.id)
          }
        }
      })
}

function EgitimBilimleri({ postData }) {

    const [currentBent,setCurrentBent] = useState({});
    const [howManyPeoble, setHowManyPeoble] = useState(1);
    const [howMany, setHowMany] = useState(1);
    const [show, setShow] = useState(false);
    const [isBefore, setIsBefore] = useState(1);
    
    const { rawPoint,netPoint,addItem,loadRemoteProfessions,remoteProfessions,professionItems,beforeRawPoint,afterRawPoint } = useContext(ProfessionContext);
    
    useEffect(() => {
        loadRemoteProfessions(postData);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        addItem({
            ...currentBent,
            howMany:parseInt(howMany),
            howManyPeoble:parseInt(howManyPeoble),
            isBefore:isBefore==1
        })

        handleClose();

        setHowManyPeoble(1);
        setHowMany(1);
        setIsBefore(1);
    }

    const handleClose = () => setShow(false);

    const handleShow = (bent) => {
        setShow(true);
        setCurrentBent(bent);
    }
    
    return (
        <> 
            <Container>
                <Row>
                    <Col md="12">
                        {
                            remoteProfessions.map(item=>(<Cluase key={item.id} {...item} handleShow={handleShow}/>))
                        }
                    </Col>
                    <Col md="12">
                        <div style={{ marginTop: "20px" }}>
                            <h3>Doktora Öncesi</h3>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Konu</th>
                                        <th>Kişi</th>
                                        <th>Adet</th>
                                        <th>Puan</th>
                                        <th>Sonuç</th>
                                    </tr>
                                </thead>
                            </Table>
                        </div>
                    </Col>
                    <Col md="12">
                        <div style={{ marginTop: "20px" }}>
                            <h3>Doktora Sonrası</h3>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Konu</th>
                                        <th>Kişi</th>
                                        <th>Adet</th>
                                        <th>Puan</th>
                                        <th>Sonuç</th>
                                    </tr>
                                </thead>
                            </Table>
                        </div>
                    </Col>
                    <Col md="12">
                        <div style={{ marginTop: "20px" }}>
                            <h3>Toplam Hesaplama</h3>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Faaliyet Türü</th>
                                        <th>Puan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                       <td>
                                           Doktora Öncesi Ham Puan
                                       </td>
                                       <td>
                                           {beforeRawPoint}
                                       </td>
                                   </tr>
                                   <tr>
                                       <td>
                                           Doktora Sonrası Ham Puan
                                       </td>
                                       <td>
                                           {afterRawPoint}
                                       </td>
                                   </tr>
                                   <tr>
                                       <td>
                                           Genel Ham Puan
                                       </td>
                                       <td>
                                           {rawPoint}
                                       </td>
                                   </tr>
                                   <tr>
                                        <td>
                                           Genel Net Puan
                                       </td>
                                       <td>
                                           {netPoint}
                                       </td>
                                   </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Seçenekler</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={e => { handleSubmit(e) }}>
                        <Form.Group>
                            <Form.Label>Doktora öncesi/sonrası?</Form.Label>
                            <Form.Control as="select" onChange={e => setIsBefore(e.target.value)}>
                                <option value="1">Doktora Öncesi</option>
                                <option value="0">Doktora Sonrası</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Kaç kişi yapıldı?</Form.Label>
                            <Form.Control as="select" onChange={e => setHowManyPeoble(e.target.value)}>
                                {new Array(30).map(s => 
                                    <option value={s+1}>s+1</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Kaydet
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export async function getStaticPaths() {
    const paths = await getAllProfessionIds();
    return {
      paths,
      fallback: false
    }
  }

export async function getStaticProps({ params }) {
    const postData = await getClausiesData(params.id)
    return {
      props: {
        postData
      }
    }
  }

export default EgitimBilimleri
