import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";

function ekle() {
  const router = useRouter();
  const [clausies, setClausies] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = (values) => {
    values.point = parseInt(values.point);
    axios.post("http://localhost:3001/subclausies", values).then(function (response) {
      router.push("/yonetim/bentler");
    });
  };
  const getData = async () => {
    const response = await axios.get("http://localhost:3001/clausies");
    setClausies(response.data);
  };
  return (
    <Container>
      <Row>
        <Col md="12">
          <Formik
            initialValues={{
              name: "",
              title: "",
              point: "",
              clauseId: ""
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
                    <Form.Group controlId="name">
                      <Form.Label>Özel Ad</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Özel Ad"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="title">
                      <Form.Label>Başlık</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        onBlur={handleBlur}
                        value={values.title}
                        placeholder="Başlık"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="point">
                      <Form.Label>Puan</Form.Label>
                      <Form.Control
                        type="text"
                        name="point"
                        onBlur={handleBlur}
                        value={values.point}
                        placeholder="Puan"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="clauseId">
                      <Form.Label>Madde Seçiniz</Form.Label>
                      <Form.Control as="select" custom onChange={handleChange} value={values.clauseId}>
                        <option value="">Madde Seçiniz...</option>
                        {clausies.map((item) => (
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
