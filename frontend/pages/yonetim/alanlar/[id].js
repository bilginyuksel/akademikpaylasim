import React from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { useRouter } from "next/router";
const getProfessionData = async (id) => {
    const response = await axios.get("http://localhost:3001/professions/"+id);
    return response.data;
}
const getAllProfessionIds = async (id) => {
    const response = await axios.get("http://localhost:3001/professions");
    return response.data.map(item => {
        return {
          params: {
            id: String(item.id)
          }
        }
      })
}

function Profession({ postData }) {
    const router = useRouter();
    const handleSubmit = (values) => {
        axios
          .put("http://localhost:3001/professions", values)
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
                name: postData.name,
                id:postData.id
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
                    Güncelle
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
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
    const postData = await getProfessionData(params.id)
    return {
      props: {
        postData
      }
    }
  }

export default Profession
