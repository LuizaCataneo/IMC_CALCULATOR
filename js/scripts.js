// array dos dados do IMC
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

const imcTable = document.querySelector("#imc-table");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const backBtn = document.querySelector("#back-btn");
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

// functions -----------------------------------------------------------------------
function createTable(data) {
  data.forEach((item) => {
    //para cada elemento no array data faça:
    const div = document.createElement("div"); // rie uma div
    div.classList.add("table-data"); // com a classe "table-data"

    const classification = document.createElement("p"); // crie um parágrafo
    classification.innerText = item.classification; // coloque no parágrafo o valor da propriedade classification do item. ATENÇÃO: item.classification está acessando a propriedade classification do objeto[item] do array data. NÃO CONFUNDIR.
    const info = document.createElement("p");
    info.innerText = item.info;
    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    // colocando os elementos na div
    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    // colocando a div no elemento imcTable
    imcTable.appendChild(div);
  });
}

function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.classList = "";
  imcInfo.classList = "";
}

function validDigits(text) {
  return text.replace(/[^0-9,]/g, ""); // substituir por "" tudo que não(^) estiver listado entre os colchetes. Ou seja, retornar apenas os caracteres que são dígitos (0-9) e vírgulas e impede que o usuário digite valores indesejados.
}

function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1); //.toFixed(1) arredonda para uma casa decimal
  return imc;
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide"); // se tem a classe hide a tira e vice versa
  resultContainer.classList.toggle("hide");
}

// init -----------------------------------------------------------------------
createTable(data);

// events -----------------------------------------------------------------------
[heightInput, weightInput].forEach((el) => {
  // para heightInput e weightInput faça:
  el.addEventListener("input", (e) => {
    // quando alguém digitar algo ative a função:
    const updatedValue = validDigits(e.target.value); // updateValue recebe o valor atual do input já validado
    e.target.value = updatedValue; // valor atual do input recebe valor validado
  });
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const weight = +weightInput.value.replace(",", "."); // substituir virgula para ponto para possibilitar a conversão de string para number. "+" faz a conversão.
  const height = +heightInput.value.replace(",", ".");

  if (!weight || !height) return;

  const imc = calcImc(weight, height);

  let info;

  data.forEach((item) => {
    //para cada item do array data:
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  console.log(info);

  if (!info) return;

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade Grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault; // cancela o enviar de formulário default
  cleanInputs();
});

backBtn.addEventListener("click", () => {
  cleanInputs();
  showOrHideResults();
});
