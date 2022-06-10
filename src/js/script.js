import {buscaFlickr, arrCoord, criarImage, arrImg} from "./location.js";
// CONTADOR DA POSICAO DA IMAGEM ######################################
let cont = 0

// HISTORICO DAS PESQUISAS ##############################################
let arrTexto = ['Pessoas', 'Ceu', 'Animais']

// SELECIONANDO BOTAO E CAMPO DE PESQUISA ##############################
const pesquisa   = document.querySelector('#pesq')
const buttonPesq = document.querySelector('.buttonPesq')
const divSpan    = document.querySelector('.opcoes')
const span1      = document.querySelector('.span1')
const span2      = document.querySelector('.span2')
const span3      = document.querySelector('.span3')

span1.innerHTML = `<button class='span1 span' data-id='${arrTexto[0]}'>${arrTexto[0]}</button>`
span2.innerHTML = `<button class='span1 span' data-id='${arrTexto[1]}'>${arrTexto[1]}</button>`
span3.innerHTML = `<button class='span1 span' data-id='${arrTexto[2]}'>${arrTexto[2]}</button>` 





// BOTAO PESQUISA ######################################################
buttonPesq.addEventListener('click', function(){
    let texto   = pesquisa.value                    // captura o texto da pesquisa
    
    // adiciona a pesquisa no historico >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    arrTexto.unshift(pesquisa.value)                
    span1.innerHTML = `<button class='span1 span' data-id='${arrTexto[0]}'>${arrTexto[0]}</button>`
    span2.innerHTML = `<button class='span1 span' data-id='${arrTexto[1]}'>${arrTexto[1]}</button>`
    span3.innerHTML = `<button class='span1 span' data-id='${arrTexto[2]}'>${arrTexto[2]}</button>`    
    
    // limpa as cores da posicao da imagem
    let ant = document.querySelector(`.item${cont}`)
    ant.style.backgroundColor = '#7253B0'
    cont = 0

    // passa o texto pesquisado para funcao buscarFlickr trazer novas imagens
    buscaFlickr(arrCoord, texto)
    
})



// PESQUISA UTILIZANDO OS BOTOES DO HISTORICO ##########################
divSpan.addEventListener('click', getTexto) // bubling na div com 3 botoes do historico

function getTexto(evt){                     //capturing no botao do historico
    const botao = evt.target
    if(evt.target.tagName === 'BUTTON'){
        const texto = botao.getAttribute('data-id')
        let ant = document.querySelector(`.item${cont}`)
        ant.style.backgroundColor = '#7253B0'
        cont = 0

        // passa o texto dos botoes do historico, para funcao buscarFlickr trazer novas imagens
        buscaFlickr(arrCoord, texto)

    }
}



// BOTOES PROXIMO E ANTERIOR ###################################################
const ante = document.querySelector('.ante')
const prox = document.querySelector('.prox')



ante.addEventListener('click', function(){
    
    if(cont == 0){
        cont = arrImg.length-1
        criarImage(arrImg, cont)
    }else{
    
        cont --
        criarImage(arrImg, cont)
        
    }

     // Retirando a cor do indicador da posicao da foto
    if(cont == 4 ){
        let ant = document.querySelector(`.item0`)
        ant.style.backgroundColor = '#7253B0'
       
    }else{
    let ant = document.querySelector(`.item${cont+1}`)
    ant.style.backgroundColor = '#7253B0'

    }
    
})

prox.addEventListener('click', function(){

    if(cont == arrImg.length-1){
        cont = 0
        criarImage(arrImg, cont)
    }else{
        cont ++
        criarImage(arrImg, cont)
    
    }
    // Retirando a cor do indicador da foto
    if(cont == 0 ){
        let ant = document.querySelector(`.item${arrImg.length-1}`)
        ant.style.backgroundColor = '#7253B0'
        
    }else{
        let ant = document.querySelector(`.item${cont-1}`)
        ant.style.backgroundColor = '#7253B0'
       
    }
    
})
