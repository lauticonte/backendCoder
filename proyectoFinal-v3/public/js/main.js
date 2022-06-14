const showProducts = () => {
  const route = '/api/productos';
  fetch(route).then((res) => res.json()).then((data) =>{
    if(data.user) {
      let html = `
        <table class="table table-dark">
          <thead><tr style="color: yellow;"> <th>Email</th> <th>Nombre</th> <th>Dirección</th> <th>Edad</th> <th>Teléfono</th> </tr></thead><tbody>
          <tr><td>${data.user.username}</td><td>${data.user.name}</td><td>${data.user.address}</td><td>${data.user.age}</td><td>${data.user.phone}</td>
        </tbody></table>
        <a href="/api/logout">Salir</a>
      `;
      document.getElementById('session').innerHTML = html;
    }
    else {
      let html = `<a href="/login.html">Inicia sesión</a> o <a href="/register.html">Registrate</a>`;
      document.getElementById('session').innerHTML = html;
    }
    if (data.productos) {
      let html = `<div class="product-list">`;

      // <thead><tr style="color: yellow;"> <th>Nombre</th> <th>Descripcion</th> <th>Código</th> <th>Foto</th> <th>Precio</th> <th>Stock</th> </tr></thead><tbody>
      for (let producto of data.productos) {
        let id = producto.id
        html += `
        <div class="product card">
            <div class="card-body d-flex flex-row">
                <img
                    src="${producto.thumbnail}"
                    alt="foto de un ${producto.title}"
                    width="150px"
                    class="rounded"
                    loading="async"
                />
                <div class="ms-3">
                    <h5 class="card-title mb-0 text-uppercase">${producto.title}</h5>
                    <p class="card-text">
                      <small class="text-muted">${producto.description}</small>
                    </p>
                    <p class="fs-3">$ ${producto.price} </p>
                </div>
                <div class="flex-grow-1 d-flex align-items-center justify-content-end">
                <form action="/api/carrito" method="POST">
                    <input type="text" class="d-none" name="productid" value="${producto._id}"/>
                    <button type="submit" class="btn btn-outline-primary">Agregar a carrito</button>
                </form>
            </div>
          </div>`;
      }
      document.getElementById('productList').innerHTML = html;
    }
  }).catch((error) => console.log(error));
}


showProducts()