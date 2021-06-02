const buttonPrint = document.getElementById('enviar')
const nameUser = document.getElementById('nameUser')
const assinatura = document.getElementById('assinatura')

nameUser.addEventListener('blur', 
  () => assinatura.innerText = nameUser.innerText)

//-------------Validar inputs
const validateFields = {

  validateInputs() {
    const inputAll = document.querySelectorAll("main input:not([type='file'])")

    for(const input of inputAll) 
      if(input.value === '') {
        input.focus()
        throw new Error('error')
      }
  },

  validadeTextAreas() {
    const textAreaAll = document.querySelectorAll('textarea')

    for(const textArea of textAreaAll)
      if(textArea.value === '') {
        textArea.focus()
        throw new Error('error')
      }
  },
  //Mensagem de erro se ouver inputs vazios
  messageError() {
    const modalError = document.querySelector('div.error')

    modalError.classList.add('error-active')

    setTimeout(() => 
      modalError.classList.remove('error-active'), 2000)
  }
}

//Remover info. quando não precisar ser assinado
function infoRemove() {
  const elementSpan = document.getElementById('remove')
  const removeToSign = document.getElementById('assinar')
  const yes = document.getElementById('sim')

  if(!yes.checked) {
    if(elementSpan || removeToSign) {
      elementSpan.remove()
      removeToSign.remove()
    } 
  }
} 

buttonPrint.addEventListener('submit', event => {
  try {
    event.preventDefault()
    validateFields.validateInputs()
    validateFields.validadeTextAreas()
    infoRemove()
    window.print()
  } catch (error) {
    validateFields.messageError()
  }
})

//upload image user

function updateFoto() {  
  const img = document.getElementById('update')
  const file = this.files[0]
  
  const reader = new FileReader()

  reader.onloadend = () => img.src = reader.result

  if(file) 
    reader.readAsDataURL(file) 
  else 
    img.src = ''
}
//Fazer upload da imagem a cada nova img
document.getElementById('foto-user')
  .addEventListener('change', updateFoto)
  
//remover section experiencias 
const info_expe = document.getElementById('info-prof')
const remove_expe = document.querySelector('#info-prof h2 span')

remove_expe.addEventListener('click', () => info_expe.remove())

//Alterar o tamanho dos elementos textArea de forma dinâmica
const textArea = document.querySelectorAll('textarea')

function OnInput() {
  this.style.height = '0'
  this.style.height = (this.scrollHeight) + 'px'
}

textArea.forEach( tx => {
  tx.setAttribute('style', 'height:' + (tx.scrollHeight) + 'px;overflow-y:hidden;');
  tx.addEventListener("input", OnInput)
})

//Rotacionar imagem 
const rotate = document.querySelector('.rotate')

let setRotate = 90

rotate.addEventListener('click', () => {
  const fotoUser = document.getElementById('update')

  fotoUser.style.transform = `rotate(${setRotate}deg)`
  setRotate += 90
})

const AddExp = document.getElementById('add_expe')
const modalAddEx = document.getElementById('modal')
const btnAdd = document.querySelector('#modal form')
const btnRemove = document.getElementById('modalClose')

AddExp.addEventListener('click', 
  () => modalAddEx.classList.add('modal_active'))

btnRemove.addEventListener('click', event => {
  event.preventDefault()

  modalAddEx.classList.remove('modal_active')
})


// ADIONAR EXPERIÊNCIA
const listaExp = document.getElementById('add')
const empresa = document.createElement('li')
const cargo = document.createElement('li')

const addExperiencia = {

  updateExpe() {
    const nameEmpresa = document.getElementById('nameEmpresa')
    const nameCargo = document.getElementById('cargo')

    listaExp.innerHTML += `
      <li>
          ${nameEmpresa.value} 
          <span id="rmvExp"> <img src="icons/minus.svg" 
          title="Remover"> </span> 
      </li> 
      <li>Cargo: ${nameCargo.value}</li>
    `
    //Reset values
    nameEmpresa.value = ''
    nameCargo.value = ''
  },
  removeExe() {
    const btnRmv = document.querySelectorAll('#rmvExp')

    btnRmv.forEach( current => {
      current.addEventListener('click', (event) => {
        const liElement = event.currentTarget.parentNode
        const nextElement = liElement.nextElementSibling
        
        nextElement.remove()
        liElement.remove()
      });
    })
  }
}

//Removendo experiencias
btnAdd.addEventListener('submit', event => {
  event.preventDefault()

  addExperiencia.updateExpe()
  modalAddEx.classList.remove('modal_active')
  addExperiencia.removeExe(event)
})

