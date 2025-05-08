window.addEventListener("load", function (event) {
    DesenhaTabuleiro();
    DesenhaPecasIniciais();
    carregaCartas()
});

var PecasJogando = [];
var jogada = 1;
var validaCaminho = 0;
var caminhoInimigo = [];
var aleatorio = ''



class Peca {
    // Constructor
    constructor(nome, posicao) {
        this.nome = nome;
        this.posicao = posicao;
        this.DesenhaPeca();
    }
    // Method
    DesenhaPeca() {
        var tipoPeca = this.nome.toLowerCase();
        this.tipoPeca = tipoPeca.slice(0, -1);
        var imagem = '';
        var desenha = `<canvas onclick="CaminhoPeca('${this.nome}',${this.posicao})" class="peca" id="${this.nome}" value="${tipoPeca}" width="65" height="85"></canvas>`;
        document.getElementById(`${this.posicao}`).innerHTML = desenha;
        DesenhaTipo(this.nome);


        
     
  
    

    };
    MovePeca(destino) {
        this.posicao = destino;
        this.DesenhaPeca();
        jogada++;
        giraTabuleiro();
        DesenhaPecasJogando();

        piscaPecas()
        
        //DesenhaPecasJogando();
    }
};

function giraPecas(){

    
    if (jogada % 2 == 0) {
    let listaPecas = document.querySelectorAll('.peca');
    for (let i = 0; i < listaPecas.length; i++) {
        listaPecas[i].style = `
        transform: rotate(180deg);
        `
    }

    let pecaInimiga = document.querySelectorAll('.pecaInimiga');
    for (let i = 0; i < pecaInimiga.length; i++) {
        pecaInimiga[i].style = `
        transform: rotate(180deg);
        `
    }

}
}


function piscaPecas(){

    let listaPecas = document.querySelectorAll('.peca');
    //DesenhaPecasJogando();
    for (let i = 0; i < listaPecas.length; i++) {
        listaPecas[i].style = `
        animation: piscaPecas 1s 1;
        `
    }
    setTimeout(() => {
        
    }, "50");

    

}


function giraTabuleiro() {
        
      
      

    if (jogada % 2 == 0) {

        document.getElementById('tabuleiroCompleto').style = `
    animation: girando 3s 1;
    transform: rotate(180deg);

    `
//        transform: rotate(180deg);




    }
    else {
        document.getElementById('tabuleiroCompleto').style = `
        animation: voltando 3s 1;
    transform: rotate(360deg);
    `
    }


}

function DesenhaTabuleiro() {
    var tabuleiro = '';
    var casa = 0;
    for (linhas = 0; linhas < 5; linhas++) {
        tabuleiro += `<tr>`;
        if (linhas % 2 != 0) {
            for (colunas = 0; colunas < 5; colunas++) {
                casa++;
                if (colunas % 2 == 0) {
                    tabuleiro += `<th class="casaPreta"  id="${casa}"><input type="button"  class="semCaminho" value=""/></th>`;
                }
                else {
                    tabuleiro += `<th class="casaBranca" id="${casa}"><input type="button"  class="semCaminho" value=""/></th>`;
                }
            }
        }
        else {
            for (colunas = 0; colunas < 5; colunas++) {
                casa++;
                if (colunas % 2 == 0) {
                    tabuleiro += `<th class="casaBranca" id="${casa}"><input type="button"  class="semCaminho" value=""/></th>`;
                }
                else {
                    tabuleiro += `<th class="casaPreta" id="${casa}"><input type="button"  class="semCaminho" value=""/></th>`;
                }
            }
        }
        tabuleiro += `</tr>`;
        document.getElementById('tabuleiro').innerHTML = tabuleiro;
    }
};

function DesenhaPecasIniciais() {
    //Peças Brancas
    PecasJogando.push(PeaoBranco01 = new Peca('PeaoBranco01', 21));
    PecasJogando.push(PeaoBranco02 = new Peca('PeaoBranco02', 22));
    PecasJogando.push(PeaoBranco03 = new Peca('PeaoBranco03', 24));
    PecasJogando.push(PeaoBranco04 = new Peca('PeaoBranco04', 25));
    PecasJogando.push(ReiBranco1 = new Peca('ReiBranco1', 23));


    //Peças Pretas
    PecasJogando.push(PeaoPreto01 = new Peca('PeaoPreto01', 1));
    PecasJogando.push(PeaoPreto02 = new Peca('PeaoPreto02', 2));
    PecasJogando.push(PeaoPreto03 = new Peca('PeaoPreto03', 4));
    PecasJogando.push(PeaoPreto04 = new Peca('PeaoPreto04', 5));
    PecasJogando.push(ReiPreto1 = new Peca('ReiPreto1', 3));
};

