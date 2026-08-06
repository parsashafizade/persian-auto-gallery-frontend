
document.addEventListener("DOMContentLoaded", () => {
  console.log("Cars page (cars.js) initialized.");

  // ===== PRODUCTS  =====
  const products = [
    { name: "BMW i7 M70 xDrive", img: "assets/images/cars/BMW I7.webp" },
    { name: "Ferrari 296 GTS", img: "assets/images/cars/Ferrari 296 GTS.webp" },
    { name: "Lamborghini Revuelto", img: "assets/images/cars/Lamborghini Revuelto.webp" },
    { name: "Lamborghini Huracan STO", img: "assets/images/cars/2024 Lamborghini Huracan STO.webp" },
    { name: "Lamborghini Huracan EVO", img: "assets/images/cars/Lamborghini Huracan EVO.webp" },
    { name: "Lamborghini Urus", img: "assets/images/cars/Lamborghini Urus.webp" },
    { name: "Tesla Cybertruck", img: "assets/images/cars/Tesla Cybertruck.png" },
    { name: "Ferrari Roma Spider", img: "assets/images/cars/Ferrari Roma Spider.webp" },
    { name: "Ferrari 296 GTB", img: "assets/images/cars/Ferrari 296 GTB.webp" },
    { name: "Ferrari SF90 Spider", img: "assets/images/cars/Ferrari SF90 Spider.webp" },
    { name: "Mercedes-Benz SL-Class", img: "assets/images/cars/Mercedes-Benz SL-Class.webp" },
    { name: "Mercedes-Benz GLS-Class", img: "assets/images/cars/Mercedes-Benz GLS-Class.webp" },
    { name: "Mercedves-Benz CLE-Class", img: "assets/images/cars/Mercedes-Benz CLE-Class.webp" },
    { name: "Mercedes-Benz G-Class", img: "assets/images/cars/Mercedes-Benz G-Class.webp" },
    { name: "Mercedes-Benz S-Class", img: "assets/images/cars/Mercedes-Benz S-Class.webp" },
    { name: "Land Rover Defender", img: "assets/images/cars/Land Rover Defender.webp" },
    { name: "Land Rover Range Rover Sport", img: "assets/images/cars/Land Rover Range Rover Sport.webp" },
    { name: "Land Rover Range Rover Velar", img: "assets/images/cars/Land Rover Range Rover Velar.webp" },
    { name: "Land Rover Discovery", img: "assets/images/cars/Land Rover Discovery.webp" },
    { name: "Tesla Model Y", img: "assets/images/cars/Tesla Model Y.webp" },
    { name: "Tesla Model S", img: "assets/images/cars/Tesla Model S.webp" },
    { name: "Tesla Model X", img: "assets/images/cars/Tesla Model X.webp" },
    { name: "BMW XM", img: "assets/images/cars/BMW XM.webp" },
    { name: "BMW M4", img: "assets/images/cars/BMW M4.webp" },
    { name: "BMW X5", img: "assets/images/cars/BMW X5.webp" }
  ];

  const enrich = (p, idx) => {
    const name = p.name;
    const brand = (() => {
      if (/BMW/i.test(name)) return "BMW";
      if (/Ferrari/i.test(name)) return "Ferrari";
      if (/Lamborghini/i.test(name)) return "Lamborghini";
      if (/Tesla/i.test(name)) return "Tesla";
      if (/Mercedes/i.test(name) || /Mercedes-Benz/i.test(name)) return "Mercedes-Benz";
      if (/Land Rover/i.test(name)) return "Land Rover";
      return "Other";
    })();
    const yearMap = { "i7": 2024 };
    const year = 2024 - (idx % 4);


    let base = 0;
    if (brand === "Ferrari") base = 35000000000 + (idx * 1000000000);
    else if (brand === "Lamborghini") base = 30000000000 + (idx * 1200000000);
    else if (brand === "Tesla") base = 5000000000 + (idx * 200000000);
    else if (brand === "BMW") base = 10000000000 + (idx * 500000000);
    else if (brand === "Mercedes-Benz") base = 12000000000 + (idx * 400000000);
    else if (brand === "Land Rover") base = 13000000000 + (idx * 300000000);
    else base = 8000000000 + (idx * 200000000);

    const price = Math.round(base / 1000) * 1000; 

    const popularity = Math.max(60, Math.min(99, 90 - (idx % 7) * 3 + (brand === "Ferrari" ? 3 : 0)));
    const sales = Math.max(5, 200 - idx * 6 + (brand === "Tesla" ? 80 : 0));

    const desc = `${brand} ${name.split(" ").slice(1).join(" ")} — مشخصات فنی و تجربهٔ رانندگی در سطح بالا.`;

    const id = name.replace(/[^\w]/g, "_").replace(/_+/g, "_");

    return Object.assign({}, p, { id, name, brand, year, price, popularity, sales, desc });
  };

  const fullProducts = products.map(enrich);

  // ===== DOM references =====
  const carsGrid = document.getElementById("carsGrid");
  const resultsCount = document.getElementById("resultsCount");
  const brandsList = document.getElementById("brandsList");
  const pageSearch = document.getElementById("pageSearch");
  const yearMinEl = document.getElementById("yearMin");
  const yearMaxEl = document.getElementById("yearMax");
  const priceMinEl = document.getElementById("priceMin");
  const priceMaxEl = document.getElementById("priceMax");
  const sortSelect = document.getElementById("sortSelect");
  const applyFiltersBtn = document.getElementById("applyFilters");
  const resetFiltersBtn = document.getElementById("resetFilters");
  const pagination = document.getElementById("pagination");
  const quickView = document.getElementById("quickView");
  const closeQuickView = document.getElementById("closeQuickView");
  const qvImage = document.getElementById("qvImage");
  const qvName = document.getElementById("qvTitle") || document.getElementById("qvName");
  const qvDesc = document.getElementById("qvDesc");
  const qvBrand = document.getElementById("qvBrand");
  const qvYear = document.getElementById("qvYear");
  const qvPrice = document.getElementById("qvPrice");
  const qvSales = document.getElementById("qvSales");
  const qvPopularity = document.getElementById("qvPopularity");
  const qvOrder = document.getElementById("qvOrder");

  const orderPopup = document.getElementById("orderPopup");

  // ===== state =====
  const state = {
    products: fullProducts,
    filters: { brands: new Set(), yearMin: null, yearMax: null, priceMin: null, priceMax: null, q: "" },
    sort: sortSelect ? sortSelect.value : "popular",
    perPage: 9, // fixed per request (no per-page selector)
    page: 1
  };

  // ===== helpers =====
  const enFormat = (num) => {
    if (num === null || num === undefined) return "-";
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getUniqueBrands = () => {
    return Array.from(new Set(state.products.map(p => p.brand))).sort();
  };

  function debounce(fn, ms = 180){
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(()=>fn(...args), ms); };
  }

  // ===== render brands list (checkboxes) =====
  function renderBrands(){
    brandsList.innerHTML = "";
    getUniqueBrands().forEach(brand => {
      const id = `brand_${brand.replace(/\s+/g, "_")}`;
      const wrapper = document.createElement("div");
      wrapper.className = "brand-item";
      wrapper.innerHTML = `
        <label for="${id}">
          <input type="checkbox" id="${id}" data-brand="${brand}" /> ${brand}
        </label>
      `;
      brandsList.appendChild(wrapper);
      const checkbox = wrapper.querySelector("input");
      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) state.filters.brands.add(brand);
        else state.filters.brands.delete(brand);
        // Do not auto-apply; user must press "اعمال فیلترها" — but we also support live q search
      });
    });
  }

  // ===== apply filters & sort =====
  function applyAllFilters(){
    let list = state.products.slice();

    const q = (state.filters.q || "").trim().toLowerCase();
    if (q) {
      list = list.filter(p => (p.name + " " + p.brand + " " + p.desc).toLowerCase().includes(q));
    }

    if (state.filters.brands.size > 0) {
      list = list.filter(p => state.filters.brands.has(p.brand));
    }

    if (state.filters.yearMin) list = list.filter(p => p.year >= state.filters.yearMin);
    if (state.filters.yearMax) list = list.filter(p => p.year <= state.filters.yearMax);

    if (state.filters.priceMin) list = list.filter(p => p.price >= state.filters.priceMin);
    if (state.filters.priceMax) list = list.filter(p => p.price <= state.filters.priceMax);

    // sort
    switch (state.sort) {
      case "popular": list.sort((a,b) => b.popularity - a.popularity); break;
      case "bestSelling": list.sort((a,b) => b.sales - a.sales); break;
      case "priceAsc": list.sort((a,b) => a.price - b.price); break;
      case "priceDesc": list.sort((a,b) => b.price - a.price); break;
      case "newest": list.sort((a,b) => b.year - a.year); break;
      case "oldest": list.sort((a,b) => a.year - b.year); break;
      default: break;
    }

    return list;
  }

  // ===== render products grid =====
  function renderProducts(){
    const filtered = applyAllFilters();
    resultsCount.textContent = filtered.length;

    const perPage = state.perPage;
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / perPage));
    if (state.page > pages) state.page = 1;

    const start = (state.page - 1) * perPage;
    const pageItems = filtered.slice(start, start + perPage);

    carsGrid.innerHTML = "";
    pageItems.forEach(p => {
      const card = document.createElement("article");
      card.className = "product-card-box";
      card.setAttribute("tabindex", "0");
      card.innerHTML = `
        ${p.sales > 150 ? `<div class="badge">پرفروش</div>` : ""}
        <div class="card-media">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
        </div>
        <h3>${p.name}</h3>
        <div class="sub">${p.brand} • ${p.year}</div>
        <div class="price">${enFormat(p.price)} تومان</div>
        <div class="card-actions">
          <div class="left"></div>
          <div class="right">
            <button class="openOrderBtn order-small" data-id="${p.id}">سفارش</button>
          </div>
        </div>
      `;
      carsGrid.appendChild(card);

      const imgEl = card.querySelector(".card-media img");
      imgEl.addEventListener("click", () => openQuickView(p.id));
      imgEl.style.cursor = "pointer";

      const orderBtn = card.querySelector(".openOrderBtn");
      orderBtn.addEventListener("click", () => {
        openOrderPopup(p.id);
      });
    });

    renderPagination(pages);
    document.querySelectorAll("#carsGrid img").forEach(img => img.loading = "lazy");
  }

  // ===== pagination render =====
  function renderPagination(pages){
    pagination.innerHTML = "";
    if (pages <= 1) return;
    for (let i = 1; i <= pages; i++){
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = (i === state.page) ? "active" : "";
      btn.addEventListener("click", () => {
        state.page = i;
        renderProducts();
        window.scrollTo({ top: document.querySelector(".cars-grid-section").offsetTop - 90, behavior: "smooth" });
      });
      pagination.appendChild(btn);
    }
  }

  // ===== quick view =====
  function openQuickView(id){
    const p = state.products.find(x => x.id === id);
    if (!p) return;
    qvImage.src = p.img;
    if (qvName) qvName.textContent = p.name;
    if (qvDesc) qvDesc.textContent = p.desc;
    if (qvBrand) qvBrand.textContent = p.brand;
    if (qvYear) qvYear.textContent = p.year;
    if (qvPrice) qvPrice.textContent = enFormat(p.price);
    if (qvSales) qvSales.textContent = p.sales;
    if (qvPopularity) qvPopularity.textContent = p.popularity;
    if (qvOrder) qvOrder.dataset.id = p.id;

    quickView.classList.add("show");
    quickView.setAttribute("aria-hidden", "false");
  }

  closeQuickView && closeQuickView.addEventListener("click", () => {
    quickView.classList.remove("show");
    quickView.setAttribute("aria-hidden", "true");
  });

  quickView && quickView.addEventListener("click", (e) => {
    if (e.target === quickView) {
      quickView.classList.remove("show");
      quickView.setAttribute("aria-hidden", "true");
    }
  });

  // ===== open the exact same order popup used by home (app.js) =====
  function openOrderPopup(productId){
    if (!orderPopup) {
      alert("فرم سفارش پیدا نشد!");
      return;
    }

    orderPopup.style.display = "flex";
    orderPopup.style.opacity = 0;
    orderPopup.style.transition = "opacity 0.3s ease";
    setTimeout(() => { orderPopup.style.opacity = 1; }, 10);

    const first = orderPopup.querySelector("input");
    first && first.focus();
  }

  qvOrder && qvOrder.addEventListener("click", () => {
    const id = qvOrder.dataset.id;
    openOrderPopup(id);
  });

  // ===== filters interactions =====
  pageSearch && pageSearch.addEventListener("input", debounce((e) => {
    state.filters.q = e.target.value;
    state.page = 1;
    renderProducts();
  }, 150));

  // header search integration (if user uses header)
  const headerSearch = document.getElementById("searchInput");
  const headerBtn = document.getElementById("searchBtn");
  if (headerBtn && headerSearch) {
    headerBtn.addEventListener("click", () => {
      state.filters.q = headerSearch.value;
      state.page = 1;
      renderProducts();
      // scroll to results for visibility
      const section = document.querySelector(".cars-grid-section");
      if (section) window.scrollTo({ top: section.offsetTop - 90, behavior: "smooth" });
    });
  }

  applyFiltersBtn && applyFiltersBtn.addEventListener("click", () => {
    state.filters.yearMin = parseInt(yearMinEl.value) || null;
    state.filters.yearMax = parseInt(yearMaxEl.value) || null;
    state.filters.priceMin = parseInt(priceMinEl.value) || null;
    state.filters.priceMax = parseInt(priceMaxEl.value) || null;
    state.sort = sortSelect.value;
    state.page = 1;
    renderProducts();
  });

  resetFiltersBtn && resetFiltersBtn.addEventListener("click", () => {
    state.filters = { brands: new Set(), yearMin: null, yearMax: null, priceMin: null, priceMax: null, q: "" };
    // reset UI
    pageSearch.value = "";
    yearMinEl.value = ""; yearMaxEl.value = ""; priceMinEl.value = ""; priceMaxEl.value = "";
    sortSelect.value = "popular";
    state.page = 1;
    // uncheck brand checkboxes UI
    document.querySelectorAll("#brandsList input[type=checkbox]").forEach(cb => cb.checked = false);
    renderProducts();
  });

  // sort immediate change
  sortSelect.addEventListener("change", (e) => { state.sort = e.target.value; renderProducts(); });

  // ===== keyboard accessibility =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      quickView && quickView.classList.remove("show");
      if (orderPopup) { orderPopup.style.opacity = 0; setTimeout(()=> orderPopup.style.display = "none", 250); }
    }
  });

  // ===== initial render =====
  renderBrands();
  renderProducts();

  // ===== simple resize fix: recalc card image heights on window resize to avoid overflow glitches =====
  window.addEventListener("resize", debounce(() => {
    // ensure images fit
    document.querySelectorAll("#carsGrid img").forEach(img => {
      img.style.maxWidth = "100%";
      img.style.display = "block";
    });
  }, 200));

}); // DOMContentLoaded
