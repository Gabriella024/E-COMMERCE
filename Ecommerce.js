let data = [];
let suma = 0;

const container = document.querySelector('.containerProducts')

const dataFetch = () => {

  fetch(`https://fakestoreapi.com/products`)
    .then(res => res.json())
    .then(products => {
      data = products;
      products.forEach((producto, index) => {
        container.innerHTML += createHTMLComponents(producto, index)
      });
    }
    )
}

const createHTMLComponents = (producto, index) => {
  return `
  <div class="card" style="width: 18rem;">
    <p class="card-text cardText">${producto.id}</p>
    <div>
      <img src="${producto.image}" class="card-img-top imgProducts" alt="...">
    </div>
    <div class="card-body">
      <h5 class="card-title cardTitle">${producto.title}</h5>
    </div>
    <div class="card-footer cardFooter">
      <button class="btnAddtoCart" onclick="presionarParaEnviarCarrito(${index})">
        <img class="imgAddToCart" width="220px" src="/image/addToCart.png">
      <button class="btnAddtoCart" onclick="presionarParaVerMasInformacion(${index})">
        <img class="imgAddToCart" width="210px" src="/image/chekout.png">
      </button>
      </div>
    </div>
  </div>
  `
}

let arrProduct = []

function addElementsToShoppingCar() {
  const contenedor = document.querySelector('.contenedor')
  const carritoHTML = arrProduct.map(createShoppingCarComponents).join('')
  contenedor.innerHTML = carritoHTML
}

// function sumarPrecio(index) {
//   suma += data[index].price
//   const totalPrice = document.querySelector('.totalPrice')

//   totalPrice.innerText = `Total: $${suma}`
// }

function presionarParaEnviarCarrito(index) {
  suma += data[index].price
  const totalPrice = document.querySelector('.totalPrice')
  console.log(suma)

  arrProduct.push(data[index]);
  const cantidadDeProductosEnCarrito = document.querySelector('.cantidadDeProductosEnCarrito');
  cantidadDeProductosEnCarrito.innerText = `(${arrProduct.length})`

  addElementsToShoppingCar()

  // totalPrice.innerText = `Total: $${suma}`
}

const createShoppingCarComponents = (dataProductos, index) => {
  return `
  <div class="cardSCart mb-3 cardSCart" style="max-width: 540px;">
    <div class="row g-0 productosRow">
    <p class="card-text cardId">${dataProductos.id}</p>
    <div class="col-md-4">
        <img src="${dataProductos.image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title cardTitleCar">${dataProductos.title}</h5>
          <p class="card-text priceDollar">
            <img width="15px" src="/image/dollar.png" style="filter: brightness(1) invert(1);">
            ${dataProductos.price}</p>
        </div>
        <button class="btnAddtoCart" onclick="btnAgregarProductoAlCarro(${index})">
          <img class="imgAddToCart" width="50px" src="/image/success.png">
        </button>
        <button class="btnAddtoCart" onclick="btnEliminarProductoDelCarro(${index})">
          <img class="imgAddToCart" width="50px" src="/image/error.png">
        </button>
      </div>
  </div>
  `
}

function btnAgregarProductoAlCarro(index) {
  arrProduct.push(arrProduct[index])
  const cantidadDeProductosEnCarrito = document.querySelector('.cantidadDeProductosEnCarrito');
  cantidadDeProductosEnCarrito.innerText = `(${arrProduct.length})`
  addElementsToShoppingCar()

  suma += arrProduct[index].price
  const totalPrice = document.querySelector('.totalPrice')

  totalPrice.innerText = `Total: $${suma}`
}

function btnEliminarProductoDelCarro(index) {
  suma -= arrProduct[index].price
  const totalPrice = document.querySelector('.totalPrice')

  totalPrice.innerText = `Total: $${suma}`

  arrProduct.splice(index, 1)
  const cantidadDeProductosEnCarrito = document.querySelector('.cantidadDeProductosEnCarrito');
  cantidadDeProductosEnCarrito.innerText = `(${arrProduct.length})`
  addElementsToShoppingCar()
}

function presionarParaVerMasInformacion(index) {
  window.localStorage.setItem('producto', JSON.stringify(data[index]))

  location.href = 'verMas/verMas.html'
}

const btnSearch = document.querySelector('.btnSearch');

btnSearch.addEventListener('click', (e) => {
  const btnSearchInput = document.querySelector('.btnSearchInput').value.toLowerCase();

  const search = data.filter((clothes) =>
    clothes.title.toLowerCase().includes(btnSearchInput))

  container.innerHTML = '';

  if (!btnSearchInput) {
    alert('Please enter something');
  }

  if (search.length > 0) {
    e.preventDefault()
    search.forEach((producto, index) => {
      container.innerHTML += createHTMLComponents(producto, index)
    });
  }
})

dataFetch()