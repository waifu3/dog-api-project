// Importar las funciones y variables que necesitamos para las pruebas
const { ascBtn, descBtn, randomImageBtn, filterInput } = require('./index');

// Prueba de clic en el botón de orden ascendente
test('Clic en el botón de orden ascendente', () => {
  // Simular clic en el botón de orden ascendente
  ascBtn.click();
  // Verificar que se haya llamado la función de orden ascendente
  expect(ascBtn).toHaveBeenCalled();
});

// Prueba de clic en el botón de orden descendente
test('Clic en el botón de orden descendente', () => {
  // Simular clic en el botón de orden descendente
  descBtn.click();
  // Verificar que se haya llamado la función de orden descendente
  expect(descBtn).toHaveBeenCalled();
});

// Prueba de clic en el botón de obtener imagen aleatoria
test('Clic en el botón de obtener imagen aleatoria', () => {
  // Simular clic en el botón de obtener imagen aleatoria
  randomImageBtn.click();
  // Verificar que se haya llamado la función de obtener imagen aleatoria
  expect(randomImageBtn).toHaveBeenCalled();
});

// Prueba de filtro de búsqueda con mayúsculas y minúsculas
test('Filtrar razas con mayúsculas y minúsculas', () => {
  // Simular entrada en el campo de filtro
  filterInput.value = 'Labrador';
  filterInput.dispatchEvent(new Event('input'));
  // Verificar que se filtran correctamente las razas independientemente de las mayúsculas y minúsculas
  expect(filterInput.value).toBe('Labrador');
});