function DesenhaPecasJogando() {
    DesenhaTabuleiro();
    for (const property in PecasJogando) {
        PecasJogando[property].DesenhaPeca();
    }
    giraPecas();
    DesenhaPecasJogando();
};

var cartaAtiva = ''

cartas = ['Dragao', 'Boi', 'Cavalo', 'Gansa', 'Iguana']

function carregaCartas() {

    for (item in cartas) {
        idCarta = parseInt(item)
        idCarta = `carta${idCarta + 1}`
        document.getElementById(idCarta).innerHTML = `<img src="./links/img/carta${cartas[item]}.png" onclick="alteraCarta('carta${cartas[item]}', '${idCarta}')"></img>`
    }


}

function alteraCarta(carta, id) {

    let vez = ''
    if (jogada % 2 != 0) { vez = 'branco' }
    else { vez = 'preto' };

    cartaAtiva = carta;
    let jogadorCartas = document.getElementById(id).parentElement.id.toLowerCase()

    let vezbranco = jogadorCartas.includes(`branco`) && vez == `branco`;


    console.log(jogadorCartas)

    for (item in cartas) {

        idCarta = parseInt(item)
        idCarta = `carta${idCarta + 1}`


        if (idCarta == id) {
            document.getElementById(idCarta).style = 'box-shadow: 0px 0px 8px 5px rgba(0, 200, 200, 0.7);';
        }
        else {
            document.getElementById(idCarta).style = 'border: 2px solid black;';
        }


    }


    DesenhaPecasJogando();

}

