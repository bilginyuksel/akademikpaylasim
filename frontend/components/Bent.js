import React from "react";
import { Button } from 'react-bootstrap'
function Bent({handler, ...bent}) {
  return (
      <tr>
        <td>{bent.name}</td>
        <td>{bent.title}</td>
        <td>{bent.point}</td>
        <td>
          <Button variant="primary"  onClick={() => handler(bent)}>Ekle</Button>
        </td>
      </tr>
  );
}

export default Bent;
