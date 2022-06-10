// SELECIONAR ITENS NO HTML
const images = document.querySelector('.images img')
const titulo = document.querySelector('.title')
const fotogr = document.querySelector('.ref')
const divQtd = document.querySelector('.boxQtd')




// 1° DEFININDO E ARMAZENANDO COORDENADAS ################################## 
let arrCoord = []

navigator.geolocation.getCurrentPosition(success, error)

function success(pos) {                           // caso seja fornecido acesso, passar coord para funcao buscarFlickr
        var crd = pos.coords;
        arrCoord.push(crd.latitude, crd.longitude)
        buscaFlickr(arrCoord)
        
    };

function error(err){                             // caso acesso negado, passar coord padrao para funcao buscarFlickr
        console.warn('ERROR(' + err.code + '): ' + err.message);
        arrCoord = [-27.0057044,-48.6870243]
        buscaFlickr(arrCoord)

            
    }

// 2° FETCH UTILIZANDO COORDENADAS ENCONTRADAS ##############################
function buscaFlickr (coord, txt = 'natureza'){
    let lat = coord[0]
    let long = coord[1]
    fetch (`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=aa20696c6d46474549d00f45900373c5&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${lat}&lon=${long}&text=${txt}`)
    .then (response => response.json())
    .then (response => criarArray(response.photos.photo)) 
    
}


//3° SALVAR O OBJETO PARA NAO FAZER FETCH EM TODAS TROCAS DE IMAGEM #####
let arrImg = {}

function criarArray(obj){
        arrImg = obj
    if(arrImg.length !== 0){        // caso a busca retorne itens no array, criar imagens
        let qtd = arrImg.length-1
        qtdFotos(qtd)
        criarImage(arrImg)
    }else{                          // caso a busca nao retorne itens, exibir imagem informando
        images.src = "./src/img/IMG_2190.JPG"
        titulo.innerHTML = `<p class="title">Tente novamente...</p>`
        fotogr.innerHTML = `<p class='ref'> </p>`
    }
}


// 4° FUNCAO QUE CARREGA A IMAGEM #######################################
function criarImage(arr, indice = 0){
    const {farm, server, id, secret, title, owner} = arr[indice]
    images.src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
    titulo.innerHTML = `<p class="title">${title.slice(0,40)}...</p>`
    fotogr.innerHTML = `<p class='ref'>Foto tirada por ${owner}</p>`
    
    
    let item = document.querySelector(`.item${indice}`)
    item.style.backgroundColor = '#F1EEF8'
   
}


// 5° FUNCAO QUE ADICIONA SIMBOLO '-' QTD DE FOTOS #################
function qtdFotos(qtd){
    if(qtd == 0){
        divQtd.innerHTML = `<div class="item0 qtd"></div>`
    }else if(qtd == 1){
        divQtd.innerHTML = `<div class="item0 qtd"></div> <div class="item1 qtd"></div>`
        }else if(qtd == 2){
            divQtd.innerHTML = `<div class="item0 qtd"></div> <div class="item1 qtd"></div> <div class="item2 qtd"></div>` 
            }else if(qtd == 3){
                divQtd.innerHTML = `<div class="item0 qtd"></div> <div class="item1 qtd"></div> <div class="item2 qtd"></div> <div class="item3 qtd"></div>` 
                }else if(qtd == 4){
                    divQtd.innerHTML = `<div class="item0 qtd"></div> <div class="item1 qtd"></div> <div class="item2 qtd"></div> <div class="item3 qtd"></div> <div class="item4 qtd"></div>` 
                    }
}

export{buscaFlickr, arrCoord, criarArray, criarImage, arrImg, qtdFotos}