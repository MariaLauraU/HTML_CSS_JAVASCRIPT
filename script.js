//Criando variáveis para pegar elementos do html economizando código
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

let modalQT = 1;

//mapeando o jason de pizza e listando 
pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //preenchendo os dados das pizzas com base no json
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    //preenchendo janela de seleção após clique na pizza escolhida
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();         
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQT = 1;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;            
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        //c('.pizzaInfo--size.selected').classList.remove('selected');

        cs('.pizzainfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
                   
        });

        c('.pizzaInfo--qt').innerHTML = modalQT;

        c('.pizzaWindowArea').style.opacity = 0; // janela aparecendo com um efeito sutil
        c('.pizzaWindowArea').style.display = 'flex';

        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.pizza-area').append(pizzaItem);    

});

// eventos do modal 
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;

    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 200);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQT > 1){
        modalQT--;
        c('.pizzaInfo--qt').innerHTML = modalQT;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQT++;
    c('.pizzaInfo--qt').innerHTML = modalQT;
});