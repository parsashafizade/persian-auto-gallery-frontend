console.log("Parsa Auto Gallery Website Loaded...");

// ================== SEARCH LIVE ==================
const searchInput = document.getElementById("searchInput");


const products = [
  {name: "BMW i7 M70 xDrive", img: "assets/images/cars/BMW I7.webp", link: "products.html#BMWi7"},
  {name: "Ferrari 296 GTS", img: "assets/images/cars/Ferrari 296 GTS.webp", link: "products.html#Ferrari296GTS"},
  {name: "Lamborghini Revuelto", img: "assets/images/cars/Lamborghini Revuelto.webp", link: "products.html#LamborghiniRevuelto"},
  {name: "Lamborghini Huracan STO", img: "assets/images/cars/2024 Lamborghini Huracan STO.webp", link: "products.html#BMWi7"},
  {name: "Lamborghini Huracan EVO", img: "assets/images/cars/Lamborghini Huracan EVO.webp", link: "products.html#Ferrari296GTS"},
  {name: "Lamborghini Urus", img: "assets/images/cars/Lamborghini Urus.webp", link: "products.html#LamborghiniRevuelto"},
  {name: "Tesla Cybertruck", img: "assets/images/cars/Tesla Cybertruck.png", link: "products.html#BMWi7"},
  {name: "Ferrari Roma Spider", img: "assets/images/cars/Ferrari Roma Spider.webp", link: "products.html#Ferrari296GTS"},
  {name: "Ferrari 296 GTB", img: "assets/images/cars/Ferrari 296 GTB.webp", link: "products.html#LamborghiniRevuelto"},
  {name: "Ferrari SF90 Spider", img: "assets/images/cars/Ferrari SF90 Spider.webp", link: "products.html#BMWi7"},
  {name: "Mercedes-Benz SL-Class", img: "assets/images/cars/Mercedes-Benz SL-Class.webp", link: "products.html#Ferrari296GTS"},
  {name: "Mercedes-Benz GLS-Class", img: "assets/images/cars/Mercedes-Benz GLS-Class.webp", link: "products.html#LamborghiniRevuelto"},
  {name: "Mercedes-Benz CLE-Class", img: "assets/images/cars/Mercedes-Benz CLE-Class.webp", link: "products.html#BMWi7"},
  {name: "Mercedes-Benz G-Class", img: "assets/images/cars/Mercedes-Benz G-Class.webp", link: "products.html#Ferrari296GTS"},
  {name: "Mercedes-Benz S-Class", img: "assets/images/cars/Mercedes-Benz S-Class.webp", link: "products.html#LamborghiniRevuelto"},
  {name: "Land Rover Defender", img: "assets/images/cars/Land Rover Defender.webp", link: "products.html#BMWi7"},
  {name: "Land Rover Range Rover Sport", img: "assets/images/cars/Land Rover Range Rover Sport.webp", link: "products.html#Ferrari296GTS"},
  {name: "Land Rover Range Rover Velar", img: "assets/images/cars/Land Rover Range Rover Velar.webp", link: "products.html#LamborghiniRevuelto"},
  {name: "Land Rover Discovery", img: "assets/images/cars/Land Rover Discovery.webp", link: "products.html#BMWi7"},
  {name: "Tesla Model Y", img: "assets/images/cars/Ferrari 296 GTS.webp", link: "products.html#Ferrari296GTS"},
  {name: "Lamborghini Revuelto", img: "assets/images/cars/Tesla Model Y.webp", link: "products.html#LamborghiniRevuelto"},
  {name: "Tesla Model S", img: "assets/images/cars/Tesla Model S.webp", link: "products.html#BMWi7"},
  {name: "Tesla Model X", img: "assets/images/cars/Tesla Model X.webp", link: "products.html#Ferrari296GTS"},
  {name: "Tesla Cybertruck", img: "assets/images/cars/Tesla Cybertruck.webp", link: "products.html#LamborghiniRevuelto"},
  {name: "BMW XM", img: "assets/images/cars/BMW XM.webp", link: "products.html#BMWi7"},
  {name: "BMW M4", img: "assets/images/cars/BMW M4.webp", link: "products.html#Ferrari296GTS"},
  {name: "BMW X5", img: "assets/images/cars/BMW X5.webp", link: "products.html#LamborghiniRevuelto"},
];
// ایجاد جعبه نتایج جستجو
const resultsBox = document.createElement("div");
resultsBox.className = "search-results";
resultsBox.style = `
  position: absolute; 
  top: 100%; 
  right: 0; 
  width: 300px; 
  max-height: 400px; 
  overflow-y: auto; 
  background: #fff; 
  border: 1px solid #ccc; 
  border-radius: 8px; 
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  z-index: 1000;
  text-align: right;
`;
searchInput.parentNode.style.position = "relative";
searchInput.parentNode.appendChild(resultsBox);

