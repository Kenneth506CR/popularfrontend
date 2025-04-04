import { useNavigate, useParams } from 'react-router-dom';
import { appsettings } from '../settings/appsettings';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';

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
};

export default function EditarPoliza() {
    const { id } = useParams();
    const [poliza, setPoliza] = useState(initialPoliza);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchPoliza = async () => {
            try {
                const response = await fetch(`${appsettings.apiUrl}Listar/${id}`,{
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al obtener la póliza');
                }
                const data = await response.json();

                console.log("Datos recibidos:", data); 

                setPoliza(data); 
                setLoading(false);
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudo cargar la póliza', 'error');
                setLoading(false); 
            }
        };
        fetchPoliza();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPoliza({
            ...poliza,
            [name]: value
        });
    };


    const editarPoliza = async (e) => {
        e.preventDefault();
        console.log('Datos enviados:', poliza);

        try {
            const response = await fetch(`${appsettings.apiUrl}Editar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` // Incluye el token en la solicitud
                },
                body: JSON.stringify(poliza)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.Message || "Error desconocido al editar la póliza");
            }

            Swal.fire({
                icon: 'success',
                title: 'Póliza editada con éxito',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', error.message, 'error');
        }
    };

    const Volver = () => {
        navigate('/');
    };

    return (
        <Container>
            <Row>
                <Col md="8" className="offset-md-2">
                    <h3>Editar Póliza</h3>
                    {loading ? (
                        <div className="d-flex justify-content-center">
                            <Spinner color="primary" /> Cargando...
                        </div>
                    ) : (
                        <Form onSubmit={editarPoliza}>
                        <FormGroup>
                            <Label for="numeroPoliza">Número de Póliza</Label>
                            <Input
                                type="text"
                                name="numeroPoliza"  // Debe coincidir con la propiedad del objeto `poliza`
                                id="numeroPoliza"
                                value={poliza.numeroPoliza}  // También debe coincidir con la propiedad
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="tipoPoliza">Tipo de Póliza</Label>

                            <Input type="select" name="tipoPoliza" id="tipoPoliza" value={poliza.tipoPoliza} onChange={handleChange} required>
                                <option value="">Seleccione...</option>
                                <option value="Vida">Vida</option>
                                <option value="Automóvil">Automóvil</option>
                                <option value="Hogar">Hogar</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="cedulaAsegurado">Cédula del Asegurado</Label>
                            <Input
                                type="text"
                                name="cedulaAsegurado"
                                id="cedulaAsegurado"
                                value={poliza.cedulaAsegurado}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="montoAsegurado">Monto Asegurado</Label>
                            <Input
                                type="number"
                                name="montoAsegurado"
                                id="montoAsegurado"
                                value={poliza.montoAsegurado}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="fechaVencimiento">Fecha de Vencimiento</Label>
                            <Input
                                type="date"
                                name="fechaVencimiento"
                                id="fechaVencimiento"
                                value={poliza.fechaVencimiento}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="fechaEmision">Fecha de Emisión</Label>
                            <Input
                                type="date"
                                name="fechaEmision"
                                id="fechaEmision"
                                value={poliza.fechaEmision}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="cobertura">Cobertura</Label>
                            <Input type="select" name="cobertura" id="cobertura" value={poliza.cobertura} onChange={handleChange} required>
                                <option value="">Seleccione...</option>
                                <option value="Accidente">Accidente</option>
                                <option value="Incendio">Incendio</option>
                                <option value="Robo">Robo</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="estadoPoliza">Estado de la Póliza</Label>
                            <Input
                                type="select"
                                name="estadoPoliza"
                                id="estadoPoliza"
                                value={poliza.estadoPoliza}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                <option value="Activo">Activo</option>
                                <option value="Cancelado">Cancelado</option>
                                <option value="Vencido">Vencido</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="prima">Prima</Label>
                            <Input
                                type="number"
                                name="prima"
                                id="prima"
                                value={poliza.prima}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="periodo">Periodo</Label>
                            <Input
                                type="date"
                                name="periodo"
                                id="periodo"
                                value={poliza.periodo}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="fechaInclusion">Fecha de Inclusión</Label>
                            <Input
                                type="date"
                                name="fechaInclusion"
                                id="fechaInclusion"
                                value={poliza.fechaInclusion}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="aseguradora">Aseguradora</Label>
                            <Input
                                type="text"
                                name="aseguradora"
                                id="aseguradora"
                                value={poliza.aseguradora}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button className='m-3' color="primary" type="submit">
                            Guardar
                        </Button>
                        <Button color="secondary" onClick={Volver}>
                            Volver
                        </Button>
                    </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
