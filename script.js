/* =================================
1. CADASTRO DOS LIVROS
================================= */

const livros = [
    {
        id: 1,
        nome: "Quarta Asa",
        autor: "Rebecca Yarros",
        preco: 59.90,
        categoria: "dragoes",
        imagem: "quartaasa.jpg",
        link: "https://www.amazon.com.br/s?k=Quarta+Asa+Rebecca+Yarros"
    },
    {
        id: 2,
        nome: "Chama de Ferro",
        autor: "Rebecca Yarros",
        preco: 64.90,
        categoria: "dragoes",
        imagem: "chamadeferro.jpg",
        link: "https://www.amazon.com.br/s?k=Chama+de+Ferro+Rebecca+Yarros"
    },
    {
        id: 3,
        nome: "Tempestade de Ônix",
        autor: "Rebecca Yarros",
        preco: 69.90,
        categoria: "dragoes",
        imagem: "tempestadeonix.jpg",
        link: "https://www.amazon.com.br/s?k=Tempestade+de+Onix+Rebecca+Yarros"
    },
    {
        id: 4,
        nome: "O Príncipe Cruel",
        autor: "Holly Black",
        preco: 49.90,
        categoria: "fadas",
        imagem: "oprincipecruel.jpg",
        link: "https://www.amazon.com.br/s?k=O+Principe+Cruel+Holly+Black"
    },
    {
        id: 5,
        nome: "Trono de Vidro",
        autor: "Sarah J. Maas",
        preco: 54.90,
        categoria: "arquivos",
        imagem: "tronodevidro.jpg",
        link: "https://www.amazon.com.br/s?k=Trono+de+Vidro+Sarah+J+Maas"
    },
    {
        id: 6,
        nome: "Uma Janela Sombria",
        autor: "Rachel Gillig",
        preco: 54.90,
        categoria: "janela",
        imagem: "umajanelasombria.jpg",
        link: "https://www.amazon.com.br/s?k=Uma+Janela+Sombria+Rachel+Gillig"
    }
];


/* =================================
2. EXIBIR OS LIVROS DO CATÁLOGO
================================= */

const catalogo = document.getElementById("catalogo-livros");

function mostrarLivros(lista) {
    if (!catalogo) return;
    catalogo.innerHTML = "";
    lista.forEach(function(livro) {
        const cartao = document.createElement("div");
        cartao.classList.add("livro");
        cartao.innerHTML = `
            <img src="${livro.imagem}" alt="${livro.nome}">
            <h3>${livro.nome}</h3>
            <p>${livro.autor}</p>
            <p>R$ ${livro.preco.toFixed(2).replace(".", ",")}</p>
            <a href="${livro.link}" target="_blank" rel="noopener noreferrer" class="btn-amazon">
                Adquirir na Amazon ↗
            </a>
        `;
        catalogo.appendChild(cartao);
    });
}


/* =================================
3. ESCOLHAS DA RAINHA (DESTAQUES)
================================= */

function mostrarDestaques() {
    const areaDestaques = document.getElementById("livros-destaque");
    if (!areaDestaques) return;
    const livrosEscolhidos = [5, 4, 6];
    areaDestaques.innerHTML = "";
    livrosEscolhidos.forEach(function(id) {
        const livro = livros.find(function(item) {
            return item.id === id;
        });
        if (livro) {
            const cartao = document.createElement("div");
            cartao.classList.add("livro", "livro-destaque");
            cartao.innerHTML = `
                <img src="${livro.imagem}" alt="${livro.nome}">
                <h3>${livro.nome}</h3>
                <p>${livro.autor}</p>
                <p>R$ ${livro.preco.toFixed(2).replace(".", ",")}</p>
                <a href="${livro.link}" target="_blank" rel="noopener noreferrer" class="btn-amazon">
                    Adquirir na Amazon ↗
                </a>
            `;
            areaDestaques.appendChild(cartao);
        }
    });
}


/* =================================
4. FORMULÁRIO DE CONTATO
================================= */

const formulario = document.getElementById("form-contato");
if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        alert("Obrigada pela mensagem, " + nome + "! A biblioteca recebeu seu contato.");
        formulario.reset();
    });
}


/* =================================
5. ANO AUTOMÁTICO NO RODAPÉ
================================= */

const rodape = document.querySelector("footer p:last-child");
if (rodape) {
    const anoAtual = new Date().getFullYear();
    rodape.innerHTML = "&copy; " + anoAtual + " - Todos os direitos reservados.";
}


/* =================================
6. ACORDEÃO DAS ALAS (100% FUNCIONAL)
================================= */

const botoesAlas = document.querySelectorAll(".ala-botao");
botoesAlas.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const ala = botao.closest(".ala");
        if (ala) {
            ala.classList.toggle("aberta");
        }
    });
});


/* =================================
7. MODAIS (PERGAMINHOS)
================================= */

if (catalogo) mostrarLivros(livros);
mostrarDestaques();

function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function fecharModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fecha o modal ao clicar fora da área do pergaminho
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
    }
}
/* =================================
8. TRILHA SONORA DE FUNDO (Definitiva e Contínua)
================================= */

const musicaFundo = new Audio();
musicaFundo.loop = true;

// Destrava o áudio no primeiro clique em qualquer lugar da página
document.addEventListener("click", function() {
    if (musicaFundo.paused && musicaFundo.src) {
        musicaFundo.play().catch(() => {});
    }
}, { once: true });

const alasMusica = document.querySelectorAll(".ala");

alasMusica.forEach(function(ala) {
    ala.addEventListener("mouseenter", function() {
        const arquivoMusica = ala.dataset.musica;
        if (!arquivoMusica) return;

        if (musicaFundo.src.endsWith(arquivoMusica) && !musicaFundo.paused) {
            return;
        }

        musicaFundo.pause();
        musicaFundo.currentTime = 0;
        musicaFundo.src = arquivoMusica;

        musicaFundo.play().catch(function(erro) {
            console.log("Aguardando interação:", erro);
        });
    });

    ala.addEventListener("mouseleave", function(evento) {
        // Se houver um modal (pergaminho) aberto na tela, NÃO para a música!
        const modalAberto = document.querySelector('.modal-overlay[style*="display: flex"]');
        if (modalAberto) {
            return;
        }

        // Se o mouse continua dentro da própria ala, não para
        if (evento.relatedTarget && ala.contains(evento.relatedTarget)) {
            return;
        }

        musicaFundo.pause();
        musicaFundo.currentTime = 0;
    });
});
