(function() {
  let imageList = [];
  let counter = 0;
  const images = document.querySelectorAll(".store-img");
  const container = document.querySelector(".lightbox-container");
  const item = document.querySelector(".lightbox-item");
  const closeIcon = document.querySelector(".lightbox-close");
  const btnLeft = document.querySelector(".btnLeft");
  const btnRight = document.querySelector(".btnRight");
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");
  images.forEach(function(img) {
    imageList.push(img.src);
  });

  //add event listener to open modal and show image
  images.forEach(function(img) {
    img.addEventListener("click", function(event) {
      // show modal
      container.classList.add("show");
      // get source
      let src = event.target.src;
      // change counter
      counter = imageList.indexOf(src);

      // show modal with image
      item.style.backgroundImage = `url(${src})`;
    });
  });
  // hide modal
  closeIcon.addEventListener("click", function() {
    container.classList.remove("show");
  });
  // loop back
  btnLeft.addEventListener("click", function() {
    counter--;
    if (counter < 0) {
      counter = imageList.length - 1;
    }
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });
  btnRight.addEventListener("click", function() {
    counter++;
    if (counter > imageList.length - 1) {
      counter = 0;
    }
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });
  // show cart
  cartInfo.addEventListener("click", function() {
    cart.classList.toggle("show-cart");
  });
})();

(function() {
  const filterBtn = document.querySelectorAll(".filter-btn");

  filterBtn.forEach(function(btn) {
    btn.addEventListener("click", function(event) {

      event.preventDefault();
     
      const value = event.target.dataset.filter;
      // console.log(value);
      const items = document.querySelectorAll(".store-item");
      items.forEach(function(item) {
        if (value === "all") {
          item.style.display = "block";
        } else {
          if (item.classList.contains(value)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
  const search = document.getElementById("search-item");

  search.addEventListener("keyup", function() {
    let value = search.value.toLowerCase().trim();

    const items = document.querySelectorAll(".store-item");
    items.forEach(function(item) {
      let type = item.dataset.item;
      let length = value.length;
      let match = type.slice(0, length);
      if (value === match) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
  const cartBtn = document.querySelectorAll(".store-item-icon");

  cartBtn.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf("img") + 3;
        let partPath = fullPath.slice(pos);
let array=[];
        const item = {};
        i=0;
        item.img = `img${partPath}`;
        let name =event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
        item.name = name;
        let price =event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

        let finalPrice = price.slice(1).trim();
        item.price = finalPrice;
        var cartItem = document.createElement("div");
        cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );
        cartItem.innerHTML = `
        
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" width="50px" alt="">
            <div class="cart-item-text">
              <p id="cart-item-title" class="font-weight-bold mb-0">${
                item.name
              }</p>
             <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${
                item.price
              }</span>
            </div>
          `;
       
        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");
        cart.insertBefore(cartItem, total);
        alert("item added the cart");
      }

      document.getElementById("clear-cart").addEventListener('click',()=>{
        cartItem.remove();
        showTotals();
      })
   

      // document.querySelector('.cart-item-remove').addEventListener('click',(e)=>{
      //   console.log(e.target.parentElement);
      //  // e.target.parentElement.parentElement.remove();
      //   showTotals();
      // })
      showTotals();
    });
  });
 
  // check money
  function showTotals() {
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");
    items.forEach(function(item) {
      total.push(parseFloat(item.textContent));
    });
    const totalMoney = total.reduce(function(total, item) {
      total += item;
      return total;
    }, 0);
    const finalMoney = totalMoney.toFixed(2);

    // console.log(totalMoney);
    document.getElementById("cart-total").textContent = finalMoney;
    document.querySelector(".item-total").textContent = finalMoney;
    document.getElementById("item-count").textContent = total.length;
  }
})();

