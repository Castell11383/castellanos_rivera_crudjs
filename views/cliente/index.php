<?php include_once '../../includes/header.php' ?>
<div class="container text-white">
    <h1 class="text-center">Formulario de clientes</h1>
    <div class="row justify-content-center mb-3 rounded">
        <form id="form" class="col-lg-8 border bg-dark bg-gradient text-white text-center p-3">
            <input type="hidden" name="cliente_id" id="cliente_id">
            <div class="row mb-3">
                <div class="col">
                    <label for="cliente_nombre">Nombre del cliente</label>
                    <input type="text" name="cliente_nombre" id="cliente_nombre" class="form-control" required>
                </div>
                <div class="col">
                    <label for="cliente_apellido">Apellido del cliente</label>
                    <input type="text" name="cliente_apellido" id="cliente_apellido" class="form-control" required>
                </div>
                <div class="col">
                    <label for="cliente_genero">Género</label>
                    <select name="cliente_genero" id="cliente_genero" class="form-control" required>
                        <option value="">Seleccione una opción</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>
            </div>
            <div class="row justify-content-center mb-3">
                <div class="col">
                    <button type="submit" id="btnGuardar" class="btn btn-primary w-100"><i class="bi bi-floppy-fill"></i> Guardar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnBuscar" class="btn btn-info w-100"><i class="bi bi-binoculars-fill"></i> Buscar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnModificar" class="btn btn-warning w-100"><i class="bi bi-back"></i> Modificar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnCancelar" class="btn btn-secondary w-100"><i class="bi bi-x-octagon-fill"></i> Cancelar</button>
                </div>
                <div class="col">
                    <button type="reset" id="btnLimpiar" class="btn btn-secondary w-100"><i class="bi bi-stars"></i> Limpiar</button>
                </div>
            </div>
        </form>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-8 table-responsive">
            <h2 class="text-center">Listado de clientes</h2>
            <table class="table table-bordered table-hover border-dark rounded" id="tablaClientes">
                <thead class="bg-secondary bg-gradient">
                    <tr>
                        <th>No.</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Genero</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody class="bg-white bg-gradient">
                    <tr>
                        <td colspan="5">No hay clientes disponibles</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<script defer src="../../src/js/funciones.js"></script>
<script defer src="../../src/js/cliente/index.js"></script>
<?php include_once '../../includes/footer.php' ?>