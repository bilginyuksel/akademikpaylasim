import React, { useEffect,useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
function Index() {
  const [professions, setProfessions] = useState([]);

  const getData = async () => {
    const response = await axios.get("http://localhost:3001/professions");
    console.log(response);
    setProfessions(response.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="wrapper">
      <Container>
        <Row>
          <Col md={12}>
            {professions.map((item) => (
              <Card>
                <Card.Body>
                  <Link href={`/alanlar/${item.id}`}>
                    <a>{item.name}</a>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Index;
