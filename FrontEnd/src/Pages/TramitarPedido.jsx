import React, { useState } from 'react';
import Menu from '../Components/Menu'
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import PayPalComponent from "../Components/Paypal";



const steps = ['Información de envío', 'Resumen pedido', 'Pago'];

export default function TramitarPedido() {
    //------------Código usado por MATERIAL para el componente STEPPER------//
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };


    const handleNextStep = () => {
        // Verificar si el formulario es válido solo en los pasos 0 y 1
        if (activeStep === 0 || activeStep === 1) {
          // Hacer la validación del formulario y luego llamar onSubmit si es válido
          handleSubmit(onSubmit)();
        } else if (activeStep === steps.length - 1) {
          // Si es el último paso, finalizar el pedido
          finalizarPedido();
        } else {
          // Si no está en los pasos 0, 1 o el último, avanzar al siguiente paso
          handleNext();
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

     //------------FIN Código usado por material para ael componente------//
    let location = useLocation();
    let carrito = location.state.carrito;
    const { register, handleSubmit, watch,formState: { errors } } = useForm();

    console.log(carrito)
    const onSubmit = (data) => {
        //Avanzar al siguiente formulario
        handleNext();
    };

    const direccion=`${watch('calle')},${watch('numero')},${watch('provincia')},${watch('localidad')},${watch('codigoPostal')}`

    const finalizarPedido = () => {
        const pedido = {
            cliente_id: 1,  // Cambiar por el id cuando se loguee
            direccion: direccion,  // Crear el string de la calle
            lineas: carrito.map(producto => ({
                articulo_id: producto.id,
                unidades: producto.cantidad
            }))
        };
    
        fetch('http://localhost:8000/makeOrderJSON/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Pedido creado exitosamente. ID del pedido: ' + data.pedido_id);
            } else {
                alert('Error al crear el pedido');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    return (
        <div className='containerPrincipal'>
            <Menu selected="incidencias"></Menu>
            
            <div className="contenedor box">
                <h2 className='tittle mb-5'>Tramitar pedido</h2>
                <div className='containerTramite box w-75 mx-auto barScroll'>
                    
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className='py-4 mx-5 containerFormPedido'>
                                    {activeStep === 0 && (
                                        <Box>
                                            {/* Información de envío */}
                                            <form className='row' onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-3 col-md-9 col-12">
                                                    <TextField 
                                                            id="outlined-basic" 
                                                            label="Calle" 
                                                            className='w-100'
                                                            {...register('calle', { required: true })}
                                                    />
                                                    {errors.calle && <span className="text-warning">Debes indicar la calle</span>}
                                                </div>
                                                <div className="mb-3 col-md-3 col-12">
                                                    <TextField 
                                                            id="outlined-basic" 
                                                            label="Número, piso, portal..." 
                                                            className='w-100'
                                                            {...register('numero', {
                                                                required: 'Debes indicar el número, piso o portal',
                                                                pattern: {
                                                                    value: /^[0-9a-zA-Z\s]*$/,
                                                                    message: 'Formato inválido, solo números y letras',
                                                                },
                                                            })}
                                                    />
                                                    {errors.numero && <span className="text-warning">{errors.numero.message}</span>}
                                                </div>
                                                <div className="mb-3 col-md-4 col-12">
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="Provincia" 
                                                        className='w-100'
                                                        {...register('provincia', { required: true })}
                                                    />
                                                    {errors.provincia && <span className="text-warning">Debes indicar la provincia</span>}
                                                </div>
                                                <div className="mb-3 col-md-4 col-12">
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="Localidad" 
                                                        className='w-100'
                                                        {...register('localidad', { required: true })}
                                                        />
                                                        {errors.localidad && <span className="text-warning">Debes indicar la localidad</span>}
                                                </div>
                                                <div className="mb-3 col-md-4 col-12">
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="Código postal" 
                                                        className='w-100'
                                                        {...register('codigoPostal', {
                                                            required: 'Debes indicar el código postal',
                                                            pattern: {
                                                                value: /^[0-9]{5}$/,
                                                                message: 'El código postal debe tener 5 dígitos',
                                                            },
                                                        })}
                                                    />
                                                    {errors.codigoPostal && <span className="text-warning">{errors.codigoPostal.message}</span>}
                                                </div>
                                            </form>
                                        </Box>
                                    )}
                                    {activeStep === 1 && (
                                        <Box>
                                        {/* Resumen */}
                                        <Typography variant="h6" className='text-center fs-3'>Resumen del pedido</Typography>
                                        <div className=' '>
                                            <Box my={2}>
                                                <Typography variant="subtitle1" className='border-bottom fw-bold text-end'>Información de envío</Typography>
                                                <Typography>Calle: {watch('calle')}</Typography>
                                                <Typography>Número, piso, portal: {watch('numero')}</Typography>
                                                <Typography>Provincia: {watch('provincia')}</Typography>
                                                <Typography>Localidad: {watch('localidad')}</Typography>
                                                <Typography>Código postal: {watch('codigoPostal')}</Typography>
                                            </Box>
                                            <Box my={2}>
                                                <Typography variant="subtitle1" className='border-bottom fw-bold text-end'>Resumen pedido</Typography>
                                                {carrito.map(producto => (
                                                    <Box key={producto.id} my={1}>
                                                        <Typography>Nombre: {producto.nombre}</Typography>
                                                        <Typography>Cantidad: {producto.cantidad}</Typography>
                                                        <Typography>Precio total: {producto.precio * producto.cantidad}€</Typography>
                                                    </Box>
                                                ))}
                                                <Typography variant="h6" className='fw-bold text-end'>Precio total del pedido: {carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)}€</Typography>
                                            </Box>
                                        </div>
                                    </Box>
                                    )}
                                    {activeStep === 2 && (
                                        <Box>
                                        {/* Información de pago */}
                                        {/* <div className='containerTarjetaCredito my-3 w-75 m-auto d-flex flex-column '>
                                            <div className="tarjetaCredito mb-3 p-3 m-auto d-md-block d-none">
                                                <p className='h2'>{watch('numeroTarjeta') ? watch('numeroTarjeta') : '0000 0000 0000 000'}</p>
                                                <p className='h2'>{watch('mm') && watch('yy') ? `${watch('mm')}/${watch('yy')}` : 'MM/YY'}</p>
                                                <p>{watch('nombreTitular') ? watch('nombreTitular') : 'Nombre Titular Predeterminado'}</p>
                                            </div>
                                            <form action="" className='row justify-content-between'>
                                                <div className="mb-3 col-12">
                                                <TextField
                                                    id="numeroTarjeta"
                                                    label="Número de la tarjeta"
                                                    className='w-100'
                                                    {...register('numeroTarjeta', {
                                                        required: 'Debes indicar el número de la tarjeta',
                                                        pattern: {
                                                            value: /^[0-9]{16}$/,
                                                            message: 'El número de la tarjeta debe tener 16 dígitos',
                                                        },
                                                    })}
                                                />
                                                {errors.numeroTarjeta && <span className="text-warning">{errors.numeroTarjeta.message}</span>}
                                                </div>
                                                <div className="mb-3 col-12">
                                                    <TextField
                                                        id="nombreTitular"
                                                        label="Nombre del titular"
                                                        className='w-100'
                                                        {...register('nombreTitular', { required: 'Debes indicar el nombre del titular' })}
                                                    />
                                                    {errors.nombreTitular && <span className="text-warning">{errors.nombreTitular.message}</span>}
                                                </div>
                                                <div className='col-md-8 col-12 row '>
                                                    <div className="mb-3 col-md-4 col-12">
                                                    <TextField
                                                        id="mm"
                                                        label="MM"
                                                        className='w-100'
                                                        {...register('mm', {
                                                            required: 'Debes indicar el mes de vencimiento',
                                                            pattern: {
                                                                value: /^(0?[1-9]|1[012])$/,
                                                                message: 'Formato inválido, introduce un mes válido (01-12)',
                                                            },
                                                        })}
                                                    />
                                                    {errors.mm && <span className="text-warning">{errors.mm.message}</span>}
                                                    </div>
                                                    <p className='col-1 h2 text-center d-md-block d-none'>/</p>
                                                    <div className="mb-3 col-md-4 col-12">
                                                    <TextField
                                                        id="yy"
                                                        label="YY"
                                                        className='w-100'
                                                        {...register('yy', {
                                                            required: 'Debes indicar el año de vencimiento',
                                                            pattern: {
                                                                value: /^(2[2-9]|[3-9][0-9])$/,
                                                                message: 'Formato inválido, introduce un año válido (22-99)',
                                                            },
                                                        })}
                                                    />
                                                    {errors.yy && <span className="text-warning">{errors.yy.message}</span>}
                                                    </div>
                                                </div>
                                                
                                                <div className="mb-3 col-md-4 col-12">
                                                <TextField
                                                    id="cvv"
                                                    label="CVV"
                                                    className='w-100'
                                                    {...register('cvv', {
                                                        required: 'Debes indicar el código CVV',
                                                        pattern: {
                                                            value: /^[0-9]{3}$/,
                                                            message: 'El código CVV debe tener 3 dígitos',
                                                        },
                                                    })}
                                                />
                                                {errors.cvv && <span className="text-warning">{errors.cvv.message}</span>}
                                                </div>
                                            </form>
                                        </div> */}
                                            <PayPalComponent  monto={carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)}/>
                                        </Box>
                                    )}
                                </div>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Anterior
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNextStep}>
                                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
                </div>
            </div>
        </div>
    );
}
