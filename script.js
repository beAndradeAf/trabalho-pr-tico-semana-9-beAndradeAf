const data = {
  produtos: [
    { id: 1, nome: "iPhone 13", preco: 4500, categoria: "Celulares", imagem: "https://images.kabum.com.br/produtos/fotos/sync_mirakl/391980/xlarge/iPhone-13-Apple-128GB-4GB-RAM-C-mera-Dupla-12MP-Tela-6-1-Pol-Meia-Noite-Mlpf3br-A-Desbloqueado_1772547821.jpg", descricao: "Apple iPhone 13", emEstoque: true },
    { id: 2, nome: "Galaxy S22", preco: 3800, categoria: "Celulares", imagem: "https://trocafone.vtexassets.com/arquivos/ids/245665/62c5e692-s22-preto.jpg?v=638907903001030000", descricao: "Samsung topo de linha", emEstoque: true },
    { id: 3, nome: "Notebook Dell", preco: 5200, categoria: "Notebooks", imagem: "https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/174937", descricao: "Notebook potente", emEstoque: false },
    { id: 4, nome: "Notebook Lenovo", preco: 3500, categoria: "Notebooks", imagem: "https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/394122", descricao: "Custo-benefício", emEstoque: true },
    { id: 5, nome: "Mouse Gamer", preco: 150, categoria: "Acessórios", imagem: "https://lojagoldentec.vteximg.com.br/arquivos/ids/166761-1000-1000/image-224acc37069842568a859bd4cdd15ab8.jpg?v=638590603445700000", descricao: "Alta precisão", emEstoque: true },
    { id: 6, nome: "Teclado Mecânico", preco: 300, categoria: "Acessórios", imagem: "https://m.media-amazon.com/images/I/61meQuPPc-L.jpg", descricao: "RGB", emEstoque: true },
    { id: 7, nome: "PS5", preco: 4500, categoria: "Games", imagem: "https://http2.mlstatic.com/D_NQ_NP_921596-MLA100042443481_122025-O.webp", descricao: "Console Sony", emEstoque: false },
    { id: 8, nome: "Xbox X", preco: 4200, categoria: "Games", imagem: "https://cms-assets.xboxservices.com/assets/bc/40/bc40fdf3-85a6-4c36-af92-dca2d36fc7e5.png?n=642227_Hero-Gallery-0_A1_857x676.png", descricao: "Console Microsoft", emEstoque: true }
  ]
};

const list = document.getElementById("product-list");
const details = document.getElementById("product-details");
const search = document.querySelector("#search");
const category = document.querySelector("#category");
const btn = document.getElementById("btnRender");

function price(p) {
  return "R$ " + p.toFixed(2);
}

function showDetails(p) {
  details.innerHTML = `
    <h3>${p.nome}</h3>
    <p>${price(p.preco)}</p>
    <p>${p.categoria}</p>
    <p>${p.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${p.descricao}</p>
  `;
}

function render() {
  list.innerHTML = "";

  const filtered = data.produtos.filter(p => {
    return p.nome.toLowerCase().includes(search.value.toLowerCase()) &&
      (category.value === "Todas" || p.categoria === category.value);
  });

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", p.id);
    card.style.background = "#f9f9f9";

    card.innerHTML = `
      <h3>${p.nome}</h3>
      <img src="${p.imagem}">
      <p>${price(p.preco)}</p>
      <p>${p.categoria}</p>
      <button class="det">Ver detalhes</button>
      <button class="high">Destacar</button>
    `;

    card.querySelector(".det").addEventListener("click", () => showDetails(p));
    card.querySelector(".high").addEventListener("click", () => card.classList.toggle("highlight"));

    list.appendChild(card);
  });

  document.querySelectorAll(".card").forEach(c => {
    console.log(c.getAttribute("data-id"));
  });
}

function loadCategories() {
  const cats = ["Todas"];
  data.produtos.forEach(p => {
    if (!cats.includes(p.categoria)) cats.push(p.categoria);
  });

  category.innerHTML = "";
  cats.forEach(c => {
    const op = document.createElement("option");
    op.value = c;
    op.textContent = c;
    category.appendChild(op);
  });
}

search.addEventListener("input", render);
category.addEventListener("change", render);
btn.addEventListener("click", render);

loadCategories();
render();