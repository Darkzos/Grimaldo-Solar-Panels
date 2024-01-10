const apiKey = 'cbac31133b81c30bacff1cb03f92be12';
const urlBase = "https://api.openweathermap.org/data/2.5/weather?";

// Función para obtener la ubicación del usuario y luego la información del clima
export function ubicacionYClima() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitud = position.coords.latitude;
                const longitud = position.coords.longitude;

                climaPorCoordenadas(latitud, longitud);
            },
            function (error) {
                console.error('Error al obtener la ubicación:', error);
                // En caso de error se establece manualmente la ubicación predeterminada en este caso usamos Mérida ya que la empresa tiene sede en esta localidad
                obtenerClimaPorCiudad('Merida');
            }
        );
    } else {
        console.error('Geolocalización no es compatible en este navegador');
        // En caso de que la geolocalización no esté disponible, establecer manualmente la ubicación predeterminada (Mérida)
        obtenerClimaPorCiudad('Merida');
    }
}

// Función para obtener información del clima usando coordenadas
function climaPorCoordenadas(latitud, longitud) {
    const apiUrl = `${urlBase}lat=${latitud}&lon=${longitud}&appid=${apiKey}`;
    informacionClima(apiUrl);
}

// Función para obtener información del clima por ciudad
function obtenerClimaPorCiudad(ciudad) {
    const apiUrl = `${urlBase}q=${ciudad}&appid=${apiKey}`;
    informacionClima(apiUrl);
}

// Función para obtener información del clima y mostrarla en el DOM
function informacionClima(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener información del clima. Código de error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const kelvin = data.main.temp;
            const celsius = parseInt(kelvin - 273.15);
            const climaInfo = `Temperatura: ${celsius}°C`;

            // Añadir el icono del clima
            const iconoClima = data.weather[0].icon;
            const iconoUrl = `http://openweathermap.org/img/w/${iconoClima}.png`;
            const iconoHTML = `<img src="${iconoUrl}" alt="Icono del clima">`;

            // Mostrar la información del clima y el icono en el DOM
            mostrarClima(`${climaInfo} ${iconoHTML}`);
        })
        .catch(error => {
            console.error(error.message);
            // Puedes manejar el error de manera más elegante, por ejemplo, mostrando un mensaje al usuario.
        });
}

// Función para mostrar la información del clima en el DOM
function mostrarClima(climaInfo) {
    document.getElementById("clima-icon").innerHTML = climaInfo;
}