// debounce function
function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}

// نمایش نتایج جستجو
const displaySearchResults = () => {
    const query = searchInput.value.toLowerCase();
    resultsBox.innerHTML = "";
    if (!query) return;

    const matches = products.filter(p => p.name.toLowerCase().includes(query));

    matches.forEach(p => {
        const div = document.createElement("div");
        div.className = "search-item";
        div.style = "padding: 8px; display: flex; align-items: center; cursor: pointer; gap: 10px; border-bottom: 1px solid #eee;";
        
        // هایلایت متن تایپ شده
        const highlightedName = p.name.replace(new RegExp(query, "gi"), match => `<b style="background:#ffeb3b;color:#000">${match}</b>`);
        div.innerHTML = `<img src="${p.img}" width="50" style="border-radius:6px; object-fit:cover;"> <span>${highlightedName}</span>`;

        // کلیک روی نتیجه
        div.addEventListener("click", () => {
            if (p.link) window.location.href = p.link;
        });

        resultsBox.appendChild(div);
    });
};

// input event با debounce
searchInput.addEventListener("input", debounce(displaySearchResults, 200));

// بستن نتایج با کلیک بیرون
document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
        resultsBox.innerHTML = "";
    }
});

// ================== ORDER POPUP ==================
const openOrderButtons = document.querySelectorAll(".openOrderBtn");
const closeOrder = document.getElementById("closePopup");
const popupBox = document.getElementById("orderPopup");

if (popupBox && openOrderButtons.length > 0) {
    popupBox.style.opacity = 0;
    popupBox.style.transition = "opacity 0.3s ease";

    openOrderButtons.forEach(button => {
        button.addEventListener("click", () => {
            popupBox.style.display = "flex";
            setTimeout(() => { popupBox.style.opacity = 1; }, 10);
        });
    });
}

if (popupBox && closeOrder) {
    const closePopup = () => {
        popupBox.style.opacity = 0;
        setTimeout(() => { popupBox.style.display = "none"; }, 300);
    };

    closeOrder.addEventListener("click", closePopup);
    popupBox.addEventListener("click", (e) => {
        if (e.target === popupBox) closePopup();
    });
}

// ================== ORDER FORM VALIDATION ==================
const submitOrder = document.getElementById("submitOrder");
const orderName = document.getElementById("orderName");
const orderEmail = document.getElementById("orderEmail");
const orderPhone = document.getElementById("orderPhone");

if(submitOrder){
    submitOrder.addEventListener("click", () => {
        if(!orderName.value || !orderEmail.value || !orderPhone.value){
            alert("لطفاً تمام فیلدها را تکمیل کنید.");
            return;
        }
        alert(`سفارش شما ثبت شد، ${orderName.value} عزیز!`);
        popupBox.style.opacity = 0;
        setTimeout(() => { popupBox.style.display = "none"; }, 300);
        orderName.value = orderEmail.value = orderPhone.value = "";
    });
}

// ================== FADE-IN ON SCROLL ==================
const fadeElements = document.querySelectorAll(".fade-in");
function fadeInOnScroll() {
    fadeElements.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            setTimeout(() => { el.classList.add("show"); }, i * 150);
        }
    });
}
window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// ================== SMOOTH SCROLL ==================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            target.scrollIntoView({behavior: "smooth"});
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".productsSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });
});

// ================== BACK TO TOP BUTTON ==================
const backToTop = document.createElement("button");
backToTop.textContent = "⬆";
backToTop.id = "backToTop";
backToTop.style = "position:fixed;bottom:30px;right:30px;padding:10px 15px;font-size:18px;border:none;border-radius:8px;background:#ff5722;color:#fff;cursor:pointer;display:none;z-index:10000;";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
    window.scrollTo({top:0, behavior:"smooth"});
});

// ================== HOVER EFFECTS ON IMAGES ==================
document.querySelectorAll(".product-card-box img, .team-card img").forEach(img => {
    img.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.05)";
        img.style.boxShadow = "0 0 25px rgba(255,87,34,0.7)";
    });
    img.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
        img.style.boxShadow = "none";
    });
});

// ================== LAZY LOADING IMAGES ==================
document.querySelectorAll("img").forEach(img => {
    img.loading = "lazy";
});

// ================== CONTACT FORM LOCALSTORAGE ==================
const contactInputs = document.querySelectorAll("#contact input, #contact textarea");
contactInputs.forEach(input => {
    input.value = localStorage.getItem(input.placeholder) || "";
    input.addEventListener("input", () => {
        localStorage.setItem(input.placeholder, input.value);
    });
});
