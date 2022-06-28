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
  const [lcContract, setLcContract] = useState()
  const [lotteryPot, setLotteryPot] = useState()
  const [lotteryPlayers, setPlayers] = useState([])
  const [lotteryHistory, setLotteryHistory] = useState([])

  useEffect(() => {
    if(lcContract) getPot();
    if(lcContract) getPlayers();
  }, [lcContract]);

  // Kết nối với metamask
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

  // Lấy pot
  const getPot = async() => {
    const pot = await lcContract.methods.getBalance().call();
    console.log('event pot', pot);
    setLotteryPot(web3.ultils.fromWei(pot, 'ether'));
  }

  //Lấy danh sách người chơi
  const getPlayers = async() => {
    const players = await lcContract.methods.getPlayers().call();
    console.log('danh sachs nguoi choi', players);
    setPlayers(players);
  }

  // Xo so
  const enterLotteryHandle = async() => {
    try {
      await lcContract.methods.enter().send({
        from:address,
        value: '15000000000000000',
        gas: 300000,
        priceGas: null
      })
    }catch(err) {
      console.log(err);
    }
  }

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
              <button type="button" className="btn btn-primary" onClick={enterLotteryHandle()}>
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
                  <h5 class="card-title">POT</h5>
                  <p class="card-text">
                    {lotteryPot} Ether
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
