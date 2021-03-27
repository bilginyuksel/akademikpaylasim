import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";

function ekle() {
  const router = useRouter();
  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = (values) => {
    values.maxPoint = parseInt(values.maxPoint);
    axios.post("http://localhost:3001/clausies", values).then(function () {
      router.push("/yonetim/maddeler");
    });
  };
  const getData = async () => {
    const response = await axios.get("http://localhost:3001/professions");
    setProfessions(response.data);
  };
  return (
    <Container>
      <Row>
        <Col md="12">
          <Formik
            initialValues={{
              name: " ",
              maxPoint: " ",
              yayinSayisiFormula: " ",
              enAzPuanFormula: " ",
              professionId: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                handleSubmit(values);
              }, 400);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="causeName">
                      <Form.Label>Başlık</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Başlık"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="maxPoint">
                      <Form.Label>En Yüksek Puan</Form.Label>
                      <Form.Control
                        type="text"
                        name="maxPoint"
                        onBlur={handleBlur}
                        value={values.maxPoint}
                        placeholder="En Yüksek Puan"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="yayinSayisiFormula">
                      <Form.Label>Yayın Sayısı Formülü</Form.Label>
                      <Form.Control
                        type="text"
                        name="yayinSayisiFormula"
                        onBlur={handleBlur}
                        value={values.yayinSayisiFormula}
                        placeholder="Yayın Sayısı Formülü"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="enAzPuanFormula">
                      <Form.Label>En Az Puan Formülü</Form.Label>
                      <Form.Control
                        type="text"
                        name="enAzPuanFormula"
                        onBlur={handleBlur}
                        value={values.enAzPuanFormula}
                        placeholder="En Az Puan Formülü"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="professionId">
                      <Form.Label>Alan Seçiniz</Form.Label>
                      <Form.Control as="select" custom onChange={handleChange} value={values.professionId}>
                        <option value="">Alan Seçiniz...</option>
                        {professions.map((item) => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Gönder
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default ekle;
