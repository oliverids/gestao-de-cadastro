let favadd = document.querySelectorAll('.btn-add'),
    lista = Array.from(favadd);

const comprar = document.getElementById('comprar');

let carrinho = new Array();
let produtos = new Array();
let soma = 0;

fetch('https://my-json-server.typicode.com/oliverids/gestao-de-cadastro/produtos')
    .then(r => r.json())
    .then(json => {
        console.log(json)
        lista.forEach(e => {
            e.addEventListener('click', () => {
                let index = lista.indexOf(e);

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
                    produtos.push(json[index].nome);

                    //PREÇO
                    let total = document.querySelector('.total span');
                    function Total() {
                        soma += json[index].preco;
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
                                    precoitem2 = parseInt(precoitem.substring(2, 5));
                                soma -= precoitem2;
                                total.innerText = `R$ ${soma},00`
                            })
                        })
                    }
                    apagaItem();
                })();
            })
        })

        //CADASTRO
        const comprar = document.getElementById('comprar');
        comprar.addEventListener('click', cadastro)

        function cadastro() {
            let nomeinput = document.getElementById('nome'),
                emailinput = document.getElementById('email'),
                nome = nomeinput.value,
                email = emailinput.value;

            function salva() {
                localStorage.setItem('nome', nome);
                localStorage.setItem('email', email);
                localStorage.setItem('precoTotal', `R$${soma},00`);
                localStorage.setItem('produtos', produtos.toString());
            }

            if (nome.length !== 0 && email.length !== 0 && email.includes('@')) {
                alert('Cadastro realizado! Você será logo direcionado à página de pagamento.')
                salva();
            } else if (!email.includes('@')) {
                alert('Digite um email válido')
            } else {
                alert('Digite seu nome e um email para finalizar a compra!')
            }
        }
    })

