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
  let [transations, setTransations] = useState([]);
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
    const transation = {
      address: '0xab',
      reward: winner,
      createTime: new Date().toDateString()
    };
    swal({
      title: "Chúc mừng chiến thắng của:",
      text: winner,
      icon: "success",
      dangerMode: true,
    });
    transations = [...transations,transation];
    setTransations(transations);
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
      {transations.length}
      <h3>Lịch sử quay</h3>
      <div className="container">
        {
          transations.length > 0 ?
            (<div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Địa chỉ</th>
                    <th>Phần thưởng</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    transations.map((item, i) => {
                      return <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.address}</td>
                        <td>{item.reward}</td>
                        <td>{item.createTime}</td>
                      </tr>
                    })
                  }
                </tbody>
              </Table>
              {/* <div className="d-flex justify-content-center">
              <Pagination>{items}</Pagination>
            </div> */}
            </div>)
            :
            (<div>Danh sách trống</div>)
        }
      </div>
    </div>
  );
}

export default App;
