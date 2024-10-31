<?php
include "./conexion/conexion.php";

$id_asesor = htmlentities(addslashes($_POST['id_asesor']));
$date = new DateTime();
$date->format("d-m-Y H:i:s");


try {
    $query = "INSERT INTO docentes (apellidoMaterno, apellidoPaterno, nombres, numeroReferencia, correo, telefono, idPais, idDocumento, numeroDocumento, fechaNacimiento, ciudadRadicacion,
                                                                genero, direccion, createdAt, actualizedAt, extension, rutaCv, fotografia, complemento) 
                    VALUES('$date', '$date')";
    $result = $con->query($query);

    $count = $result->rowCount();

    if ($count != 0) { ?>

        <script>
            alert("Se ha registrado correctamente");
            <?php exit; ?>
            window.location.href = "/perfil/";
        </script>
    <?php } else { ?>

        <script>
            alert("Se ha producido un error al generar la comisión.");
            <?php exit; ?>
            window.location.href = "/perfil/";
        </script>
    <?php }
} catch (Exception $e) {
    echo '' . $e->getMessage() . '';
} finally {
    $con = null;
}