import "./App.css";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import WheelComponent from "react-wheel-of-prizes";
import React, { Component, useState, useEffect } from "react";
import swal from 'sweetalert';
import Swal from "sweetalert2";
import Web3 from "web3";

function App() {
  let [transations, setTransations] = useState([]);
  const listCode = ['long', 'duy', 'linh'];
  const [isAuthen, setIsAuthen] = useState(false);
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
    transations = [...transations, transation];
    setTransations(transations);
  };

  const enterCode = () => {
    Swal.fire({
      title: "Vòng quay bị khoá!",
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false, // Có hiển thị nút cancel không(true = có)
      confirmButtonText: 'Nhập',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        console.log(value);
        let check = listCode.find(c => c === value);
        if (check) {
          onConnectionWeb3();
          return true;
        }
        else {
          Swal.showValidationMessage("Vui lòng nhập lại, mã chưa đúng?")
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      setIsAuthen(true);
      Swal.fire("Nhập mã thành công, mời bạn quay thưởng.")
    });
  }
  useEffect(() => {
    if (isAuthen === false) {
      enterCode();
    }
  }, isAuthen)

  const onConnectionWeb3 = async () => {

    if (window.ethereum) {
      console.log('hello 1')
      window.web3 = new Web3(window.window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log('User denided account access')
      }
    } else if (window.web3) {
      console.log('hello 2')
      window.web3 = new Web3(web3.currentProvider);
    } else {
      console.log('connection fail');
    }
    console.log('web3 window', window.web3);
    let account = await web3.eth.getAccounts();
    console.log('web3', account);
  }

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
                        <td>{i + 1}</td>
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
