const buttonPrint = document.getElementById('enviar');
const nameUser = document.getElementById('nameUser');
const assinatura = document.getElementById('assinatura')

nameUser.addEventListener('blur', () =>
  assinatura.innerText = nameUser.innerText   
)
//Validar inputs
const validateFields = {

  validateInputs() {
    const inputAll = document.querySelectorAll("input:not([type='file'])");

    inputAll.forEach((inputAll) => {
      if(inputAll.value === '') {
        throw new Error('error');
      }
    });
  },

  validadeTextAreas() {
    const textAreaAll = document.querySelectorAll('textarea');

    textAreaAll.forEach((textAreaAll) => {
      if(textAreaAll.value === '') {
        throw new Error('error');
      }
    });
  },
  //Mensagem de erro se ouver inputs vazios
  messageError() {
    const modalError = document.querySelector('div.error');

    modalError.classList.add('error-active');

    setTimeout(() => {
      modalError.classList.remove('error-active');
    }, 2000)
  }
  
}

buttonPrint.addEventListener('submit', event => {
  try {
    event.preventDefault();
    validateFields.validateInputs();
    validateFields.validadeTextAreas();
    window.print();

  } catch (error) {
    validateFields.messageError();
  }
})

//Carregar imagem do user
const updateImage = {
  updateFoto() {  
    const elementImg = document.getElementById('update')
    const inputFile = document.getElementById('foto-user').files[0];
   
    const reader = new FileReader();

    reader.onloadend = () => elementImg.src = reader.result;

    if(inputFile) {
      reader.readAsDataURL(inputFile);
    } else {
      elementImg.src = ""
    }
  }
}
//Fazer upload da imagem a cada nova img
document.getElementById('foto-user')
          .addEventListener('change', 
            () => updateImage.updateFoto())


//Remover info. quando não precisar ser assinado
function infoRemove() {
  const elementSpan = document.getElementById('remove');
  const removeToSign = document.getElementById('assinar');
  const containerInfo = document.querySelector('.container-info-remove');

  if(elementSpan || removeToSign) {
    elementSpan.remove();
    removeToSign.remove();  
    containerInfo.classList.add('info-active')
  }

  setTimeout( () => 
      containerInfo.classList.remove('info-active'), 2000);
} 

const buttonRemove = document.querySelector('#info-remove strong');

buttonRemove.addEventListener('click', infoRemove);

//remover section experiencias 
const info_expe = document.getElementById('info-prof');
const remove_expe = document.querySelector('#info-prof h2 span')

remove_expe.addEventListener('click', () => info_expe.remove())

//Alterar o tamanho dos elementos textArea de forma dinâmica
const tx = document.getElementsByTagName('textarea');

for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = '0';
  this.style.height = (this.scrollHeight) + 'px';
}

//Rotacionar imagem 
const rotate = document.querySelector('.rotate');

let setRotate = 90;

rotate.addEventListener('click', () => {
  const fotoUser = document.getElementById('update');
  fotoUser.style.transform = `rotate(${setRotate}deg)`;
  
  setRotate += 90;
})

//ativar container ao remover info

