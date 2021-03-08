const buttonPrint = document.getElementById('enviar');
const nameUser = document.getElementById('nameUser');
const assinatura = document.getElementById('assinatura')

setInterval(() => {
  assinatura.innerText = nameUser.innerText;
}, 1000);

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

  messageError() {
    const modalError = document.querySelector('div.error');

    modalError.classList.add('error-active');

    setTimeout(() => {
      modalError.classList.remove('error-active');
    }, 2000)
  }
  
}

buttonPrint.addEventListener('submit', (event) => {
  try {
    event.preventDefault();
    validateFields.validateInputs();
    validateFields.validadeTextAreas();
    window.print();

  } catch (error) {
    validateFields.messageError();
  }
})


const updateImage = {
  updateFoto() {  
    const elementImg = document.getElementById('update')
    const inputFile = document.getElementById('foto-user').files[0];
   
    const reader = new FileReader();

    reader.onloadend = () => {
      elementImg.src = reader.result;
    }

    if(inputFile) {
      reader.readAsDataURL(inputFile);
    } else {
      elementImg.src = ""
    }
  }
}

document.getElementById('foto-user')
  .addEventListener('change', () => {
  updateImage.updateFoto()
  })


//Remover info. quando não precisar ser assinado

function infoRemove() {
  const elementSpan = document.getElementById('remove');
  const removeToSign = document.getElementById('assinar');

  if(elementSpan || removeToSign) {
    elementSpan.remove();
    removeToSign.remove();  
  }
} 

const buttonRemove = document.querySelector('#info-remove strong');

buttonRemove.addEventListener('click', infoRemove);

//remover section experiencias 
const info_expe = document.getElementById('info-prof');

const remove_expe = document.querySelector('#info-prof h2 span')

remove_expe.addEventListener('click', () => {
  info_expe.remove()
})



