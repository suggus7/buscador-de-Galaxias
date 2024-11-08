// Función para realizar la búsqueda en la API de la NASA
function buscarImagenes() {
    const searchTerm = document.getElementById('inputBuscar').value.trim();
  
    // URL de la API con el término de búsqueda ingresado por el usuario
    const apiUrl = `https://images-api.nasa.gov/search?q=${searchTerm}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        mostrarResultados(data.collection.items);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }
  
  // Función para mostrar los resultados en formato tarjeta
  function mostrarResultados(resultados) {
    const contenedorResultados = document.getElementById('resultados');
    contenedorResultados.innerHTML = '';
  
    if (resultados.length === 0) {
      contenedorResultados.innerHTML = '<p class="text-muted">No se encontraron resultados.</p>';
      return;
    }
  
    // Recorrer cada resultado y crear la tarjeta
    resultados.forEach(item => {
      const { title, description, date_created } = item.data[0];
      const imageUrl = item.links ? item.links[0].href : ''; 
  
      // HTML de la tarjeta
      const card = document.createElement('div');
      card.className = 'card';
      card.style.width = '18rem';
      card.innerHTML = `
        <img src="${imageUrl}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description || 'Sin descripción disponible.'}</p>
          <p class="card-text"><small class="text-muted">${new Date(date_created).toLocaleDateString()}</small></p>
        </div>
      `;
  
      // Añadir la tarjeta al contenedor de resultados
      contenedorResultados.appendChild(card);
    });
  }
  
  // Asignar el evento de clic al botón de búsqueda
  document.getElementById('btnBuscar').addEventListener('click', buscarImagenes);
  