import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://localhost:7215/api/Auth/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, contrasena }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            setToken(data.token); 
            navigate('/listarpolizas'); // Redirige al listado de pólizas
        } else {
            setError('Credenciales inválidas. Inténtalo nuevamente.');
        }
    } catch (err) {
        console.error('Error al conectar con el servidor:', err);
        setError('Hubo un problema al intentar iniciar sesión.');
    }
};


  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md="12">
          <Form
            onSubmit={handleLogin}
            style={{
              maxWidth: '400px',
              margin: '0 auto',
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
              <Label for="usuario">Usuario</Label>
              <Input
                type="text"
                id="usuario"
                placeholder="Ingrese su usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="contrasena">Contraseña</Label>
              <Input
                type="password"
                id="contrasena"
                placeholder="Ingrese su contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit" block>
              Iniciar sesión
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
