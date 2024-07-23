const btnGuardar = document.getElementById('btnGuardar')
const btnModificar = document.getElementById('btnModificar')
const btnBuscar = document.getElementById('btnBuscar')
const btnCancelar = document.getElementById('btnCancelar')
const btnLimpiar = document.getElementById('btnLimpiar')
const tablaCliente = document.getElementById('tablaCliente')
const formulario = document.querySelector('form')

btnModificar.parentElement.style.display = 'none'
btnCancelar.parentElement.style.display = 'none'

const getCliente = async () => {
    const nombre = formulario.cliente_nombre.value
    const apellido = formulario.cliente_apellido.value
    const genero = formulario.cliente_genero.value
    const url = `/castellanos_rivera_crudjs/controllers/cliente/index.php?cliente_nombre=${nombre}&cliente_apellido=${apellido}&cliente_genero=${genero}`
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        tablaClientes.tBodies[0].innerHTML = ''
        const fragment = document.createDocumentFragment()
        let contador = 1;
        console.log(data);
        if (respuesta.status == 200) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: 'Clientes encontrados',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();

            if (data.length > 0) {
                data.forEach(cliente => {
                    const tr = document.createElement('tr')
                    const celda1 = document.createElement('td')
                    const celda2 = document.createElement('td')
                    const celda3 = document.createElement('td')
                    const celda4 = document.createElement('td')
                    const celda5 = document.createElement('td')
                    const buttonModificar = document.createElement('button')
                    const buttonEliminar = document.createElement('button')

                    celda1.innerText = contador;
                    celda2.innerText = cliente.cliente_nombre;
                    celda3.innerText = cliente.cliente_apellido;
                    celda3.innerText = cliente.cliente_genero;


                    buttonModificar.textContent = 'Modificar'
                    buttonModificar.classList.add('btn', 'btn-warning', 'w-100')

                    buttonEliminar.textContent = 'Eliminar'
                    buttonEliminar.classList.add('btn', 'btn-danger', 'w-100')

                    celda4.appendChild(buttonModificar)
                    celda5.appendChild(buttonEliminar)

                    tr.appendChild(celda1)
                    tr.appendChild(celda2)
                    tr.appendChild(celda3)
                    tr.appendChild(celda4)
                    tr.appendChild(celda5)
                    fragment.appendChild(tr);

                    contador++
                });

            } else {
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerText = 'No hay clientes disponibles'
                td.colSpan = 5;

                tr.appendChild(td)
                fragment.appendChild(tr)
            }
        } else {
            // console.log('hola');
        }

        tablaClientes.tBodies[0].appendChild(fragment)
    } catch (error) {
        console.log(error);
    }
}

async function getClientes() {
    console.log("Clientes obtenidos");
}getClientes();

async function guardarClientes(e) {
    e.preventDefault()
    btnGuardar.disabled = true

    const url = '/castellanos_rivera_crudjs/controllers/cliente/index.php'
    const formData = new FormData(formulario)
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
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
            }
        }).fire()
        alert(mensaje)
        console.log(data)
        if (codigo == 1 && respuesta.status == 200) {
            getClientes()
            formulario.reset()
        } else {
            console.log(detalle)
        }

    } catch (error) {
        console.log(error)
    }
    btnGuardar.disabled = false
}

formulario.addEventListener('submit', guardarClientes)
btnBuscar.addEventListener('click', getCliente)