const showProducts = () => {
    const route = '/api/productos';
    fetch(route).then((res) => res.json()).then((data) =>{
      if (data.products) {
        let html = `
          <table class="table table-dark">
            <thead><tr style="color: yellow;"> <th>Nombre</th> <th>Descripcion</th> <th>Código</th> <th>Foto</th> <th>Precio</th> <th>Stock</th><th>Acciones</th> </tr></thead><tbody>
        `;
        for (let product of data.products) {
          let id = product.id
          html += `<tr><td>${product.title}</td><td>${product.description}</td><td>${product.code}</td><td><img src="${product.thumbnail}" alt="Imagen del product" style="width: 4rem;"></td><td>${product.price}</td><td>${product.stock ? 'Si' : 'No'}</td>`;
          if (data.admin) {
            html += `<td><button>Actualizar</button><button onclick="delProduct(product.id)">Eliminar</button></td>`;
          }
        }
        html += `</tbody></table>`;
        document.getElementById('productList').innerHTML = html;
      }
    }).catch((error) => console.log(error));
  }
  
  const delProduct = (id) => {
    const route = `/api/productos/${id}`;
    alert(route);
  }
  
  showProducts()