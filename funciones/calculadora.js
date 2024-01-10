// Función para mostrar la calculadora en el lateral
export function mostrarCalculadora() {
    const calculadoraLateral = document.getElementById('calculadora-lateral');
    calculadoraLateral.style.display = 'block';
}

// Función para calcular el número de paneles solares necesarios
export function calcularConsumo() {
    const refrigerador = parseInt(document.getElementById('refrigerador').value) || 0;
    const aires = parseInt(document.getElementById('aires').value) || 0;
    const televisiones = parseInt(document.getElementById('televisiones').value) || 0;

    // Lógica de cálculo (puedes ajustarla según tus necesidades)
    const consumoTotal = (refrigerador * 5) + (aires * 10) + (televisiones * 3);

    document.getElementById('resultado').textContent = `Tu consumo aproximado es de ${consumoTotal.toFixed(2)} kWh por día.`;
}

window.mostrarCalculadora = mostrarCalculadora;
window.calcularConsumo = calcularConsumo;
