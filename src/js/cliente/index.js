const btnGuardar = document.getElementById('btnGuardar')
const btnModificar = document.getElementById('btnModificar')
const btnBuscar = document.getElementById('btnBuscar')
const btnCancelar = document.getElementById('btnCancelar')
const btnLimpiar = document.getElementById('btnLimpiar')
const tablaCliente = document.getElementById('tablaClientes')
const formulario = document.querySelector('form')

btnModificar.parentElement.style.display = 'none'
btnCancelar.parentElement.style.display = 'none'

const getCliente = async (alerta='si') => {
    const nombre = formulario.cliente_nombre.value
    const apellido = formulario.cliente_apellido.value
    const genero = formulario.cliente_genero.value
    const url = `/Ejercicio_No.002-CRUD-JS-22JUL2024/castellanos_rivera_crudjs/controllers/cliente/index.php?cliente_nombre=${nombre}&cliente_apellido=${apellido}&cliente_genero=${genero}`
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        // console.log(respuesta)
        const data = await respuesta.json();
        tablaCliente.tBodies[0].innerHTML = ''
        const fragment = document.createDocumentFragment()
        let contador = 1;
        console.log(data);
        if (respuesta.status == 200) {
            if(alerta == 'si'){
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    icon: "success",
                    title: 'Clientes encontrados',
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire();
            }
           

            if (data.length > 0) {
                data.forEach(cliente => {
                    const tr = document.createElement('tr')
                    const celda1 = document.createElement('td')
                    const celda2 = document.createElement('td')
                    const celda3 = document.createElement('td')
                    const celda4 = document.createElement('td')
                    const celda5 = document.createElement('td')
                    const celda6 = document.createElement('td')
                    const buttonModificar = document.createElement('button')
                    const buttonEliminar = document.createElement('button')

                    celda1.innerText = contador;
                    celda2.innerText = cliente.cliente_nombre;
                    celda3.innerText = cliente.cliente_apellido;
                    celda4.innerText = cliente.cliente_genero;


                    buttonModificar.textContent = 'Modificar'
                    buttonModificar.classList.add('btn', 'btn-success', 'w-100')
                    buttonModificar.innerHTML = '<i class="bi bi-back"></i> Modificar'
                    buttonModificar.addEventListener('click', () => llenarDatos(cliente))

                    buttonEliminar.textContent = 'Eliminar'
                    buttonEliminar.classList.add('btn', 'btn-danger', 'w-100')
                    buttonEliminar.innerHTML = '<i class="bi bi-person-x-fill"></i> Eliminar'
                    buttonEliminar.addEventListener('click', () => EliminarClientes(cliente.cliente_id))

                    celda5.appendChild(buttonModificar)
                    celda6.appendChild(buttonEliminar)

                    tr.appendChild(celda1)
                    tr.appendChild(celda2)
                    tr.appendChild(celda3)
                    tr.appendChild(celda4)
                    tr.appendChild(celda5)
                    tr.appendChild(celda6)
                    fragment.appendChild(tr);

                    contador++
                });

            } else {
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerText = 'No hay clientes disponibles'
                td.classList.add('text-center')
                td.colSpan = 6;

                tr.appendChild(td)
                fragment.appendChild(tr)
            }
        } else {
            // console.log('hola');
        }

        tablaCliente.tBodies[0].appendChild(fragment)
    } catch (error) {
        // console.log(error);
    }
}


const llenarDatos = (cliente) => {

    // console.log(cliente)
    formulario.cliente_id.value = cliente.cliente_id
    formulario.cliente_nombre.value = cliente.cliente_nombre
    formulario.cliente_apellido.value = cliente.cliente_apellido
    formulario.cliente_genero.value = cliente.cliente_genero

    btnModificar.parentElement.style.display = ''
    btnCancelar.parentElement.style.display = ''
    btnGuardar.parentElement.style.display = 'none'
    btnBuscar.parentElement.style.display = 'none'
    btnLimpiar.parentElement.style.display = 'none'

}

