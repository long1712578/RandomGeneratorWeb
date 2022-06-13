import "./App.css";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

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

  var isPercentage = true;
      var prizes = [
              {
                text: "Áo thun J2Team",
                img: "images/Ao.png",
                number: 1, // 1%,
                percentpage: 0.01 // 1%
              },
              {
                text: "Nón J2 Team",
                img: "images/Non.png",
                number: 1,
                percentpage: 0.05 // 5%
              },
              {
                text: "Vòng Tay J2Team",
                img: "images/Vong.png",
                number : 1,
                percentpage: 0.1 // 10%
              },
              {
                text: "J2Team Security",
                img: "images/j2_logo.png",
                number: 1,
                percentpage: 0.24 // 24%
              },
              {
                text: "Chúc bạn may mắn lần sau",
                img: "images/miss.png",
                percentpage: 0.6 // 60%
              },
            ];
            
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
        <div className="wrapper typo" id="wrapper">
          <section id="luckywheel" className="hc-luckywheel">
            <div className="hc-luckywheel-container">
              <canvas className="hc-luckywheel-canvas" width="500px" height="500px">
                Vòng Xoay May Mắn
              </canvas>
            </div>
            <a className="hc-luckywheel-btn">
              Xoay
            </a>
          </section>
        </div>
      </div>
      {/* history */}
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