function CaminhoPeca(nome, posicao) {
    DesenhaPecasJogando();
    nomeBusca = nome.toLowerCase();
    meuTime = '';
    vez = '';
    casasLivres = [];
    casasInimigas = [];
    casasInimigasNoCaminho = [];
    casasAmigas = [];
    casasOcupadas = [];
    casasAmeacadas = [];
    parar = false;

    VezJogador();
    ValidaPosicoes();

    function VezJogador() { //valida de quem e a vez de jogar
        if (nomeBusca.includes("branco")) { meuTime = 'branco'; }
        else if (nomeBusca.includes("preto")) { meuTime = 'preto'; }
        if (jogada % 2 != 0) { vez = 'branco' }
        else { vez = 'preto' };
    }

    function ValidaPosicoes() { //valida as posições das peças no tabuleiro
        for (const property in PecasJogando) {
            casaInimiga = `${PecasJogando[property].nome} `;
            casaInimiga = casaInimiga.toLowerCase();
            casasOcupadas.push(PecasJogando[property].posicao);
            if (!casaInimiga.includes(meuTime)) { casasInimigas.push(PecasJogando[property].posicao) }
            else { casasAmigas.push(PecasJogando[property].posicao) }
        }
    }

    function ValidaCasasGeral() { //valida casas livres
        if (casasAmigas.indexOf(c) >= 0) {
            casasAmeacadas.push(`${c} `);
            if (posicao != c) {
                parar = true;
                return parar;
            }
        }
        else if (casasInimigas.indexOf(c) >= 0) {
            casasAmeacadas.push(`${c} `);
            casasInimigasNoCaminho.push(`${c} `);
            //console.log(c);
            parar = true;
            return parar;
        }
        casasLivres.push(`${c} `);
    }

    function ValidaRotasInimigas() {
        for (c = 26; c >= 0; c--) {
            if (casasLivres.includes(`${c} `) && c != posicao) {
                caminhoInimigo.push(c);
            }
            else if (casasAmeacadas.includes(`${c} `) && c != posicao) {
                caminhoInimigo.push(c);
            }
        }
    }

    function DesenhaCasasPossiveis() { //desenha casas livres
        for (c = 25; c > 0; c--) {
            if (casasLivres.includes(`${c} `)) {
                document.getElementById(c).innerHTML = `<input type = "button"  onclick = "${nome}.MovePeca(${c})" class="caminho" />`;
            }
            else if (casasInimigasNoCaminho.includes(`${c} `)) {
                imgCapturada = '';
                for (const property in PecasJogando) {
                    if (PecasJogando[property].posicao == c) { imgCapturada = PecasJogando[property].tipoPeca }
                };
                document.getElementById(c).innerHTML = `<canvas onclick = "CapturaPeca(${posicao},${c})" class="pecaInimiga" id = "${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" width="65" height="85"></canvas> `;
                DesenhaTipo(document.getElementById(c).children[0].id);
                if (jogada % 2 == 0) {
              
                    let pecaInimiga = document.querySelectorAll('.pecaInimiga');
                    for (let i = 0; i < pecaInimiga.length; i++) {
                        pecaInimiga[i].style = `
                        transform: rotate(180deg);
                        `
                    }
                }
                

            }
        }
    }




    var primeiraColuna = [1, 6, 11, 16, 21];
    var segundaColuna = [2, 7, 12, 17, 22];
    var ultimaColuna = [5, 10, 15, 20, 25];
    var penultimaColuna = [4, 9, 14, 19, 24];

    if (cartaAtiva == "cartaDragao") {
        //valida movimento


        //primeira coluna
        if (primeiraColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao + 6) || c == (posicao - 3)) {
                    ValidaCasasGeral()
                }
            }
        }
        //geral
        else {
            for (c = 64; c > 0; c--) {
                if (c == (posicao + 6) || c == (posicao + 4) || c == (posicao - 7) || c == (posicao - 3)) {
                    ValidaCasasGeral()
                }
            }
        }

        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }
    else if (cartaAtiva == "cartaBoi") {
        //valida movimento
        parar = false;
        for (c = 25; c > 0; c--) {
            if (c == (posicao - 5) || c == (posicao + 1) || c == (posicao + 5)) {
                ValidaCasasGeral()
            }
        }
        parar = false;

        //desenha casas livres
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    /*
    if (nomeBusca.includes("peaopreto")) {
        //valida movimento
        parar = false;
        for (c = posicao; c <= 64; c++) {
            if (c <= 32) {
                if (c == (posicao + 8) || c == (posicao + 16)) {
                    ValidaCaminhoPeao()
                    if (parar) { break }
                }
            }
            else {
                if (c == (posicao + 8)) {
                    ValidaCaminhoPeao()
                    if (parar) { break }
                }
            }
        }
        //valida captura
        for (c = posicao; c <= 64; c++) {
            //primeira coluna
            if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {
                if (c == (posicao + 9)) {
                    ValidaCapturaPeao()
                }
            }
            //ultima coluna
            else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                if (c == (posicao + 7)) {
                    ValidaCapturaPeao()
                }
            }
            //geral
            else {
                if (c == (posicao + 7) || c == (posicao + 9)) {
                    ValidaCapturaPeao()
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveisPeao()
        }
        else {
            for (c = 65; c >= 0; c--) {
                if (casasAmeacadas.includes(`${c} `) && c != posicao) {
                    caminhoInimigo.push(c);
                }
            }
        }
    }

    if (nomeBusca.includes("rei")) {
        if (vez == meuTime) {
            function ValidaCasasRei() {
                if (caminhoInimigo.indexOf(c) >= 0) {
                }
                else if (casasInimigas.indexOf(c) >= 0) {
                    casasInimigasNoCaminho.push(`${c} `);
                }
                else if (casasAmigas.indexOf(c) < 0) {
                    casasLivres.push(`${c} `);
                }
            }
            ValidaCaminhosInimigos(meuTime);
            var casasLivres = [];
            var casasInimigas = [];
            var casasInimigasNoCaminho = [];
            var casasAmigas = [];
            for (const property in PecasJogando) {
                casaInimiga = `${PecasJogando[property].nome} `;
                casaInimiga = casaInimiga.toLowerCase();
                if (!casaInimiga.includes(meuTime)) { casasInimigas.push(PecasJogando[property].posicao) }
                else { casasAmigas.push(PecasJogando[property].posicao) }
            };
            //valida movimento
            for (c = 64; c > 0; c--) {
                //primeira coluna
                if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {
                    if (c == (posicao - 8) || c == (posicao - 7)) {
                        ValidaCasasRei()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9)) {
                        ValidaCasasRei()
                    }
                }
                //ultima coluna
                else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9)) {
                        ValidaCasasRei()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 7)) {
                        ValidaCasasRei()
                    }
                }
                //geral
                else {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9) || c == (posicao - 7)) {
                        ValidaCasasRei()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9) || c == (posicao + 7)) {
                        ValidaCasasRei()
                    }
                }
            }
            //roque
            if (posicao == 5 || posicao == 61) {
                linhaDireita = 0;
                linhaEsquerda = 0;
                direitaLivre = 0;
                esquerdaLivre = 0;
                //direita
                if (posicao == 5) { linhaDireita = 1; }
                else if (posicao == 61) { linhaDireita = 8; }
                for (c = posicao; c <= (8 * linhaDireita); c++) {
                    if (casasOcupadas.includes(c + 1)) { direitaLivre++ };
                    if (casasOcupadas.includes(c + 2)) { direitaLivre++ };
                    if (meuTime == 'branco' && !PecasJogando.includes(TorreBranco2)) { direitaLivre++ };
                    if (meuTime == 'preto' && !PecasJogando.includes(TorrePreto2)) { direitaLivre++ };
                    if (direitaLivre == 0) {
                        if (roqueTorreBranco2 && roqueReiBranco && meuTime == 'branco') {
                            document.getElementById(63).innerHTML = `<input type = "button"  onclick = "fazRoque('63')" class="caminho" /> `;
                        }
                        if (roqueTorrePreto2 && roqueReiPreto && meuTime == 'preto') {
                            document.getElementById(7).innerHTML = `<input type = "button"  onclick = "fazRoque('7')" class="caminho" /> `;
                        }
                    }
                }
                //esquerda
                for (c = posicao; (8 * linhaEsquerda) < c; c--) {
                    if (casasOcupadas.includes(c - 1)) { esquerdaLivre++ };
                    if (casasOcupadas.includes(c - 2)) { esquerdaLivre++ };
                    if (casasOcupadas.includes(c - 3)) { esquerdaLivre++ };
                    if (!PecasJogando.includes(TorreBranco1)) { direitaLivre++ };
                    if (esquerdaLivre == 0) {
                        if (roqueTorreBranco1 && roqueReiBranco && meuTime == 'branco') {
                            document.getElementById(59).innerHTML = `<input type = "button"  onclick = "fazRoque('59')" class="caminho" /> `;
                        }
                        if (roqueTorrePreto1 && roqueReiPreto && meuTime == 'preto') {
                            document.getElementById(3).innerHTML = `<input type = "button"  onclick = "fazRoque('3')" class="caminho" /> `;
                        }
                    }
                }
            }
            //desenha casas livres
            DesenhaCasasPossiveis();
        }
        else {
            function ValidaCasasReiInimigo() {
                if (casasInimigas.indexOf(c) >= 0) {
                    casasInimigasNoCaminho.push(`${c} `);
                }
                else if (casasAmigas.indexOf(c) < 0) {
                    casasLivres.push(`${c} `);
                }
            }
            for (c = 64; c > 0; c--) {
                //primeira coluna
                if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {
                    if (c == (posicao - 8) || c == (posicao - 7)) {
                        ValidaCasasReiInimigo()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9)) {
                        ValidaCasasReiInimigo()
                    }
                }
                //ultima coluna
                else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9)) {
                        ValidaCasasReiInimigo()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 7)) {
                        ValidaCasasReiInimigo()
                    }
                }
                //geral
                else {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9) || c == (posicao - 7)) {
                        ValidaCasasReiInimigo()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9) || c == (posicao + 7)) {
                        ValidaCasasReiInimigo()
                    }
                }
            }

            for (c = 65; c >= 0; c--) {
                if (casasLivres.includes(`${c} `) && c != posicao) {
                    caminhoInimigo.push(c);
                }
            }

        }
    }

    if (nomeBusca.includes("bispo")) {
        var corCasa = document.getElementById(posicao).className;
        //diagonal superior direita
        parar = false;
        for (c = posicao; c > 0; c = c - 7) {
            if (posicao == 64) { break }
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal superior esquerda
        parar = false;
        for (c = posicao; c > 0; c = c - 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal inferior direita
        parar = false;
        for (c = posicao; c < 65; c = c + 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal inferior esquerda
        parar = false;
        for (c = posicao; c < 65; c = c + 7) {
            if (posicao == 1) { break }
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }

    if (nomeBusca.includes("cavalo")) {
        var primeiraColuna = [1, 9, 17, 25, 33, 41, 49, 57];
        var segundaColuna = [2, 10, 18, 26, 34, 42, 50, 58];
        var ultimaColuna = [8, 16, 24, 32, 40, 48, 56, 64];
        var penultimaColuna = [7, 15, 23, 31, 39, 47, 55, 63];
        //primeira coluna
        if (primeiraColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 15) || c == (posicao - 6) || c == (posicao + 10) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        //segunda coluna
        else if (segundaColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 15) || c == (posicao - 17) || c == (posicao - 6) || c == (posicao + 10) || c == (posicao + 15) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        //penultima coluna
        else if (penultimaColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 15) || c == (posicao - 17) || c == (posicao - 10) || c == (posicao + 6) || c == (posicao + 15) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        //ultima coluna
        else if (ultimaColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 17) || c == (posicao - 10) || c == (posicao + 6) || c == (posicao + 15)) {
                    ValidaCasasGeral()
                }
            }
        }
        //geral
        else {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 15) || c == (posicao - 17) || c == (posicao - 6) || c == (posicao + 10) || c == (posicao - 10) || c == (posicao + 6) || c == (posicao + 15) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    };

    if (nomeBusca.includes("torre")) {
        //reta superior
        parar = false;
        for (c = posicao - 8; c > 0; c = c - 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //reta inferior
        parar = false;
        for (c = posicao + 8; c < 65; c = c + 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //direita
        linhaDireita = 0;
        if (posicao > 0 && posicao < 9) { linhaDireita = 1; }
        else if (posicao < 17) { linhaDireita = 2; }
        else if (posicao < 25) { linhaDireita = 3; }
        else if (posicao < 33) { linhaDireita = 4; }
        else if (posicao < 41) { linhaDireita = 5; }
        else if (posicao < 49) { linhaDireita = 6; }
        else if (posicao < 57) { linhaDireita = 7; }
        else if (posicao < 65) { linhaDireita = 8; };
        parar = false;
        for (c = posicao + 1; c <= (8 * linhaDireita); c++) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //esquerda
        linhaEsquerda = 0;
        if (posicao > 0 && posicao < 9) { linhaEsquerda = 0; }
        else if (posicao < 17) { linhaEsquerda = 1; }
        else if (posicao < 25) { linhaEsquerda = 2; }
        else if (posicao < 33) { linhaEsquerda = 3; }
        else if (posicao < 41) { linhaEsquerda = 4; }
        else if (posicao < 49) { linhaEsquerda = 5; }
        else if (posicao < 57) { linhaEsquerda = 6; }
        else if (posicao < 65) { linhaEsquerda = 7; };;
        parar = false;
        for (c = posicao - 1; (8 * linhaEsquerda) < c; c--) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    };

    if (nomeBusca.includes("rainha")) {
        var corCasa = document.getElementById(posicao).className;
        //diagonal superior direita
        parar = false;
        for (c = posicao; c > 0; c = c - 7) {
            if (posicao == 64) { break }
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal superior esquerda
        parar = false;
        for (c = posicao; c > 0; c = c - 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal inferior direita
        parar = false;
        for (c = posicao; c < 65; c = c + 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //diagonal inferior esquerda
        parar = false;
        for (c = posicao; c < 65; c = c + 7) {
            if (posicao == 1) { break }
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }
        //reta superior
        parar = false;
        for (c = posicao - 8; c > 0; c = c - 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //reta inferior
        parar = false;
        for (c = posicao + 8; c < 65; c = c + 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //direita
        linhaDireita = 0;
        if (posicao > 0 && posicao < 9) { linhaDireita = 1; }
        else if (posicao < 17) { linhaDireita = 2; }
        else if (posicao < 25) { linhaDireita = 3; }
        else if (posicao < 33) { linhaDireita = 4; }
        else if (posicao < 41) { linhaDireita = 5; }
        else if (posicao < 49) { linhaDireita = 6; }
        else if (posicao < 57) { linhaDireita = 7; }
        else if (posicao < 65) { linhaDireita = 8; };
        parar = false;
        for (c = posicao + 1; c <= (8 * linhaDireita); c++) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //esquerda
        linhaEsquerda = 0;
        if (posicao > 0 && posicao < 9) { linhaEsquerda = 0; }
        else if (posicao < 17) { linhaEsquerda = 1; }
        else if (posicao < 25) { linhaEsquerda = 2; }
        else if (posicao < 33) { linhaEsquerda = 3; }
        else if (posicao < 41) { linhaEsquerda = 4; }
        else if (posicao < 49) { linhaEsquerda = 5; }
        else if (posicao < 57) { linhaEsquerda = 6; }
        else if (posicao < 65) { linhaEsquerda = 7; };;
        parar = false;
        for (c = posicao - 1; (8 * linhaEsquerda) < c; c--) {
            ValidaCasasGeral()
            if (parar) { break }
        }
        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }
    }
*/


    for (c in casasInimigasNoCaminho) {

        for (item in PecasJogando) {

            if (casasInimigasNoCaminho[0] == PecasJogando[item].posicao) {
                if (PecasJogando[item].nome.includes('Rei')) {
                    xequeDe = nome;
                    //console.log(PecasJogando[item]);
                    xeque = true

                    xequeEm = PecasJogando[item].nome;

                }

            }
        }


    }

};

