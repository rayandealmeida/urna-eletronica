let votoPara = document.querySelector('.div-1-1 span');
let cargo = document.querySelector('.div-1-2 span');
let descricao = document.querySelector('.div-1-4');
let aviso = document.querySelector('.div-2');
let lateral = document.querySelector('.div-1-right');
let numeros = document.querySelector('.div-1-3');
let votos=[];

let etapaAtual = 0;
let num = "";
let votoBranco = false;
function startEtapa(){
    num='';
    
    
    let etapa = etapas[etapaAtual];
    let numeroHtml ='';
    votoBranco = false;
    for(let i=0;i<etapa.numeros;i++){
        if(i === 0){
            numeroHtml += '<div class="number pisca"></div>';
        }
        else{
            numeroHtml += '<div class="number"></div>';
        }
        
    }
    
    votoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    lateral.innerHTML='';
    numeros.innerHTML=numeroHtml;
    aviso.style.display ='none';
    


}
function atualizarInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === num){
            return true;
            
        }
        else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        votoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        aviso.style.display ='block';

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="div-1-image small"><img src="assets/image/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>` ;
            }else{
                fotosHtml += `<div class="div-1-image"><img src="assets/image/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>` ;
            }
            
        }
        lateral.innerHTML = fotosHtml;
    }
    else{
        votoPara.style.display = 'block';
        aviso.style.display ='block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';

    }
    console.log('candidato:',candidato);


}

function clicou(n){
    let elem = document.querySelector('.number.pisca');
    if(elem !== null){
        elem.innerHTML = n;
        num = `${num}${n}`;

        elem.classList.remove('pisca');
        if(elem.nextElementSibling !== null){
            elem.nextElementSibling.classList.add('pisca');
        }
        else{
            atualizarInterface();
        }


    }
}
function branco(){
    if(num === ''){
        votoBranco = true;
        votoPara.style.display = 'block';
        aviso.style.display ='block';
        numeros.innerHTML='';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    }
    else{
        alert('Para votar em BRANCO não pode ter números digitados');
    }
}

function corrige(){
    startEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });

    }
    else if(num.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: num
        });
    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            startEtapa();
        }else{
            document.querySelector('.urna-tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
    
}

startEtapa();