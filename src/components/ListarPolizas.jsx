import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appsettings } from '../settings/appsettings';
import Swal from 'sweetalert2';
import { Container, Row, Col, Button, Card, CardBody, CardHeader } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import '../CSS/ListarPolizas.css';

export default function ListarPolizas() {
    const [polizas, setPolizas] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchPolizas = async () => {
            if (!token) {
                Swal.fire('Error', 'Usuario no autenticado. Por favor, inicie sesión.', 'error');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(appsettings.apiUrl + 'Listar', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluye el token en la solicitud
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        Swal.fire('Sesión expirada', 'Por favor, inicie sesión nuevamente.', 'warning');
                        navigate('/login');
                    }
                    throw new Error('Error al obtener las pólizas');
                }

                const data = await response.json();
                setPolizas(data);
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudieron cargar las pólizas', 'error');
            }
        };

        fetchPolizas();
    }, [token, navigate]);

    const handleLogout = () => {
        console.log('Cerrando sesión...');
        localStorage.removeItem('token'); 
        Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada correctamente',
            showConfirmButton: false,
            timer: 1500,
        });
        navigate('/login');
    };
    

    const handleDelete = async (numeroPoliza) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(appsettings.apiUrl + `Eliminar/${numeroPoliza}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar la póliza');
                }

                setPolizas(polizas.filter((poliza) => poliza.numeroPoliza !== numeroPoliza));
                Swal.fire('Eliminado!', 'La póliza ha sido eliminada.', 'success');
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudo eliminar la póliza', 'error');
            }
        }
    };

    const handleEdit = (numeroPoliza) => {
        navigate(`/editarpoliza/${numeroPoliza}`);
    };

    const handleNew = () => {
        navigate('/nuevapoliza');
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(amount);
    };

    return (
        <Container className="my-4">
            <Row className="mb-4 text-center">
                <Col md="12">
                    <h1 style={{ color: '#1C1C1E' }}>Lista de Pólizas</h1>
                    <Button
                        color="primary"
                        onClick={handleNew}
                        className="mb-4"
                        style={{ backgroundColor: '#2563EB', borderColor: '#2563EB' }}
                    >
                        <FaPlusCircle className="me-1" /> Nueva Póliza
                    </Button>
                    {/* Botón para cerrar sesión */}
                    <Button
                        color="secondary"
                        onClick={handleLogout}
                        className="mb-4 ms-3"
                        style={{ backgroundColor: '#6B7280', borderColor: '#6B7280' }}
                    >
                        Cerrar sesión
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {polizas.map((poliza) => (
                    <Col sm="6" md="4" className="mb-4" key={poliza.numeroPoliza}>
                        <Card className="shadow-sm" style={{ backgroundColor: '#F9FAFB' }}>
                            <CardHeader style={{ backgroundColor: '#1C1C1E', color: '#FFFFFF' }}>
                                <h5 className="mb-0">Póliza {poliza.numeroPoliza}</h5>
                            </CardHeader>
                            <CardBody style={{ backgroundColor: '#F9FAFB' }}>
                                <Row className="mb-3">
                                    <Col md="12">
                                        <p>
                                            <strong>Numero Póliza:</strong> {poliza.numeroPoliza}
                                        </p>
                                        <p>
                                            <strong>Tipo Póliza:</strong> {poliza.tipoPoliza}
                                        </p>
                                        <p>
                                            <strong>Cédula Asegurado:</strong> {poliza.cedulaAsegurado}
                                        </p>
                                        <p>
                                            <strong>Monto Asegurado:</strong> {formatCurrency(poliza.montoAsegurado)}
                                        </p>
                                        <p>
                                            <strong>Fecha Vencimiento:</strong>{' '}
                                            {new Date(poliza.fechaVencimiento).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <strong>Fecha Emisión:</strong>{' '}
                                            {new Date(poliza.fechaEmision).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <strong>Cobertura:</strong> {poliza.cobertura}
                                        </p>
                                        <p>
                                            <strong>Estado Póliza:</strong> {poliza.estadoPoliza}
                                        </p>
                                        <p>
                                            <strong>Prima:</strong> {formatCurrency(poliza.prima)}
                                        </p>
                                        <p>
                                            <strong>Periodo:</strong> {new Date(poliza.periodo).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <strong>Fecha Inclusión:</strong>{' '}
                                            {new Date(poliza.fechaInclusion).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <strong>Aseguradora:</strong> {poliza.aseguradora}
                                        </p>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-center mt-3">
                                    <Button
                                        color="warning"
                                        size="sm"
                                        onClick={() => handleEdit(poliza.numeroPoliza)}
                                        className="mx-2"
                                        style={{ backgroundColor: '#4B5563', borderColor: '#4B5563' }}
                                    >
                                        <FaEdit className="me-1" style={{ color: 'white' }} /> Editar
                                    </Button>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() => handleDelete(poliza.numeroPoliza)}
                                        className="mx-2"
                                        style={{ backgroundColor: '#B91C1C', borderColor: '#B91C1C' }}
                                    >
                                        <FaTrashAlt className="me-1" style={{ color: 'white' }} /> Eliminar
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
