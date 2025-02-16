<?php
require '../../models/Cliente.php';
header('Content-Type: application/json; charset=UTF-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$tipo = $_REQUEST['tipo'];

// echo json_encode($_GET);
// exit;
try {
    switch ($metodo) {
        case 'POST':
            $cliente = new Cliente($_POST);
            switch ($tipo) {
                case '1':
                    $ejecucion = $cliente->guardar();
                    $mensaje = "Cliente Guardado correctamente";
                    $codigo = 1;
                    break;

                case '2':
                    $ejecucion = $cliente->modificar();
                    $mensaje = "Cliente Modificado correctamente";
                    $codigo = 2;
                    break;
                
                case '3':
                    $ejecucion = $cliente->eliminar();
                    $mensaje = "Cliente Eliminado correctamente";
                    $codigo = 3;
                    break;

                default:
                    $mensaje = "Acción no reconocida";
                    $codigo = 0;
                    break;
            }
            http_response_code(200);
            echo json_encode([
                "mensaje" => $mensaje,
                "codigo" => $codigo,
            ]);
            break;

        case 'GET':
            http_response_code(200);
            $cliente = new Cliente($_GET);
            $clientes = $cliente->buscar();
            echo json_encode($clientes);
            break;

        default:
            http_response_code(405);
            echo json_encode([
                "mensaje" => "Método no permitido",
                "codigo" => 9,
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "detalle" => $e->getMessage(),
        "mensaje" => "Error de ejecución",
        "codigo" => 0,
    ]);
}

exit;
