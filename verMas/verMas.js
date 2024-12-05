const container = document.querySelector('.conteiner');
const producto = JSON.parse(window.localStorage.getItem('producto'))

const createHTMLComponents = (data) => {
  return `
  <div class="container"> 
    <div class="card mb-3 mx-auto" style="max-width: 1350px; height: 531.5px;">
      <div class="row g-0">
        <div class="col-md-4 d-flex justify-content-center">
        <img src="${data.image}" class="img-fluid" alt="imagen del producto" style="width: 435px; height: 530px;"></img>
        </div>
        <div class="col-md-8">
          <p class="card-text codigo">${data.id}</p>
          <div class="card-body d-flex align-items-center" style="height: 460px;">
            <div class="d-flex flex-column">
              <h5 class="card-title titulo">${data.title}</h5>
              <p class="card-text descripcion">${data.description}</p>
              <div class="informacion"> 
                <p class="card-text cardData">
                  <img src="/image/piggy-bank.svg" alt="precio" class="img-informacion">
                  Count: ${data.rating["count"]}</p>
                <p class="card-text cardData">
                  <img src="/image/star-fill.svg" alt="venta" class="img-informacion">
                  Rate: ${data.rating["rate"]}</p>
                <p class="card-text cardData">
                  <img src="/image/currency-dollar.svg" alt="star" class="img-informacion">
                  Price: ${data.price}</p>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
    `
}
container.innerHTML = createHTMLComponents(producto);