function CapturaPeca(ataque, defesa) {
    for (const property in PecasJogando) {
        if (PecasJogando[property].posicao == defesa) {
            pecaCapturada = PecasJogando[property];
        }
        else if (PecasJogando[property].posicao == ataque) {
            pecaCapturante = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    const index2 = PecasJogando.indexOf(pecaCapturante);
    nomeAtacante = document.getElementById(ataque).children[0].id;
    pecaCapturante.MovePeca(defesa);
}

function CapturaPecaComPromocao(ataque, defesa) {
    for (const property in PecasJogando) {
        if (PecasJogando[property].posicao == defesa) {
            pecaCapturada = PecasJogando[property];
        }
        else if (PecasJogando[property].posicao == ataque) {
            pecaCapturante = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    const index2 = PecasJogando.indexOf(pecaCapturante);
    nomeAtacante = document.getElementById(ataque).children[0].id;
    PromocaoPeao(ataque, defesa);
}

function PromocaoPeao(de, para) {
    document.getElementById('promocao').style.display = 'block';
    var imgCapturada = '';
    if (meuTime == 'branco') { imgCapturada = 'Branco' }
    else { imgCapturada = 'Preto' }
    document.getElementById('promocao').innerHTML = `<canvas onclick = "viraCavalo(${de}, ${para})" class="promocao${imgCapturada}" id = "cavalo${imgCapturada}" value = "Cavalo" width="65" height="85"></canvas> `;
    document.getElementById('promocao').innerHTML += `<canvas onclick = "viraBispo(${de}, ${para})" class="promocao${imgCapturada}" id = "bispo${imgCapturada}" value = "Bispo" width="65" height="85"></canvas> `;
    document.getElementById('promocao').innerHTML += `<canvas onclick = "viraTorre(${de}, ${para})" class="promocao${imgCapturada}" id = "torre${imgCapturada}" value = "Torre" width="65" height="85"></canvas> `;
    document.getElementById('promocao').innerHTML += `<canvas onclick = "viraRainha(${de}, ${para})" class="promocao${imgCapturada}" id = "rainha${imgCapturada}" value = "Rainha" width="65" height="85"></canvas> `;
    DesenhaTipo(`cavalo${imgCapturada}`);
    DesenhaTipo(`bispo${imgCapturada}`);
    DesenhaTipo(`torre${imgCapturada}`);
    DesenhaTipo(`rainha${imgCapturada}`);
}

function viraCavalo(de, para) {
    for (const property in PecasJogando) {
        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    var time = `${pecaCapturada.nome}`;
    time = time.toLowerCase();
    if (time.includes('branco')) {
        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(CavaloBrancoA = new Peca('CavaloBrancoA', para));
                break;
            case '2':
                PecasJogando.unshift(CavaloBrancoB = new Peca('CavaloBrancoB', para));
                break;
            case '3':
                PecasJogando.unshift(CavaloBrancoC = new Peca('CavaloBrancoC', para));
                break;
            case '4':
                PecasJogando.unshift(CavaloBrancoD = new Peca('CavaloBrancoD', para));
                break;
            case '5':
                PecasJogando.unshift(CavaloBrancoE = new Peca('CavaloBrancoE', para));
                break;
            case '6':
                PecasJogando.unshift(CavaloBrancoF = new Peca('CavaloBrancoF', para));
                break;
            case '7':
                PecasJogando.unshift(CavaloBrancoG = new Peca('CavaloBrancoG', para));
                break;
            case '8':
                PecasJogando.unshift(CavaloBrancoH = new Peca('CavaloBrancoH', para));
                break;
            default:
                break;
        }
    }
    else {
        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(CavaloPretoA = new Peca('CavaloPretoA', para));
                break;
            case '2':
                PecasJogando.unshift(CavaloPretoB = new Peca('CavaloPretoB', para));
                break;
            case '3':
                PecasJogando.unshift(CavaloPretoC = new Peca('CavaloPretoC', para));
                break;
            case '4':
                PecasJogando.unshift(CavaloPretoD = new Peca('CavaloPretoD', para));
                break;
            case '5':
                PecasJogando.unshift(CavaloPretoE = new Peca('CavaloPretoE', para));
                break;
            case '6':
                PecasJogando.unshift(CavaloPretoF = new Peca('CavaloPretoF', para));
                break;
            case '7':
                PecasJogando.unshift(CavaloPretoG = new Peca('CavaloPretoG', para));
                break;
            case '8':
                PecasJogando.unshift(CavaloPretoH = new Peca('CavaloPretoH', para));
                break;
            default:
                break;
        }
    }
    DesenhaPecasJogando();

    jogada++;

    document.getElementById('promocao').style.display = 'none';


};

function viraBispo(de, para) {
    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    var time = `${pecaCapturada.nome}`;
    time = time.toLowerCase();
    if (time.includes('branco')) {
        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(BispoBrancoA = new Peca('BispoBrancoA', para));
                break;
            case '2':
                PecasJogando.unshift(BispoBrancoB = new Peca('BispoBrancoB', para));
                break;
            case '3':
                PecasJogando.unshift(BispoBrancoC = new Peca('BispoBrancoC', para));
                break;
            case '4':
                PecasJogando.unshift(BispoBrancoD = new Peca('BispoBrancoD', para));
                break;
            case '5':
                PecasJogando.unshift(BispoBrancoE = new Peca('BispoBrancoE', para));
                break;
            case '6':
                PecasJogando.unshift(BispoBrancoF = new Peca('BispoBrancoF', para));
                break;
            case '7':
                PecasJogando.unshift(BispoBrancoG = new Peca('BispoBrancoG', para));
                break;
            case '8':
                PecasJogando.unshift(BispoBrancoH = new Peca('BispoBrancoH', para));
                break;
            default:
                break;
        }
    }
    else {
        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(BispoPretoA = new Peca('BispoPretoA', para));
                break;
            case '2':
                PecasJogando.unshift(BispoPretoB = new Peca('BispoPretoB', para));
                break;
            case '3':
                PecasJogando.unshift(BispoPretoC = new Peca('BispoPretoC', para));
                break;
            case '4':
                PecasJogando.unshift(BispoPretoD = new Peca('BispoPretoD', para));
                break;
            case '5':
                PecasJogando.unshift(BispoPretoE = new Peca('BispoPretoE', para));
                break;
            case '6':
                PecasJogando.unshift(BispoPretoF = new Peca('BispoPretoF', para));
                break;
            case '7':
                PecasJogando.unshift(BispoPretoG = new Peca('BispoPretoG', para));
                break;
            case '8':
                PecasJogando.unshift(BispoPretoH = new Peca('BispoPretoH', para));
                break;
            default:
                break;
        }
    }
    DesenhaPecasJogando();
    jogada++;
    document.getElementById('promocao').style.display = 'none';
};

function viraTorre(de, para) {
    for (const property in PecasJogando) {
        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    var time = `${pecaCapturada.nome}`;
    time = time.toLowerCase();
    if (time.includes('branco')) {
        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(TorreBrancoA = new Peca('TorreBrancoA', para));
                break;
            case '2':
                PecasJogando.unshift(TorreBrancoB = new Peca('TorreBrancoB', para));
                break;
            case '3':
                PecasJogando.unshift(TorreBrancoC = new Peca('TorreBrancoC', para));
                break;
            case '4':
                PecasJogando.unshift(TorreBrancoD = new Peca('TorreBrancoD', para));
                break;
            case '5':
                PecasJogando.unshift(TorreBrancoE = new Peca('TorreBrancoE', para));
                break;
            case '6':
                PecasJogando.unshift(TorreBrancoF = new Peca('TorreBrancoF', para));
                break;
            case '7':
                PecasJogando.unshift(TorreBrancoG = new Peca('TorreBrancoG', para));
                break;
            case '8':
                PecasJogando.unshift(TorreBrancoH = new Peca('TorreBrancoH', para));
                break;
            default:
                break;
        }
    }
    else {
        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(TorrePretoA = new Peca('TorrePretoA', para));
                break;
            case '2':
                PecasJogando.unshift(TorrePretoB = new Peca('TorrePretoB', para));
                break;
            case '3':
                PecasJogando.unshift(TorrePretoC = new Peca('TorrePretoC', para));
                break;
            case '4':
                PecasJogando.unshift(TorrePretoD = new Peca('TorrePretoD', para));
                break;
            case '5':
                PecasJogando.unshift(TorrePretoE = new Peca('TorrePretoE', para));
                break;
            case '6':
                PecasJogando.unshift(TorrePretoF = new Peca('TorrePretoF', para));
                break;
            case '7':
                PecasJogando.unshift(TorrePretoG = new Peca('TorrePretoG', para));
                break;
            case '8':
                PecasJogando.unshift(TorrePretoH = new Peca('TorrePretoH', para));
                break;
            default:
                break;
        }
    }
    DesenhaPecasJogando();
    jogada++;
    document.getElementById('promocao').style.display = 'none';
};

