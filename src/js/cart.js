import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {

  const groupProducts = (products) => {
    const totalPorId = products.reduce((carry, product) => {
      if (!carry[product.Id]) {
        carry[product.Id] = { ...product, quantity: 0 };
      }
    
      // Incrementar la cantidad
      carry[product.Id].quantity++;
    console.log(carry);
      return carry;
    }, {});
    
    // Convertir el objeto de totales de nuevo a un array
    const resultado = Object.values(totalPorId);

    return resultado;
  };

  const cartItems = groupProducts(getLocalStorage("so-cart") || []);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const totalItems = cartItems.reduce((total, item) => {return total + item.quantity}, 0);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelector(".list-total").innerHTML = `Total: ${totalItems}`;

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryLarge}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
