import React, { useState } from 'react';
import Menu from '../components/Menu';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Select,MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PayPalComponent from "../components/Paypal";
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { useTranslation } from "react-i18next";


const steps = ['Información de envío', 'Resumen pedido', 'Pago'];

export default function TramitarPedido() {
    //------------Código usado por MATERIAL para el componente STEPPER------//
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [refreshKey,setRefreshKey] =  useState(0);

    
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
        if (activeStep === 0 ) {
          // Hacer la validación del formulario y luego llamar onSubmit si es válido
          handleSubmit(onSubmit)();
        } else {
          handleNext();
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        if (activeStep === 2) {
            setRefreshKey(prevKey => prevKey + 1);
        }
    }, [activeStep]);

    const handleReset = () => {
        setActiveStep(0);
    };

    //------------FIN Código usado por material para ael componente------//
    const { t } = useTranslation();
    //Recoger del location el carrito y el usuario, que lo hemos pasado en el componente 'Carrito' mediante el link
    let location = useLocation();
    let carrito = location.state.carrito;
    let user= location.state.user
    console.log(location)
    const { register, handleSubmit, watch,formState: { errors } } = useForm();

    const onSubmit = () => {
        //Avanzar al siguiente formulario
        handleNext();
    };
    
    //VARIABLES PARA LAS PROVINCIAS Y LAS LOCALIDADES
    const [provincias,setProvincias]= useState([])
    const [localidades,setLocalidades]= useState([])
    const [selectedProvincia, setSelectedProvincia] = useState('');//Guardar la provincia para luego el desplegable de la localidad
    const [selectedLocalidad, setSelectedLocalidad] = useState('');

    //Guardar direccion para mostrarla en el detalle y para mandarla cuando se genere pdf
    const objDireccion= {
        calle:watch('calle'),
        numero:watch('numero'),
        provincia:selectedProvincia,
        localidad:selectedLocalidad,
        codigoPostal:watch('codigoPostal')
    }
    let direccion = `${watch('calle')}, ${watch('numero')}, ${selectedLocalidad}, ${selectedProvincia}, ${watch('codigoPostal')}`;

    //FUNCIÓN PARA OBTENER LAS PROVINCIAS
    useEffect(() => {
        fetch('http://127.0.0.1:8000/getProvincias/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            setProvincias(data.prov.map(provincia => provincia.np))
            setSelectedProvincia(data.prov[0].np)
            console.log(data.prov[0].np)
            //Inicializar localidades con la primera provincia 
            fetch(`http://127.0.0.1:8000/getLocalidades/?provincia=${data.prov[0].np}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                setLocalidades(data.consulta_municipieroResult.municipiero.muni.map(municipio => municipio.nm));
                setSelectedLocalidad(data.consulta_municipieroResult.municipiero.muni[0].nm)

            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

        

    }, [])

    // Agrega una función para manejar el cambio de provincia
    const handleProvinciaChange = (event) => {
        const selectedProvincia = event.target.value;
        setSelectedProvincia(selectedProvincia);
        fetch(`http://127.0.0.1:8000/getLocalidades/?provincia=${selectedProvincia}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            // Extraer los nombres de las localidades del arreglo de municipios
            setLocalidades(data.consulta_municipieroResult.municipiero.muni.map(municipio => municipio.nm))
            setSelectedLocalidad(localidades[0]);
            console.log(data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    
    return (
        <section className='containerPrincipal mainMensajeria'>
            <Menu selected="tienda" username={user ? user.username : "Invitado"}></Menu>
            <section className="contenedor box">
                <h2 className='tittle mb-5'>{t('tramitar')}</h2>
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
                                                            label={t('calle')}
                                                            className='w-100'
                                                            {...register('calle', { required: true })}
                                                    />
                                                    {errors.calle && <span className="text-warning">{t('calleError')}</span>}
                                                </div>
                                                <div className="mb-3 col-md-3 col-12">
                                                    <TextField 
                                                            id="outlined-basic" 
                                                            label={t('numero')} 
                                                            className='w-100'
                                                            {...register('numero', {
                                                                required: t('numberError'),
                                                                pattern: {
                                                                    value: /^[0-9a-zA-Z\s]*$/,
                                                                    message: t('numberErrorPattern'),
                                                                },
                                                            })}
                                                    />
                                                    {errors.numero && <span className="text-warning">{errors.numero.message}</span>}
                                                </div>
                                                <div className="mb-3 col-md-4 col-12">
                                                    <Select
                                                        labelId="provincia-label"
                                                        id="provincia-select"
                                                        value={selectedProvincia}
                                                        onChange={handleProvinciaChange }
                                                        label={t('pronvincia')}
                                                        className='w-100'
                                                        sx={{ color: 'white' }}
                                                    >
                                                        {provincias.map((provincia, index) => (
                                                            <MenuItem key={index} value={provincia}>{provincia}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    
                                                    {errors.provincia && <span className="text-warning">{t('pronvinciaError')}</span>}
                                                </div>
                                                <div className="mb-3 col-md-4 col-12">
                                                <Select
                                                    labelId="localidad-label"
                                                    id="localidad-select"
                                                    value={selectedLocalidad}
                                                    onChange={(e) => setSelectedLocalidad(e.target.value)}
                                                    label={t('localidad')}
                                                    className='w-100'
                                                    sx={{ color: 'white' }}
                                                >
                                                    {localidades && localidades.map((localidad, index) => (
                                                        <MenuItem key={index} value={localidad}>{localidad}</MenuItem>
                                                    ))}

                                                </Select>
                                                </div>
                                                <div className="mb-3 col-md-4 col-12">
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label={t('codigoPostal')} 
                                                        className='w-100'
                                                        {...register('codigoPostal', {
                                                            required: t('codigoPostalError'),
                                                            pattern: {
                                                                value: /^[0-9]{5}$/,
                                                                message: t('codigoPostalErrorPattern'),
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
                                        <Typography variant="h6" className='text-center fs-3'>{t('resumenPedido')}</Typography>
                                        <div className=' '>
                                            <Box my={2}>
                                                <Typography variant="subtitle1" className='border-bottom fw-bold text-end'>{t('pedidoInfo')}</Typography>
                                                <Typography>{t('calle')} {watch('calle')}</Typography>
                                                <Typography>{t('numero')}: {watch('numero')}</Typography>
                                                <Typography>{t('provincia')}: {selectedProvincia}</Typography>
                                                <Typography>{t('localidad')}: {selectedLocalidad}</Typography>
                                                <Typography>{t('codigoPostal')}: {watch('codigoPostal')}</Typography>
                                            </Box>
                                            <Box my={2}>
                                                <Typography variant="subtitle1" className='border-bottom fw-bold text-end'>{t('resumenPedido')}</Typography>
                                                {carrito.map(producto => (
                                                    <Box key={producto.id} my={1}>
                                                        <Typography>{t('nombre')}: {producto.nombre}</Typography>
                                                        <Typography>{t('cantidad')}: {producto.cantidad}</Typography>
                                                        <Typography>{t('precioTotal')}: {producto.precio * producto.cantidad}€</Typography>
                                                    </Box>
                                                ))}
                                                <Typography variant="h6" className='fw-bold text-end'>{t('precioTotalPedido')} {carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)}€</Typography>
                                            </Box>
                                        </div>
                                        <Link to="/clientes/descargarInfoPedido" state= {{carrito:carrito, direccion:objDireccion}}>
                                            <button className='carrito rounded-circle border-0' title='Ver carrito'>
                                                <i className="fa-regular fa-file-pdf" style={{ color: "#f8f8f8" }}></i>
                                            </button>
                                        </Link>
                                        
                                    </Box>
                                    )}
                                    
                                    {activeStep === 2 && (
                                        <Box>
                                            <PayPalComponent 
                                                key={refreshKey}
                                                monto={carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)} 
                                                direccion={direccion} 
                                                carrito={carrito} 
                                            />
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
                                        {t('anterior')}
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    
                                    {activeStep !== 2 &&  
                                        <Button onClick={handleNextStep}>{t('siguiente')}</Button>
                                    }
                                    
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
                </div>
                
            </section>
        </section>
    );
}