function viraRainha(de, para) {
    for (const property in PecasJogando) {
        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }
    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    var time = `${pecaCapturada.nome}`;
    time = time.toLowerCase();
    if (time.includes('branco')) {
        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(RainhaBrancoA = new Peca('RainhaBrancoA', para));
                break;
            case '2':
                PecasJogando.unshift(RainhaBrancoB = new Peca('RainhaBrancoB', para));
                break;
            case '3':
                PecasJogando.unshift(RainhaBrancoC = new Peca('RainhaBrancoC', para));
                break;
            case '4':
                PecasJogando.unshift(RainhaBrancoD = new Peca('RainhaBrancoD', para));
                break;
            case '5':
                PecasJogando.unshift(RainhaBrancoE = new Peca('RainhaBrancoE', para));
                break;
            case '6':
                PecasJogando.unshift(RainhaBrancoF = new Peca('RainhaBrancoF', para));
                break;
            case '7':
                PecasJogando.unshift(RainhaBrancoG = new Peca('RainhaBrancoG', para));
                break;
            case '8':
                PecasJogando.unshift(RainhaBrancoH = new Peca('RainhaBrancoH', para));
                break;
            default:
                break;
        }
    }
    else {
        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(RainhaPretoA = new Peca('RainhaPretoA', para));
                break;
            case '2':
                PecasJogando.unshift(RainhaPretoB = new Peca('RainhaPretoB', para));
                break;
            case '3':
                PecasJogando.unshift(RainhaPretoC = new Peca('RainhaPretoC', para));
                break;
            case '4':
                PecasJogando.unshift(RainhaPretoD = new Peca('RainhaPretoD', para));
                break;
            case '5':
                PecasJogando.unshift(RainhaPretoE = new Peca('RainhaPretoE', para));
                break;
            case '6':
                PecasJogando.unshift(RainhaPretoF = new Peca('RainhaPretoF', para));
                break;
            case '7':
                PecasJogando.unshift(RainhaPretoG = new Peca('RainhaPretoG', para));
                break;
            case '8':
                PecasJogando.unshift(RainhaPretoH = new Peca('RainhaPretoH', para));
                break;
            default:
                break;
        }
    }
    DesenhaPecasJogando();
    jogada++;
    document.getElementById('promocao').style.display = 'none';
};