const ModificarClientes = async (e) => {
    e.preventDefault()
    btnModificar.disabled = true

    const url = '/Ejercicio_No.002-CRUD-JS-22JUL2024/castellanos_rivera_crudjs/controllers/cliente/index.php'
    const formData = new FormData(formulario)
    // console.log(formulario);
    formData.append('tipo', 2)
    const config = {
        method: 'POST',
        body: formData
    }

    try {
        const respuesta = await fetch(url, config)
        const data = await respuesta.json()
        const { mensaje, codigo, detalle } = data
        console.log(data)
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
            }
        }).fire()
        alert(mensaje)
        if (codigo == 2 && respuesta.status == 200) {
            formulario.reset()
            getCliente(alerta='no');
            btnModificar.parentElement.style.display = 'none'
            btnCancelar.parentElement.style.display = 'none'
            btnGuardar.parentElement.style.display = ''
            btnBuscar.parentElement.style.display = ''
            btnLimpiar.parentElement.style.display = ''
        } else {
            console.log(detalle)
        }

    } catch (error) {
        console.log(error)
    }
    btnModificar.disabled = false
}

const guardarClientes = async (e) => {
    e.preventDefault()
    btnGuardar.disabled = true

    const url = '/Ejercicio_No.002-CRUD-JS-22JUL2024/castellanos_rivera_crudjs/controllers/cliente/index.php'
    const formData = new FormData(formulario)
    // console.log(formulario);
    formData.append('tipo', 1)
    formData.delete('cliente_id')
    const config = {
        method: 'POST',
        body: formData
    }

    try {
        const respuesta = await fetch(url, config)
        const data = await respuesta.json()
        const { mensaje, codigo, detalle } = data
        console.log(data)
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
            }
        }).fire()
        alert(mensaje)
        if (codigo == 1 && respuesta.status == 200) {
            formulario.reset()
            getCliente(alerta='no');
        } else {
            console.log(detalle)
        }

    } catch (error) {
        console.log(error)
    }
    btnGuardar.disabled = false
}

const cancelar = () => {
    formulario.reset()
    getCliente();
    btnModificar.parentElement.style.display = 'none'
    btnCancelar.parentElement.style.display = 'none'
    btnGuardar.parentElement.style.display = ''
    btnBuscar.parentElement.style.display = ''
    btnLimpiar.parentElement.style.display = ''
}

 const EliminarClientes = async (cliente) => {

    console.log(cliente)

    const url = '/Ejercicio_No.002-CRUD-JS-22JUL2024/castellanos_rivera_crudjs/controllers/cliente/index.php'
    const formData = new FormData(formulario)
    // console.log(formulario);
    formData.append('tipo', 3)
    formData.append('cliente_id', cliente)
    const config = {
        method: 'POST',
        body: formData
    }

    try {
        const respuesta = await fetch(url, config)
        const data = await respuesta.json()
        const { mensaje, codigo, detalle } = data
        console.log(data)
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
            }
        }).fire()
        alert(mensaje)
        if (codigo == 3 && respuesta.status == 200) {
            formulario.reset()
            getCliente(alerta='no');
            btnModificar.parentElement.style.display = 'none'
            btnCancelar.parentElement.style.display = 'none'
            btnGuardar.parentElement.style.display = ''
            btnBuscar.parentElement.style.display = ''
            btnLimpiar.parentElement.style.display = ''
        } else {
            console.log(detalle)
        }

    } catch (error) {
        console.log(error)
    }
    btnModificar.disabled = false
}

getCliente();


formulario.addEventListener('submit', guardarClientes)
btnModificar.addEventListener('click', ModificarClientes)
btnBuscar.addEventListener('click',() => { getCliente(alerta='si') } )
btnCancelar.addEventListener('click', cancelar)