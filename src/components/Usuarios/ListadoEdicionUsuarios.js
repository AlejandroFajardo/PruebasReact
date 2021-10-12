import React from "react";
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
import Layout from "../Layout/Layout";
import {
  getUsuarios,
  updateUsuario,
} from "../../services/Firebase/FirebaseService";
import "bootstrap/dist/css/bootstrap.css";

class ListadoEdicionUsuarios extends React.Component {
  state = {
    modalActualizar: false,
    ListaUsuarios: [],
    form: {
      Rol: "",
      Estado: "",
      user: "",
    },
    id: 0,
  };

  componentDidMount() {
    this.loadUsuarios();
  }

  async loadUsuarios() {
    this.setState({ ListaUsuarios: await getUsuarios() });
  }

  mostrarModalActualizar = (id) => {
    this.setState({ modalActualizar: !this.state.modalActualizar });
    this.state.id = id;
    this.state.ListaUsuarios.forEach((user) => {
      if (user.id === id) {
        this.state.form.Rol = user.data().role;
        this.state.form.Estado = user.data().state;
      }
    });
  };

  peticionPut = (usuario) => {
    this.setState({ modalActualizar: false });
    console.log(this.state.modalActualizar);
    updateUsuario(this.state.id, {
      role: this.state.form.Rol,
      state: this.state.form.Estado,
    });
    alert("Se edito correctamente");
    this.loadUsuarios();
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
      <Layout>
        <Container>
          <div className="container p-4">
            <h2>
              <center>Lista de Usuarios</center>
            </h2>
          </div>

          <Table>
            <thead>
              <tr>
                <th>ID usuario</th>
                <th>usuario</th>
                <th>Rol</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {this.state.ListaUsuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.data().user}</td>
                  <td>{usuario.data().role}</td>
                  <td>{usuario.data().state}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(usuario.id)}
                    >
                      Editar
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Usuario</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Rol:</label>
              <select
                className="form-control"
                name="Rol"
                onChange={this.handleChange}
                value={this.state.form.Rol}
              >
                <option value="Vendedor">Vendedor</option>
                <option value="Administrador">Administrador</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <select
                className="form-control"
                name="Estado"
                onChange={this.handleChange}
                value={this.state.form.Estado}
              >
                <option value="Inactivo">Inactivo</option>
                <option value="Activo">Activo</option>
              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() =>
                this.peticionPut(
                  this.state.ListaUsuarios.find(
                    (usuario) => usuario.id === this.state.id
                  )
                )
              }
            >
              Aceptar
            </Button>
            <Button
              color="danger"
              onClick={() => this.mostrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Layout>
    );
  }
}

export default ListadoEdicionUsuarios;