function fazRoque(destino) {
    if (destino == 63) {
        TorreBranco2.MovePeca(62);
        ReiBranco1.MovePeca(63);
        jogada++;
    }
    else if (destino == 7) {
        TorrePreto2.MovePeca(6);
        ReiPreto1.MovePeca(7);
        jogada++;
    }
    else if (destino == 59) {
        TorreBranco1.MovePeca(60);
        ReiBranco1.MovePeca(59);
        jogada++;
    }
    else if (destino == 3) {
        TorrePreto1.MovePeca(4);
        ReiPreto1.MovePeca(3);
        jogada++;
    }
}

function ValidaCaminhosInimigos(time) {
    caminhoInimigo = [];
    for (const property in PecasJogando) {
        if (!PecasJogando[property].nome.toLowerCase().includes(`${time}`)) {
            //console.log(PecasJogando[property].nome)
            CaminhoPeca(PecasJogando[property].nome, PecasJogando[property].posicao)
        }
    }
    meuTime = time;
};

function Xeque() {

    ValidaPecasAmeacadas();

}

function DesenhaTipo(nome) {
    nomeMin = nome.toLowerCase();
    if (nomeMin.includes('cavalopreto')) { RecortaImagem(`${nome}`, 1008, 1051, 75, 93) }
    else if (nomeMin.includes('peaopreto')) { RecortaImagem(`${nome}`, 1210, 1058, 70, 85) }
    else if (nomeMin.includes('peaobranco')) { RecortaImagem(`${nome}`, 1209, 864, 68, 84) }
    else if (nomeMin.includes('cavalobranco')) { RecortaImagem(`${nome}`, 1008, 855, 74, 93) }
    else if (nomeMin.includes('bispobranco')) { RecortaImagem(`${nome}`, 808, 855, 83, 104) }
    else if (nomeMin.includes('bispopreto')) { RecortaImagem(`${nome}`, 808, 1049, 82, 107) }
    else if (nomeMin.includes('torrepreto')) { RecortaImagem(`${nome}`, 619, 1051, 67, 93) }
    else if (nomeMin.includes('torrebranco')) { RecortaImagem(`${nome}`, 618, 855, 68, 93) }
    else if (nomeMin.includes('rainhapreto')) { RecortaImagem(`${nome}`, 413, 1050, 82, 95) }
    else if (nomeMin.includes('rainhabranco')) { RecortaImagem(`${nome}`, 413, 855, 82, 95) }
    else if (nomeMin.includes('reipreto')) { RecortaImagem(`${nome}`, 214, 1051, 86, 94) }
    else if (nomeMin.includes('reibranco')) { RecortaImagem(`${nome}`, 214, 855, 86, 94) }
}

