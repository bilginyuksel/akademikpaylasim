import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";

function ekle() {
  const router = useRouter();
  const handleSubmit = (values) => {
    axios
      .post("http://localhost:3001/professions", values)
      .then(function () {
        router.push("/yonetim/alanlar");
      });
  };
  return (
    <Container>
      <Row>
        <Col md="12">
          <Formik
            initialValues={{
              name: "",
              yazarFormul:""
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
                <Form.Group controlId="professionName">
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
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Gönder
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default ekle;
