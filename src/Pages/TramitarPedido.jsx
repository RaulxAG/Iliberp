import React, { useState } from 'react';
import Menu from '../Components/Menu'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const steps = ['Información de envío', 'Información de pago', 'Resumen'];

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
    return (
        <div className='containerPrincipal'>
            <Menu selected="incidencias"></Menu>
            <div className="contenedor box">
                <h2 className='tittle mb-5'>Tramitar pedido</h2>
                <div className='containerTramite box w-75 mx-auto'>
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
                                <div className='p-4'>
                                    {activeStep === 0 && (
                                        <Box>
                                            {/* Información de envío */}
                                            <form className='row'>
                                                <div className="mb-3 col-9">
                                                    <TextField id="outlined-basic" label="Calle" className='w-100'/>
                                                </div>
                                                <div className="mb-3 col-3">
                                                    <TextField id="outlined-basic" label="Número, piso, portal..." className='w-100'/>
                                                </div>
                                                <div className="mb-3 col-4">
                                                    <TextField id="outlined-basic" label="Provincia" className='w-100'/>
                                                </div>
                                                <div className="mb-3 col-4">
                                                    <TextField id="outlined-basic" label="Localidad" className='w-100'/>
                                                </div>
                                                <div className="mb-3 col-4">
                                                    <TextField id="outlined-basic" label="Código postal" className='w-100'/>
                                                </div>
                                            </form>
                                        </Box>
                                    )}
                                    {activeStep === 1 && (
                                        <Box>
                                            {/* Información de pago */}
                                            <div className='containerTarjetaCredito row d-flex justify-content-around my-3'>
                                                <div className="tarjetaCredito col-5">
                                                    <p className='h2'>123 456 789 012</p>
                                                    <p className='h2'>09/23</p>
                                                    <p>JUDITH MANJON FERNANDEZ</p>
                                                </div>
                                                <form action="" className='row justify-content-between col-6'>
                                                    <div className="mb-3 col-12">
                                                        <TextField id="outlined-basic" label="Número de la tarjeta" className='w-100'/>
                                                    </div>
                                                    <div className="mb-3 col-12">
                                                        <TextField id="outlined-basic" label="Nombre del titular" className='w-100'/>
                                                    </div>
                                                    <div className='col-8 row'>
                                                        <div className="mb-3 col-4">
                                                            <TextField id="outlined-basic" label="MM" className='w-100'/>
                                                        </div>
                                                        <div className="mb-3 col-4">
                                                            <TextField id="outlined-basic" label="YY" className='w-100'/>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="mb-3 col-4">
                                                        <TextField id="outlined-basic" label="CVV" className='w-100'/>
                                                    </div>
                                                </form>
                                            </div>
                                        </Box>
                                    )}
                                    {activeStep === 2 && (
                                        <Box>
                                            {/* Resumen */}
                                            <Typography>Resumen de la compra (Articulos comprados, info envio...)</Typography>
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
                                    <Button onClick={handleNext}>
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
