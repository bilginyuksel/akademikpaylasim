import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import DTable from "../../../components/DTable";
import Link from "next/link";

function index() {
  const [subclausies, setSubclausies] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const removeData = (id) => {
    if (confirm("Emin misin?")) {
      axios
        .delete(`http://localhost:3001/subclausies`, {
          data: {
            id
          },
        })
        .then((res) => {
          const del = subclausies.filter((subclause) => id != subclause.id);
          setSubclausies(del);
        });
    }
  };

  const getData = async () => {
    const response = await axios.get("http://localhost:3001/subclausies");
    setSubclausies(response.data);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Özel Ad",
        accessor: "name",
      },
      {
        Header: "Başlık",
        accessor: "title",
      },
      {
        Header: "Puan",
        accessor: "point",
      },
      {
        Header: "Madde",
        accessor: "clause.name",
      },
      {
        Header: "İşlemler",
        accessor: "id",
        Cell: ({ value }) => (
          <>
            <Link href={`http://localhost:3000/yonetim/alanlar/${value}`}>
              <Button variant="warning">Düzenle</Button>
            </Link>
            <Button
              style={{ marginLeft: 10 }}
              variant="danger"
              onClick={() => removeData(value)}
            >
              Sil
            </Button>{" "}
          </>
        ),
      },
    ],
    []
  );

  return (
    <Container>
      <Row>
        <Col md="12">
          <Link href="/yonetim/bentler/yeni-ekle">
            <Button variant="primary">Yeni Ekle</Button>
          </Link>
        </Col>
        <Col md="12">
          <DTable columns={columns} data={subclausies} />
        </Col>
      </Row>
    </Container>
  );
}

export default index;
