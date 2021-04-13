/*eslint-disable*/
import React, {useState, useContext } from 'react';
import { Navbar,Nav,NavDropdown,Button,Jumbotron }from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import { Link, Route, Switch }from 'react-router-dom';
import Detail from './Detail.js';
import axios from 'axios';
import Cart from './Cart.js';

let 재고context = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고,재고변경] = useState([10,11,12]);



                              
  return (
    <div className="App">
      <Route exact path="/">
      <Navbar bg="light" expand="lg" className="">
        <Navbar.Brand href="#home">shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/Detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron className="background">
          <h1> 집에서 즐기는 크로플!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        <div className="container">

          <재고context.Provider value={재고}>
          <div className="row">
            {
              shoes.map((a,i) => {
                return(
                  <Card shoes={shoes[i]} i={i} key={i}/>)
              })
            }
          </div>
          </재고context.Provider>

          <button className="btn btn-primary"
          onClick={()=>{
            
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{
              console.log(result.data);
              shoes변경([...shoes, ...result.data]);
             })
            .catch(()=>{ 
              console.log('실패했어요')
            })
            }}>더보기</button>
        </div>

        </Route>
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
          </재고context.Provider>
        </Route>
        <Route path="/cart">
          <Cart></Cart>
        </Route>


        <Route path="/:id">
          <div>아무거나</div>
        </Route>
        
        
    </div>
  );
}

function Card(props){

  let 재고 = useContext(재고context);
  return(
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width="100%"/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content} & {props.shoes.price}</p>
      {재고}
    </div>
    )
}




export default App;