function RecortaImagem(id, inicioX, incioY, largura, altura) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = "links/img/novasPecas.png";
    img.onload = function () {
        sx = inicioX  //(eixo x da imagem de origem) - Este parâmetro diz de onde você deseja recortar ou começar a recortar a imagem a partir do eixo x.
        sy = incioY//eixo y da imagem de origem) - Este parâmetro diz de onde você deseja recortar ou começar a recortar a imagem a partir do eixo y.
        sWidth = largura//- A largura da imagem a partir de sx.
        sHeight = altura//- A altura da imagem a partir de sy.
        dWidth = 65//- Comprimento das imagens que devem ser apresentadas no ecrã.
        dHeight = 85//- A altura das imagens que devem ser apresentadas no ecrã.
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
    };
}

function ValidaPecasAmeacadas() {

    xeque = false


    //setTimeout(function () { CaminhoPeca('PeaoBranco1',49) }, 2500);

    for (var i = 0; i < PecasJogando.length; i++) {


        CaminhoPeca(`'${PecasJogando[i].nome}'`, PecasJogando[i].posicao);
        //console.log(casasAmeacadas)

    };


    DesenhaPecasJogando();

    if (xeque) {
        console.log(`xeque de ${xequeDe} em ${xequeEm} na jogada -> ${jogada}`)
    }


}


/*


    for (var i = 0; i < PecasJogando.length; i++) {
        (function (i) {
          setTimeout(function () {
           //console.log(PecasJogando[i].nome, PecasJogando[i].posicao)
           
           CaminhoPeca(`'${PecasJogando[i].nome}'`,PecasJogando[i].posicao);
           //console.log(casasAmeacadas)
          }, 0*i);
        })(i);
      };

*/

