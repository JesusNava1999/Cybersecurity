import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

// Funciones Hashing

function newSize(x) {
  return pow(ceil(getBaseLog(2, x)));
}
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}
function ceil(x) {
  return Math.ceil(x);
}
function pow(x) {
  return Math.pow(2, x);
}
function stringToAscii(word) {
  var aux = [];
  for (var i = 0; i < newSize(word.length); i++) {
    if (!word[i]) {
      aux[i] = 0;
    } else {
      aux[i] = word[i].charCodeAt(0);
    }
  }
  return aux;
}
function rotateNumber(x) {
  x = x.toString();
  const aux = x.split("");
  aux.push(aux.shift());
  return parseInt(aux.join(""), 10);
}
function rotateDigits(x) {
  for (var i = 0; i < newSize(x.length); i++) {
    x[i] = rotateNumber(x[i]);
  }
  return x;
}
function asciiToString(x) {
  for (var i = 0; i < newSize(x.length); i++) {
    if (
      (x[i] >= 48 && x[i] <= 57) ||
      (x[i] >= 65 && x[i] <= 90) ||
      (x[i] >= 97 && x[i] <= 122)
    ) {
      x[i] = String.fromCharCode(x[i]);
    }
  }
  return x.join("");
}
function completeHash(x, y) {
  /* var aux = 0;
  for (var i = x.length; i < newSize(x.length); i++) {
    //if (x[i] === 0) {
      x[i] = y[aux];
      aux++;
    //}
  } */
  var aux = "";
  aux = x.concat('',y);
  return aux;
}

function hashing(username, password) {
  console.log("Password: ", password);
  var union = []
  union = completeHash(password,username);
  console.log("Union: ", union);
  var ascii = [];  
  ascii = stringToAscii(union);
  console.log("Ascii: ", ascii);
  var swap = [];
  swap = rotateDigits(ascii);
  console.log("Swap: ", swap);
  var prehash = [];
  prehash = asciiToString(swap);
  console.log("Prehash: ", prehash);
  /* var hash = [];
  hash = completeHash(prehash, username);
  console.log("Hash: ", hash); */
  return prehash;
}

const data = [{ id: 1, username: "Oskr", hash: "051280a54648dt55982Oskr" }];

class App extends React.Component {
  state = {
    data: data,
    modalInsertar: false,
    form: {
      id: "",
      username: "",
      hash: "",
    },
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({
      modalInsertar: false,
    });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estas seguro que deseas ELIMINAR el elemento " + dato.id
    );
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    valorNuevo.hash = hashing(
      valorNuevo.username.toString(),
      valorNuevo.hash.toString()
    );
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Crear
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Hash</th>
                <th>----</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.username}</td>
                  <td>{dato.hash}</td>
                  <td>
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>
            <FormGroup>
              <label>Username:</label>
              <input
                className="form-control"
                name="username"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Contraseña:</label>
              <input
                className="form-control"
                name="hash"
                type="password"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.mostrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
