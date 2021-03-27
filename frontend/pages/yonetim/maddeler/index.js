import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import DTable from "../../../components/DTable";
import Link from "next/link";

function index() {
  const [clausies, setClausies] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const removeData = (id) => {
    if (confirm("Emin misin?")) {
      axios
        .delete(`http://localhost:3001/clausies`, {
          data: {
            id
          },
        })
        .then((res) => {
          const del = clausies.filter((clause) => id != clause.id);
          setClausies(del);
        });
    }
  };

  const getData = async () => {
    const response = await axios.get("http://localhost:3001/clausies");
    setClausies(response.data);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Başlık",
        accessor: "name", 
      },
      {
        Header: "Alan",
        accessor: "profession.name",
      },
      {
        Header: "En Yüksek Puan",
        accessor: "maxPoint",
      },
      {
        Header: "Yayın Sayısı Formülü",
        accessor: "yayinSayisiFormula",
      },
      {
        Header: "En Az Puan Formülü",
        accessor: "enAzPuanFormula",
      },
      {
        Header: "İşlemler",
        accessor: "id",
        Cell: ({ value }) => (
          <>
            <Link href={`http://localhost:3000/yonetim/maddeler/${value}`}>
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
          <Link href="/yonetim/maddeler/yeni-ekle">
            <Button variant="primary">Yeni Ekle</Button>
          </Link>
        </Col>
        <Col md="12">
          <DTable columns={columns} data={clausies} />
        </Col>
      </Row>
    </Container>
  );
}

export default index;
