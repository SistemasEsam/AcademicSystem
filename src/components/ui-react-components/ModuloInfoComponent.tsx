import React, { useState, useEffect } from "react";
import { infoProgramas } from "../../api/infoModulosPrueba";

// Definir el tipo de los módulos del programa
interface Module {
    id: string;
    nombre: string;
    docente: string;
    facturacion: string;
    monto_a_pagar: number;
    hora_inicio: string;
    hora_fin: string;
    fecha_de_clases: string[];
    contenido_minimo: string;
}

interface Program {
    id_programa: number;
    modulos: Module[];
}

interface ModuleFormProps {
    id_programa: number;
    enabled: boolean; // Nueva propiedad para habilitar o deshabilitar el selector
}

export const ModuleForm: React.FC<ModuleFormProps> = ({ id_programa, enabled }) => {
    const [programModules, setProgramModules] = useState<Module[] | null>(null);
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);

    useEffect(() => {
        // Buscar el programa por id_programa y cargar sus módulos
        const program = infoProgramas.find((program) => program.id_programa === id_programa);
        setProgramModules(program ? program.modulos : null);
        setSelectedModule(null);
    }, [id_programa]);

    const handleModuleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const moduleId = event.target.value;
        const module = programModules?.find((mod) => mod.id === moduleId) || null;
        setSelectedModule(module);
    };

    return (
        <div>
            <h3>Seleccionar Módulo</h3>
            {programModules ? (
                <select
                    onChange={handleModuleSelect}
                    name="module_select"
                    disabled={!enabled} // Deshabilitar el selector si no está habilitado
                >
                    <option value="">Seleccionar Módulo</option>
                    {programModules.map((modulo) => (
                        <option key={modulo.id} value={modulo.id}>
                            {modulo.nombre}
                        </option>
                    ))}
                </select>
            ) : (
                <p>No se encontraron módulos para este programa.</p>
            )}

            {selectedModule && (
                <div>
                    <h4>Información del Módulo Seleccionado:</h4>
                    <p><strong>Nombre:</strong> {selectedModule.id+"-"+ selectedModule.nombre}</p>
                    <p><strong>Docente:</strong> {selectedModule.docente}</p>
                    <p><strong>Facturación:</strong> {selectedModule.facturacion}</p>
                    <p><strong>Monto a Pagar:</strong> {selectedModule.monto_a_pagar}</p>
                    <p><strong>Hora Inicio:</strong> {selectedModule.hora_inicio}</p>
                    <p><strong>Hora Fin:</strong> {selectedModule.hora_fin}</p>
                    <p><strong>Contenido Mínimo:</strong> {selectedModule.contenido_minimo}</p>
                    <p><strong>Sesiones:</strong></p>
                        <ul>
                        {selectedModule.fecha_de_clases.map((sesion, indice)=>(
                                <li key={indice}>
                                    Sesión {indice +1} : {selectedModule.hora_inicio}-{selectedModule.hora_fin}   {sesion}</li>
                            ))}
                        </ul>
                </div>
            )}
            <button type="submit">Invitación</button>
            <button type="submit">Pago</button>
        </div>
    );
};
