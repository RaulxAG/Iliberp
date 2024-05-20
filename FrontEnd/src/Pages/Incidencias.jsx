import Menu from "../components/Menu";
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";

// contenedor mainIncidencias 
// contenedor
export default function Incidencias() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialCategoria = searchParams.get('categoria') || ''; // Get initial category from URL params

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            categoria: initialCategoria // Set default value for categoria
        }
    });

    const onSubmit = data => console.log(data);

    useEffect(() => {
        // Update categoria when location changes
        const newCategoria = searchParams.get('categoria') || '';
        setValue('categoria', newCategoria);
    }, [location, setValue, searchParams]);

    return (
        <main className="containerPrincipal mainIncidencias">
            <Menu selected="incidencias"></Menu>
            <form onSubmit={handleSubmit(onSubmit)} method="post" className="mainIncidencias__formulario contenedor flex-row">
                <section className="box col-9">
                    <h4 className="tittle fs-3 mb-5">Reportar una incidencia</h4>

                    <input type="text" name="cliente" value={1} hidden id="cliente" {...register("cliente", { required: true })}/>

                    <div className="px-5"> 
                        <div className="formulario__input">
                            <label htmlFor="descripcion">Motivo de tu incidencia</label>
                            <input type="text" name="descripcion" id="descripcion" {...register("descripcion", { required: true })}/>
                            {errors.descripcion && <span className="text-warning">Debes indicar el motivo</span>}
                        </div>
                        <div className="formulario__inputGroup">
                            <div className="formulario__input">
                                <label htmlFor="categoria">Categoría</label>
                                <select name="categoria" id="categoria" {...register("categoria", { required: true })}>
                                    <option value="Ciberseguridad">Ciberseguridad</option>
                                    <option value="Programacion">Programación</option>
                                    <option value="Telefonía">Telefonía</option>
                                    <option value="Sistemas">Sistemas</option>
                                    <option value="Taller">Taller</option>
                                    <option value="Web">Web</option>
                                </select>
                                {errors.categoria && <span className="text-warning">Selecciona una categoría</span>}
                            </div>
                        </div>
                        <div className="formulario__input">
                            <label htmlFor="observaciones">Descripción de tu incidencia:</label>
                            <textarea name="observaciones" id="observaciones" cols="30" rows="10" {...register("observaciones")}></textarea>
                        </div>
                    </div>
                </section>

                <section className="formulario__acciones">
                    <figure className="d-flex align-items-md-center justify-content-center">
                        <img src="/assets/img/logo.png" alt="Logo" />
                        <article className="d-none d-lg-block">
                            <p className="fs-3 fw-bold">ILIBERP</p>
                            <p>Solutions</p>
                        </article>
                    </figure>

                    <div>
                        <input type="submit" value="Enviar" id="submit" />
                        <input type="reset" value="Vaciar" id="reset" />
                    </div>
                </section>
            </form>
        </main>
    );
}
