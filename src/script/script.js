let deseosArray = []
const keyArrayDeseos = 'arrayDeseos'
let contenedorLista;

const guardarEnStorage = (key, info) => {
    const infoStorage = JSON.stringify(info)
    localStorage.setItem(key, infoStorage)
}

const obtenerDeSotrage = (key) => {
    const infoGuardada = JSON.parse(localStorage.getItem(key))
    return infoGuardada
}

const limpiarElemento = (e) => {
    e.target.closest('.lista-items').remove()
    let input = e.target.closest('.lista-items').querySelector('.lista-input').value
    deseosArray = obtenerDeSotrage(keyArrayDeseos)
    nuevoDeseosArray = deseosArray.filter((deseo) => deseo !== input)
    guardarEnStorage(keyArrayDeseos, nuevoDeseosArray)
}

const editarElemento = (e) => {
    let input = e.target.closest('.lista-items').querySelector('.lista-input')
    console.log(input.dataset.index);
    if(e.target.closest('.lista-items').querySelector('.lista-input').readOnly){
        e.target.closest('.lista-items').querySelector('.lista-input').readOnly = false
        input.classList.add('select')

    }else{
        deseosArray = obtenerDeSotrage(keyArrayDeseos)
        deseosArray[input.dataset.index] = input.value
        guardarEnStorage(keyArrayDeseos, deseosArray)
        e.target.closest('.lista-items').querySelector('.lista-input').readOnly = true
        input.classList.remove('select')
    }
    console.log(input.readOnly);
}

const editarRemover = ()=>{

    const  btnRemover = document.querySelectorAll('.btnRemover')
    const  btnEditar = document.querySelectorAll('.btnEditar')

    for( let btn of btnRemover){
        btn.addEventListener('click', limpiarElemento)
    }
    for( let btn of btnEditar){
        btn.addEventListener('click', editarElemento)
    }
}


const crearContenido = (deseosArr) => {
    contenedorLista.innerHTML =""

    for(let i = 0; i < deseosArr.length; i += 1){
        const li = document.createElement('li')
        li.classList.add('lista-items')
        li.innerHTML = `
        <input type="text" class="lista-input" data-index='${i}' value="${deseosArr[i]}" readonly>
        <div class="contenedor-iconos">
            <button class="lista-button btnEditar" >
                <img src="./src/pics/edit.svg" alt="" class="lista-icono">
            </button>
            <button class="lista-button btnRemover">
                <img src="./src/pics/trash.svg" alt="" class="lista-icono">
            </button>
        </div>
        `
        contenedorLista.appendChild(li)
    }
    editarRemover()

}

const render = (info) => {
    const formDeseos = document.getElementById('formDeseos')
    contenedorLista = document.getElementById('contenedorLista')


    if(!obtenerDeSotrage(keyArrayDeseos) && info){
        deseosArray.push(info)
        guardarEnStorage(keyArrayDeseos, deseosArray)
        crearContenido(deseosArray)
    }else if(obtenerDeSotrage(keyArrayDeseos)){
        deseosArray = obtenerDeSotrage(keyArrayDeseos)
        if(info){
            deseosArray.push(info)
        }
        crearContenido(deseosArray)
        guardarEnStorage(keyArrayDeseos, deseosArray)
    }
    formDeseos.addEventListener('submit', obtenerInfoInput)
}

const obtenerInfoInput = (e) =>{
    e.preventDefault()
    const nota = document.getElementById('nota')
    nota.innerText = ''
    let inputInfo = document.getElementById('inputInfo')
    if(!inputInfo.value){
        nota.innerText = 'Agrega algo a tu lista de deseos'
        setTimeout(()=>{
            nota.innerText = ''
        }, 3000)
    }else{
        render(inputInfo.value)
        inputInfo.value = ''
    }
}

window.addEventListener('DOMContentLoaded', function ()  {
    render()
    document.getElementById('limpiar').addEventListener('click', () => {
        localStorage.clear()
        contenedorLista.innerHTML =""
        deseosArray = []
    })
})