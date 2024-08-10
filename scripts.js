document.addEventListener('DOMContentLoaded', function() {
    let sumaAcumulada = 0;
    const tabla = document.getElementById('sumaTabla').getElementsByTagName('tbody')[0];
    const botonAgregarFila = document.getElementById('agregarFila');
    const resultado = document.getElementById('resultado');

    cargarFilasGuardadas();

    botonAgregarFila.addEventListener('click', function() {
        agregarFila('', '');
        guardarFilas();
    });

    function agregarFila(nombre, valor) {
        let nuevaFila = tabla.insertRow();
        let celdaNombre = nuevaFila.insertCell(0);
        let celdaValor = nuevaFila.insertCell(1);
        let celdaAcciones = nuevaFila.insertCell(2);

        let inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.value = nombre;
        inputNombre.addEventListener('input', guardarFilas);
        celdaNombre.appendChild(inputNombre);

        let inputValor = document.createElement('input');
        inputValor.type = 'number';
        inputValor.step = 'any';
        inputValor.value = valor;
        inputValor.addEventListener('input', actualizarSuma);
        inputValor.addEventListener('input', guardarFilas);
        celdaValor.appendChild(inputValor);

        let botonEliminar = document.createElement('button');
        botonEliminar.className = 'delete-btn';
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
            tabla.deleteRow(nuevaFila.rowIndex - 1);
            guardarFilas();
            actualizarSuma();
        });
        celdaAcciones.appendChild(botonEliminar);
    }

    function actualizarSuma() {
        sumaAcumulada = 0;
        const filas = tabla.rows;

        for (let i = 0; i < filas.length; i++) {
            let valor = parseFloat(filas[i].cells[1].getElementsByTagName('input')[0].value);

            if (!isNaN(valor)) {
                sumaAcumulada += valor;
            }
        }

        // Formatear el resultado con separadores de miles
        resultado.textContent = `La suma de ganancias es: $${sumaAcumulada.toLocaleString('es-ES')}`;
    }

    function guardarFilas() {
        const datos = [];
        const filas = tabla.rows;

        for (let i = 0; i < filas.length; i++) {
            let nombre = filas[i].cells[0].getElementsByTagName('input')[0].value;
            let valor = filas[i].cells[1].getElementsByTagName('input')[0].value;

            datos.push({ nombre, valor });
        }

        localStorage.setItem('filasTabla', JSON.stringify(datos));
    }

    function cargarFilasGuardadas() {
        const filasGuardadas = localStorage.getItem('filasTabla');

        if (filasGuardadas) {
            const datos = JSON.parse(filasGuardadas);

            datos.forEach(dato => {
                agregarFila(dato.nombre, dato.valor);
            });

            actualizarSuma();
        }
    }
});

