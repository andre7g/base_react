import React, { useEffect, useState } from 'react';
import { useCustomSelector } from '../../hooks/redux';
import { useTiposProducto } from '../../hooks/TiposProducto/useTiposProducto';
import { useProductos } from '../../hooks/Productos/useProductos';
import './Productos.css';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';

const Productos = () => {
    const { getTiposProductoAction } = useTiposProducto();
    const { addProductoAction, getProductosAction, getProductoByIdAction, updateProductoAction } = useProductos();
    const tiposproducto = useCustomSelector((state) => state.tiposproducto);
    const auth = useCustomSelector((state) => state.auth);
    const productos = useCustomSelector((state) => state.productos);

    const [selectedTipoProducto, setSelectedTipoProducto] = useState(""); // Estado para almacenar el tipo de producto seleccionado
    const [producto, setProducto] = useState(""); // Estado para almacenar el nombre del producto
    const [descripcion, setDescripcion] = useState(""); // Estado para almacenar la descripción del producto

    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    const [selectedProductId, setSelectedProductId] = useState(0); // Estado para almacenar el ID del producto seleccionado
    const [isAdding, setIsAdding] = useState(true); // Estado para determinar si se está agregando un nuevo producto o modificando uno existente

    useEffect(() => {
        getTiposProductoAction();
        getProductosAction();
    }, []);

    const handleTipoProductoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTipoProducto(event.target.value);
    };

    const handleProductoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProducto(event.target.value);
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcion(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = isAdding
                ? await addProductoAction({
                      producto,
                      descripcion,
                      tipo_productosId: parseInt(selectedTipoProducto),
                      usuarioCreacion: auth.name ?? '',
                      estadosId: 1 // Siempre uno
                  })
                : await updateProductoAction(selectedProductId,{
                      producto,
                      descripcion,
                      tipo_productosId: parseInt(selectedTipoProducto),
                      usuarioCreacion: auth.name ?? '',
                      usuarioActualizacion: auth.name ?? '',
                      estadosId: 1
                  });

            if (response?.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: `¡Producto ${isAdding ? 'agregado' : 'modificado'}!`,
                    text: response?.message,
                    confirmButtonText: 'Aceptar'
                });

                handleCloseModal();
                getProductosAction();
                setProducto('');
                setDescripcion('');
                setSelectedTipoProducto('');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response?.message,
                    confirmButtonText: 'Aceptar'
                });
            }


        } catch (error) {
            console.error(`Error al ${isAdding ? 'agregar' : 'modificar'} producto:`, error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Hubo un problema al ${
                    isAdding ? 'agregar' : 'modificar'
                } el producto. Por favor, inténtalo de nuevo más tarde.`,
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setIsAdding(true);
        setShowModal(true);
    };

    const handleGetById = async (id: number) => {
        setSelectedProductId(id);
        console.log(id)
        try {
            const response = await getProductoByIdAction(id);
            console.log(response)
            // console.log(productos.producto)
            if (response?.status === 200) {
                setIsAdding(false);
                setProducto(response.data.producto);
                setDescripcion(response.data.descripcion);
                setSelectedTipoProducto(response?.data?.tipo_productosId.toString() ?? "");
                setShowModal(true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response?.message,
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error('Error al obtener producto:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al obtener el producto. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className="container">
            <h1>Productos</h1>
            <Button variant="primary" onClick={handleShowModal} className="btn-add-product" style={{ marginLeft: 'auto' }}>
                Agregar
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isAdding ? 'Agregar Producto' : 'Modificar Producto'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="tipoProductoSelect">Seleccione un tipo de producto:</label>
                            <select className="form-control" id="tipoProductoSelect" value={selectedTipoProducto} onChange={handleTipoProductoChange}>
                                <option value="">Seleccione un tipo de producto</option>
                                {tiposproducto.tiposProducto.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>{tipo.tipoProducto}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productoInput">Nombre del producto:</label>
                            <input type="text" className="form-control" id="productoInput" value={producto} onChange={handleProductoChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcionInput">Descripción del producto:</label>
                            <input type="text" className="form-control" id="descripcionInput" value={descripcion} onChange={handleDescripcionChange} />
                        </div>
                        <Button variant="primary" type="submit">
                            {isAdding ? 'Guardar Producto' : 'Modificar Producto'}
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Tipo de Producto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.producto}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.tipo_productosId}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleGetById(producto.id)}>
                                    Modificar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Productos;
