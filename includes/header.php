<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <title>App de Tienda - CRUD JS</title>
</head>
<style>
    /* Configuración del cuerpo */
    body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }
    body {
        background: linear-gradient(45deg, #1f2a38, #4a5d81, #7f9ab3, #1f2a38);
        background-size: 400% 400%;
        animation: gradientAnimation 10s ease infinite;
    }
    @keyframes gradientAnimation {
        0% {
            background-position: 0% 0%;
        }

        50% {
            background-position: 100% 100%;
        }

        100% {
            background-position: 0% 0%;
        }
    }
</style>

<body>

    <?php include_once 'navbar.php' ?>