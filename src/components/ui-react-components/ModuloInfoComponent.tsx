import React, { useState } from "react";

export const ModuleForm = () => {
    return (
        <div>
            <div>
                <h3>Modulo</h3>
                <p>
                    <strong>Nombre:</strong>
                </p>
                <p>
                    <strong>Docente:</strong>
                </p>
                <p>
                    <strong>Tipo de Pago:</strong>
                </p>
                <p>
                    <strong>Monto de Pago:</strong>
                </p>
                <p>
                    <strong>Fechas:</strong>
                    <input type="datetime-local"
                        placeholder="Cronograma"></input>
                </p>
                <p>
                    <strong>Horario:</strong>
                </p>
                <p>
                    <strong>Contenido:</strong>
                </p>
            </div>
            <div>
                <p>
                    <strong>Archivo:</strong>
                    <input type="file"></input>
                </p>
            </div>
        </div>
    )
};