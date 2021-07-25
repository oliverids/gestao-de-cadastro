let favadd = document.querySelectorAll('.btn-add'),
    lista = Array.from(favadd);


let carrinho = new Array();
let soma = 0;

fetch('http://localhost:3000/produtos')
    .then(r => r.json())
    .then(json => {
        lista.forEach(e => {
            e.addEventListener('click', () => {
                let index = lista.indexOf(e);
                // console.log(json[index].foto);

                //CRIA CARRINHO
                (() => {
                    let novoItem = document.createElement('li');
                    novoItem.innerHTML = `                
                        <li>
                            <div class="info" id="retira">
                                <img src="${json[index].foto}">
                                <div>
                                    <p id="info-nome">${json[index].nome}</p>
                                    <p id="info-preco">${'R$' + json[index].preco + ',00'}</p>
                                </div>
                            </div>
                            <button id="apaga">Apagar</button>
                        </li>
                    `
                    let listaC = document.querySelector('.c-itens');
                    listaC.appendChild(novoItem.firstElementChild);
                    carrinho.push(json[index].preco);

                    //PREÇO
                    let total = document.querySelector('.total span');
                    function Total() {
                        soma += json[index].preco;
                        // console.log(soma);
                        total.innerText = `R$ ${soma},00`
                    }
                    Total();

                    // APAGA DO CARRINHO
                    function apagaItem() {
                        let apaga = document.querySelectorAll('#apaga');
                        apaga.forEach(e => {
                            e.addEventListener('click', (event) => {
                                listaC.removeChild(event.target.parentNode);
                                let precoitem = event.target.previousElementSibling.children[1].children[1].innerText,
                                    precoitem2 = parseInt(precoitem.substring(2,5));
                                soma -= precoitem2;
                                console.log(soma);
                                total.innerText = `R$ ${soma},00`
                            })
                        })
                    }
                    apagaItem();

                    //CADASTRO
                    function cadastro() {
                        
                    }

                })();
            })
        })
    })
