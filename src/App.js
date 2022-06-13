import "./App.css";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import WheelComponent from "react-wheel-of-prizes";
import React, { Component, useState } from "react";
import swal from 'sweetalert';

function App() {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const [points, setPoints] = useState(false);
  const segments = [
    "Long",
    "Đức",
    "Lân",
    "Kỳ",
    "Thành",
    "Lực",
    "Hòa",
    "Tình"
  ];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000"
  ];
  const onFinished = (winner) => {
    swal({
      title: "Chúc mừng chiến thắng của:",
      text: winner,
      icon: "success",
      dangerMode: true,
    }
    )
  };

  const ponitschek = () => {
    if (!points) {
      alert("get more points");
    } else {
    }
  };

  return (
    <div className="App">
      {/* header */}
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Random</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="body-bg">
        {/* vong quay */}
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment="won 60"
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Xoay"
          isOnlyOnce={false}
        />
      </div>
      {/* history */}
      <br />
      <h3>Lịch sử giao dịch</h3>
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Pagination>{items}</Pagination>
        </div>
      </div>
    </div>
  );
}

export default App;
