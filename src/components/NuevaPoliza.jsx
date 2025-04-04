import {ChangeEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { appsettings } from '../settings/appsettings';
import Swal from 'sweetalert2';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';

const initialPoliza = {
    NumeroPoliza: '', 
    TipoPoliza: '', 
    CedulaAsegurado: '', 
    MontoAsegurado: 0, 
    FechaVencimiento: new Date().toISOString().split('T')[0], 
    FechaEmision: new Date().toISOString().split('T')[0], 
    Cobertura: '', 
    EstadoPoliza: '',
    Prima: 0, 
    Periodo: new Date().toISOString().split('T')[0], 
    FechaInclusion: new Date().toISOString().split('T')[0], 
    Aseguradora: '' 
}

export default function NuevaPoliza() {

    const [poliza, setPoliza] = useState(initialPoliza);
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPoliza({
            ...poliza,
            [name]: value
        });
    }

    const Volver = () => {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const polizaFormateada = {
          numeroPoliza: poliza.NumeroPoliza,
          tipoPoliza: poliza.TipoPoliza,
          cedulaAsegurado: poliza.CedulaAsegurado,
          montoAsegurado: Number(poliza.MontoAsegurado),
          fechaVencimiento: poliza.FechaVencimiento,
          fechaEmision: poliza.FechaEmision,
          cobertura: poliza.Cobertura,
          estadoPoliza: poliza.EstadoPoliza,
          prima: Number(poliza.Prima),
          periodo: poliza.Periodo,
          fechaInclusion: poliza.FechaInclusion,
          aseguradora: poliza.Aseguradora
        };
      
        try {
          const response = await fetch(appsettings.apiUrl + 'Nueva', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(polizaFormateada)
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.Message || "Error desconocido al crear la póliza");
          }
      
          Swal.fire({
            icon: 'success',
            title: 'Póliza creada con éxito',
            showConfirmButton: false,
            timer: 1500
          });
      
          navigate('/');
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
          });
        }
      };
      
    

    return (
        <Container>
            <Row>
                <Col sm={{size: 6, offset: 3}}>
                    <h1 className="text-center">Nueva Póliza</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="NumeroPoliza">Número de Póliza</Label>
                            <Input type="text" name="NumeroPoliza" id="NumeroPoliza" value={poliza.NumeroPoliza} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="TipoPoliza">Tipo de Póliza</Label>
                            <Input type="select" name="TipoPoliza" id="TipoPoliza" value={poliza.TipoPoliza} onChange={handleChange} required>
                                <option value="">Seleccione...</option>
                                <option value="Vida">Vida</option>
                                <option value="Automóvil">Automóvil</option>
                                <option value="Hogar">Hogar</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="CedulaAsegurado">Cédula del Asegurado</Label>
                            <Input type="text" name="CedulaAsegurado" id="CedulaAsegurado" value={poliza.CedulaAsegurado} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="MontoAsegurado">Monto Asegurado</Label>
                            <Input type="number" name="MontoAsegurado" id="MontoAsegurado" value={poliza.MontoAsegurado} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="FechaVencimiento">Fecha de Vencimiento</Label>
                            <Input type="date" name="FechaVencimiento" id="FechaVencimiento" value={poliza.FechaVencimiento} onChange={handleChange} required />        
                        </FormGroup>
                        <FormGroup>
                            <Label for="FechaEmision">Fecha de Emisión</Label>
                            <Input type="date" name="FechaEmision" id="FechaEmision" value={poliza.FechaEmision} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Cobertura">Coberturas</Label>
                            <Input type="select" name="Cobertura" id="Cobertura" value={poliza.Cobertura} onChange={handleChange} required>
                                <option value="">Seleccione...</option>
                                <option value="Accidente">Accidente</option>
                                <option value="Incendio">Incendio</option>
                                <option value="Robo">Robo</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="EstadoPoliza">Estado de la Póliza</Label>
                            <Input type="select" name="EstadoPoliza" id="EstadoPoliza" value={poliza.EstadoPoliza} onChange={handleChange} required>
                                <option value="">Seleccione...</option>
                                <option value="Activo">Activo</option>
                                <option value="Cancelado">Cancelado</option>
                                <option value="Vencido">Vencido</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Prima">Prima</Label>
                            <Input type="number" name="Prima" id="Prima" value={poliza.Prima} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Periodo">Periodo</Label>
                            <Input type="date" name="Periodo" id="Periodo" value={poliza.Periodo} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="FechaInclusion">Fecha de Inclusión</Label>
                            <Input type="date" name="FechaInclusion" id="FechaInclusion" value={poliza.FechaInclusion} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Aseguradora">Aseguradora</Label>
                            <Input type="text" name="Aseguradora" id="Aseguradora" value={poliza.Aseguradora} onChange={handleChange} required />
                        </FormGroup>
                        <Button color="primary" className='me-4' type="submit">Crear Póliza</Button>
                        <Button color="secondary" onClick={Volver}>Volver</Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
}