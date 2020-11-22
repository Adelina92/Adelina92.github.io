const BUDGET = 300;
const cart = [];

{
  class ShoppingCard extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      const content = document.importNode(
        document.querySelector("#temp-card").content,
        true
      );
      shadow.appendChild(content);

      this.price = Number(this.querySelector("[slot=price]").textContent);
      this.title = this.querySelector("[slot=title]").textContent;

      const list = document.getElementById("shopping-list");
      const listTotalTitle = document.getElementById("shopping-list-total");

      shadow.querySelector("button").addEventListener("click", () => {
        
        const sum = cart.reduce((acc, cur) => acc + cur.price, 0);
        if ((sum + this.price) <= BUDGET) {
          cart.push({
            title: this.title,
            price: this.price,
          })
          const element = document.createElement("li");
          element.innerText = `Позиция: ${this.title}, цена: ${this.price}.`
          list.appendChild(element); 

          listTotalTitle.innerText = sum + this.price;
        } else {
          alert("Не можем добавить!");
        }
        
      })
    }
  }
  window.customElements.define("shopping-card", ShoppingCard);
}

const cardHolder = document.querySelector(".shopping-cards");
fetch("https://kodaktor.ru/cart_data.json")
  .then((response) => response.json())
  .then((data) => {
    let content = "";
    Object.keys(data).forEach((key) => {
      content += `
        <shopping-card>
            <span slot="title">${key}</span>
            <span slot="price">${data[key]}</span>
        </shopping-card>
        `;
    });
    cardHolder.innerHTML = content;
  });
