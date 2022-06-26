import "./App.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { Component, useState, useEffect } from "react";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Web3 from "web3";

function App() {
  let [transations, setTransations] = useState([]);
  const [web3, setWeb3] = useState()
  const listCode = ["long", "duy", "linh"];
  const [isAuthen, setIsAuthen] = useState(false);
  const [address, setAddress] = useState();
  
  const onFinished = async (winner) => {
    const transation = {
      address: "0xab",
      reward: winner,
      createTime: new Date().toDateString(),
    };
    swal({
      title: "Chúc mừng chiến thắng của:",
      text: winner,
      icon: "success",
      dangerMode: true,
    });
    transations = [...transations, transation];
    setTransations(transations);
    let randContract = new window.web3.eth.Contract(contractABI, randAddress);
    console.log(randContract);
    let owner = await randContract.methods.owner().call();
    console.log("owner", owner);
    let rand = randContract.methods.randRange(0, 9).call();
    rand
      .then((res) => {
        console.log("rand", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const enterCode = () => {
    Swal.fire({
      title: "Vòng quay bị khoá!",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: false, // Có hiển thị nút cancel không(true = có)
      confirmButtonText: "Nhập",
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        console.log(value);
        let check = listCode.find((c) => c === value);
        if (check) {
          onConnectionWeb3();
          return true;
        } else {
          Swal.showValidationMessage("Vui lòng nhập lại, mã chưa đúng?");
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      setIsAuthen(true);
      Swal.fire("Nhập mã thành công, mời bạn quay thưởng.");
    });
  };
  useEffect(() => {
    if (isAuthen === false) {
      enterCode();
    }
  }, isAuthen);

  const onConnectionWeb3 = async () => {
    if (window.ethereum) {
      console.log(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts"})
      window.web3 = new Web3(window.ethereum);
      setWeb3(window.web3);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log("User denided account access");
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log("connection fail");
    }
    let accounts = await window.web3.eth.getAccounts();
    setAddress(accounts[0]);
    console.log("web3", accounts);
  };

  return (
    <div className="App">
      {/* header */}
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Xổ số</Navbar.Brand>
          <Nav className="me-auto">
            <button type="button" onClick={onConnectionWeb3()} className="btn btn-danger">Kết nối ví</button>
            <Nav.Link href="#home"></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="container">
        <div className="row">
          <div className="col">
            <section className="mt-5">
              <p>Nhấn enter thì xổ số sẽ gửi 0.01 eth</p>
              <button type="button" className="btn btn-primary">
                Tiếp tục chơi
              </button>
            </section>

            <section className="mt-5">
              <p>
                <b>Chỉ admin:</b>chọn người chiến thắng
              </p>
              <button type="button" className="btn btn-success">
                Chọn winner
              </button>
            </section>
          </div>

          <div className="col">
            <section className="mt-5">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Danh sách người chơi (1)</h5>
                  <div className="col">
                    <div className="row flex">
                      <p>Người chơi 1: <a href="#">0ABx12345</a></p>
                    </div>
                    <div className="flex row">
                      <p>Người chơi 2: <a href="#">0ABx12345</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-5">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">POT (10eth)</h5>
                  <p class="card-text">
                    10 Ether
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
      {/* history */}
      <br />
      {transations.length}
      <h3>Lịch sử xổ số</h3>
      <div className="container">
        {transations.length > 0 ? (
          <div>
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
                {transations.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.address}</td>
                      <td>{item.reward}</td>
                      <td>{item.createTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {/* <div className="d-flex justify-content-center">
              <Pagination>{items}</Pagination>
            </div> */}
          </div>
        ) : (
          <div>Danh sách trống</div>
        )}
      </div>
    </div>
  );
}

export default App;
