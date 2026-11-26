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
6. ACORDEÃO DAS ALAS (SEPARADO DO EMOJI)
================================= */

const botoesAlas = document.querySelectorAll(".ala-botao");
botoesAlas.forEach(function(botao) {
    botao.addEventListener("click", function(event) {
        // Se o clique foi no emoji, não abre/fecha a lista de livros
        if (event.target.closest(".icone-saga")) {
            return;
        }

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

// Fecha o modal de primeira ao clicar fora da área do pergaminho
window.addEventListener("click", function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
    }
});


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
// QUIZ DA BIBLIOTECÁRIA

const perguntasQuiz = [
    {
        pergunta: "Ao entrar em uma biblioteca misteriosa, o que mais chamaria sua atenção?",
        opcoes: [
            {
                texto: "Um livro antigo que parece guardar um segredo.",
                ala: "cinzas"
            },
            {
                texto: "Uma criatura lendária escondida entre as estantes.",
                ala: "dragoes"
            },
            {
                texto: "Uma passagem secreta para um reino encantado.",
                ala: "fadas"
            },
            {
                texto: "Um diário misterioso pertencente a um antigo vilão.",
                ala: "viloes"
            }
        ]
    },
    {
        pergunta: "Qual aventura você escolheria viver?",
        opcoes: [
            {
                texto: "Desvendar mistérios de um passado esquecido.",
                ala: "cinzas"
            },
            {
                texto: "Explorar territórios dominados por dragões.",
                ala: "dragoes"
            },
            {
                texto: "Descobrir os segredos de um mundo mágico.",
                ala: "fadas"
            },
            {
                texto: "Conhecer personagens que desafiam todas as regras.",
                ala: "viloes"
            }
        ]
    },
    {
        pergunta: "Você encontrou uma porta que nunca havia visto antes. O que faz?",
        opcoes: [
            {
                texto: "Procuro pistas sobre quem a construiu.",
                ala: "cinzas"
            },
            {
                texto: "Abro sem hesitar. Pode haver algo extraordinário!",
                ala: "dragoes"
            },
            {
                texto: "Investigo se ela leva a outro mundo.",
                ala: "fadas"
            },
            {
                texto: "Tento descobrir o que estão escondendo de mim.",
                ala: "viloes"
            }
        ]
    },
    {
        pergunta: "Qual elemento não poderia faltar na sua história favorita?",
        opcoes: [
            {
                texto: "Segredos, reviravoltas e descobertas.",
                ala: "cinzas"
            },
            {
                texto: "Batalhas épicas e criaturas fantásticas.",
                ala: "dragoes"
            },
            {
                texto: "Magia, encantamento e mundos extraordinários.",
                ala: "fadas"
            },
            {
                texto: "Personagens complexos e moralmente ambíguos.",
                ala: "viloes"
            }
        ]
    },
    {
        pergunta: "Se pudesse guardar um único objeto na biblioteca, qual seria?",
        opcoes: [
            {
                texto: "Um manuscrito que revela histórias esquecidas.",
                ala: "cinzas"
            },
            {
                texto: "Uma escama de dragão com poderes misteriosos.",
                ala: "dragoes"
            },
            {
                texto: "Uma flor encantada de um reino distante.",
                ala: "fadas"
            },
            {
                texto: "Uma carta que revela os planos de alguém poderoso.",
                ala: "viloes"
            }
        ]
    }
];

const resultadosQuiz = {
    cinzas: {
        nome: "Ala das Cinzas",
        descricao: "Você tem espírito investigativo e gosta de histórias que escondem segredos. A Ala das Cinzas guarda mistérios, memórias e narrativas que merecem ser descobertas."
    },

    dragoes: {
        nome: "Ala dos Dragões",
        descricao: "Sua curiosidade leva você a grandes aventuras! A Ala dos Dragões reúne histórias de criaturas lendárias, coragem e mundos extraordinários."
    },

    fadas: {
        nome: "Ala das Fadas",
        descricao: "Você é atraída por mundos encantados e possibilidades mágicas. A Ala das Fadas é o lugar das descobertas, dos reinos fantásticos e dos encantamentos."
    },

    viloes: {
        nome: "Gabinete dos Vilões",
        descricao: "Você gosta de personagens complexos, segredos e histórias que fogem do óbvio. O Gabinete dos Vilões reserva narrativas cheias de reviravoltas."
    }
};

let perguntaAtual = 0;
let pontuacaoQuiz = {
    cinzas: 0,
    dragoes: 0,
    fadas: 0,
    viloes: 0
};

const elementoPergunta = document.getElementById("quiz-pergunta");
const elementoOpcoes = document.getElementById("quiz-opcoes");
const elementoProgresso = document.getElementById("quiz-progresso");
const elementoConteudo = document.getElementById("quiz-conteudo");
const elementoResultado = document.getElementById("quiz-resultado");

function mostrarPergunta() {
    const pergunta = perguntasQuiz[perguntaAtual];

    elementoProgresso.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntasQuiz.length}`;

    elementoPergunta.textContent = pergunta.pergunta;

    elementoOpcoes.innerHTML = "";

    pergunta.opcoes.forEach(opcao => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.classList.add("quiz-opcao");
        botao.textContent = opcao.texto;

        botao.addEventListener("click", function () {
            pontuacaoQuiz[opcao.ala]++;

            perguntaAtual++;

            if (perguntaAtual < perguntasQuiz.length) {
                mostrarPergunta();
            } else {
                mostrarResultado();
            }
        });

        elementoOpcoes.appendChild(botao);
    });
}

function mostrarResultado() {
    elementoConteudo.hidden = true;
    elementoResultado.hidden = false;

    const alaEscolhida = Object.keys(pontuacaoQuiz).reduce(
        (maior, ala) => {
            return pontuacaoQuiz[ala] > pontuacaoQuiz[maior]
                ? ala
                : maior;
        },
        "cinzas"
    );

    const resultado = resultadosQuiz[alaEscolhida];

    document.getElementById("resultado-ala").textContent =
        resultado.nome;

    document.getElementById("resultado-descricao").textContent =
        resultado.descricao;
}

document.getElementById("reiniciar-quiz").addEventListener("click", function () {
    perguntaAtual = 0;

    pontuacaoQuiz = {
        cinzas: 0,
        dragoes: 0,
        fadas: 0,
        viloes: 0
    };

    elementoResultado.hidden = true;
    elementoConteudo.hidden = false;

    mostrarPergunta();
});

if (elementoPergunta && elementoOpcoes) {
    mostrarPergunta();
}
/* =================================
   INSCRIÇÃO DA BIBLIOTECÁRIA
================================= */

const formularioInscricao = document.getElementById("form-inscricao");
console.log("BLOCO DE INSCRIÇÃO CARREGADO!");
console.log(formularioInscricao);
const areaInscricao = document.getElementById("quiz-inscricao");
const areaExperiencia = document.getElementById("quiz-experiencia");

if (formularioInscricao) {

    formularioInscricao.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("email-candidata")
            .value.trim().toLowerCase();

        let inscricoes = {};

        try {
            inscricoes = JSON.parse(
                localStorage.getItem("inscricoesBiblioteca")
            ) || {};
        } catch (erro) {
            inscricoes = {};
        }

        if (!inscricoes[email]) {
            inscricoes[email] = {
                email: email,
                situacao: "em_andamento",
                dataInscricao: new Date().toISOString(),
                proximaTentativa: null,
                livroRecomendado: null
            };

            localStorage.setItem(
                "inscricoesBiblioteca",
                JSON.stringify(inscricoes)
            );
        }

        localStorage.setItem("emailCandidataAtual", email);

        areaInscricao.hidden = true;
        areaExperiencia.hidden = false;

    });

}
