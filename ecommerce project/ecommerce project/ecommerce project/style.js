// Cart System
let cartItems = [];

document.addEventListener("DOMContentLoaded", () => {
  // Add "Add to Cart" buttons
  const products = document.querySelectorAll(".col-4");
  products.forEach((product, index) => {
    const priceText = product.querySelector("p").innerText;
    const price = parseInt(priceText.replace("₹", ""));
    const name = product.querySelector("h4").innerText;

    // Add button
    const btn = document.createElement("button");
    btn.innerText = "Add to Cart";
    btn.style.marginTop = "10px";
    btn.classList.add("btn");
    product.appendChild(btn);

    btn.addEventListener("click", () => {
      cartItems.push({ name, price });
      alert(`${name} added to cart!`);
    });
  });

  // Add sort dropdown
  const container = document.querySelector(".small-container");
  const sortBox = document.createElement("select");
  sortBox.innerHTML = `
    <option value="">Sort by Price</option>
    <option value="low">Low to High</option>
    <option value="high">High to Low</option>
  `;
  sortBox.style.margin = "20px 17px";
  container.prepend(sortBox);

  sortBox.addEventListener("change", (e) => {
    const value = e.target.value;
    const row = document.querySelectorAll(".small-container .row");

    row.forEach((r) => {
      const cols = Array.from(r.querySelectorAll(".col-4"));
      const sorted = cols.sort((a, b) => {
        const priceA = parseInt(a.querySelector("p").innerText.replace("₹", ""));
        const priceB = parseInt(b.querySelector("p").innerText.replace("₹", ""));
        return value === "low" ? priceA - priceB : priceB - priceA;
      });
      sorted.forEach((el) => r.appendChild(el));
    });
  });

  // Cart Alert on Cart Icon Click
  const cartIcon = document.querySelector("nav img[src*='cart']");
  if (cartIcon) {
    cartIcon.style.cursor = "pointer";
    cartIcon.addEventListener("click", () => {
      if (cartItems.length === 0) {
        alert("Your cart is empty!");
      } else {
        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        const items = cartItems.map((item, i) => `${i + 1}. ${item.name} - ₹${item.price}`).join("\n");
        alert(`Items in Cart:\n${items}\n\nTotal Price: ₹${total}`);
      }
    });
  }

  // Scroll to Top Button
  const topBtn = document.createElement("button");
  topBtn.innerText = "⬆ Top";
  topBtn.style.position = "fixed";
  topBtn.style.bottom = "30px";
  topBtn.style.right = "30px";
  topBtn.style.padding = "10px 15px";
  topBtn.style.backgroundColor = "orangered";
  topBtn.style.color = "white";
  topBtn.style.border = "none";
  topBtn.style.borderRadius = "5px";
  topBtn.style.cursor = "pointer";
  topBtn.style.display = "none";
  document.body.appendChild(topBtn);

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });
});
