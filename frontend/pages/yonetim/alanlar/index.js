import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import DTable from "../../../components/DTable";
import Link from "next/link";

function index() {
  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const removeData = (id) => {
    if (confirm("Emin misin?")) {
      axios
        .delete(`http://localhost:3001/professions`, {
          data: {
            id
          },
        })
        .then((res) => {
          const del = professions.filter((profession) => id != profession.id);
          setProfessions(del);
        });
    }
  };

  const getData = async () => {
    const response = await axios.get("http://localhost:3001/professions");
    setProfessions(response.data);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Başlık",
        accessor: "name", // accessor is the "key" in the data
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
        {console.log(professions)}
      <Row>
        <Col md="12">
          <Link href="/yonetim/alanlar/yeni-ekle">
            <Button variant="primary">Yeni Ekle</Button>
          </Link>
        </Col>
        <Col md="12">
          <DTable columns={columns} data={professions} />
        </Col>
      </Row>
    </Container>
  );
}

export default index;
