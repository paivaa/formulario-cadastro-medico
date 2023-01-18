document.addEventListener('DOMContentLoaded', function () {
  var stepper = document.querySelector('.stepper');
  new MStepper(stepper, {

    stepTitleNavigation: false
  });

  $(document).ready(function() {

    $('#especialidade').select2({
      placeholder: 'Caso possua',
    });

    $('#banco').select2({
      placeholder: 'Banco',
      maximumSelectionLength: 1,
    });

    $('#orgao').select2({
      placeholder: 'Orgão emissor',
      maximumSelectionLength: 1,
    });

    function limpa_formulário_cep() {
      // Limpa valores do formulário de cep.
      $("#endereco").val("");
      $("#bairro").val("");
      $("#cidade").val("");
      $("#uf").val("");
    }
  
    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {
  
      //Nova variável "cep" somente com dígitos.
      var cep = $(this).val().replace(/\D/g, '');
  
      //Verifica se campo cep possui valor informado.
      if (cep != "") {
  
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
  
        //Valida o formato do CEP.
        if (validacep.test(cep)) {
  
          //Preenche os campos com "..." enquanto consulta webservice.
          $("#endereco").val("...");
          $("#bairro").val("...");
          $("#cidade").val("...");
          $("#uf").val("...");
  
          //Consulta o webservice viacep.com.br/
          $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
  
            if (!("erro" in dados)) {
              //Atualiza os campos com os valores da consulta.
              $("#endereco").val(dados.logradouro);
              $("#bairro").val(dados.bairro);
              $("#cidade").val(dados.localidade);
              $("#uf").val(dados.uf);
            } //end if.
            else {
              //CEP pesquisado não foi encontrado.
              limpa_formulário_cep();
              alert("CEP não encontrado.");
            }
          });
        } //end if.
        else {
          //cep é inválido.
          limpa_formulário_cep();
          alert("Formato de CEP inválido.");
        }
      } //end if.
      else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
      }
    });
  
  /////////////////TRAZ NOME DE 328 BANCOS E POPULA O MENU DROPDOWN DE BANCO////////////////
  $.getJSON("https://brasilapi.com.br/api/banks/v1", function (bancos) {
  var nomes_bancos = [];
  var options = '';

  for (var i = 0; i < bancos.length; i++) {
    nomes_bancos.push(bancos[i].fullName);
  }

  nomes_bancos.forEach(function(item){
   options += '<option>' + item + '</option>';
  });
  document.getElementById('banco').innerHTML = options;
});


$.getJSON("https://cadastro.consultoriahealthcare.com/orgaoemissor", function (sigla) {
       var siglas = [];
       var options_siglas = '';

       for (var i = 0; i < sigla.length; i++) {
            siglas.push(sigla[i].sigla);
       }

        siglas.forEach(function(item){
          options_siglas += '<option>' + item + '</option>';
       });
       document.getElementById('orgao').innerHTML = options_siglas;
  });

});

document.getElementById("enviar").addEventListener("click", validateData);
loadingEnd();
});


function validateData() {
try {
  loadingStart();
  var registroInfo = {};
  registroInfo.nome = document.getElementById("nome").value; registroInfo.cpf = document.getElementById("cpf").value;
  registroInfo.rg = document.getElementById("rg").value; registroInfo.orgao_emissor = document.getElementById("orgao").value+"/"+document.getElementById("orgao_uf").value;
  registroInfo.nascimento = document.getElementById("nascimento").value; registroInfo.estado_civil = document.getElementById("estado_civil").value;
  registroInfo.sexo = document.getElementById("sexo").value; registroInfo.email = document.getElementById("email").value;
  registroInfo.celular = document.getElementById("celular").value; registroInfo.crm = document.getElementById("crm").value;
  registroInfo.especialidade = $("#especialidade").val(); registroInfo.subEspecialidade = document.getElementById("subEspecialidade").value;
  registroInfo.rqe = document.getElementById("rqe").value;
  registroInfo.cep = document.getElementById("cep").value; registroInfo.endereco = document.getElementById("endereco").value.toUpperCase() + ", " + document.getElementById("complemento").value.toUpperCase();
  registroInfo.bairro = document.getElementById("bairro").value;
  registroInfo.cidade = document.getElementById("cidade").value; registroInfo.uf = document.getElementById("uf").value;
  registroInfo.banco = document.getElementById("banco").value; registroInfo.agencia = document.getElementById("agencia").value;
  registroInfo.cc = document.getElementById("cc").value; registroInfo.pix = document.getElementById("pix").value;
  registroInfo.questionario = document.getElementById("devweb").value;
  registroInfo.checkbox_politica_privacidade = document.getElementById("checkbox_politica_privacidade").checked;


  function camposEmBranco(number) {
    switch (number) {
      case 1: throw new Error("Campo nome em branco!"); break;
      case 2: throw new Error("Campo cpf em branco!"); break;
      case 3: throw new Error("Campo rg em branco!"); break;
      case 4: throw new Error("Campo orgão emissor em branco!"); break;
      case 5: throw new Error("Campo nascimento em branco!"); break;
      case 6: throw new Error("Campo estado civil em branco!"); break;
      case 7: throw new Error("Campo sexo em branco!"); break;
      case 8: throw new Error("Campo email em branco!"); break;
      case 9: throw new Error("Campo celular em branco!"); break;
      case 10: throw new Error("Campo crm em branco!"); break;
      case 12: throw new Error("Campo endereço em branco!"); break;
      case 13: throw new Error("Campo bairro em branco!"); break;
      case 14: throw new Error("Campo cidade em branco!"); break;
      case 15: throw new Error("Campo estado em branco!"); break;
      case 16: throw new Error("Campo banco em branco!"); break;
      case 17: throw new Error("Campo agência em branco!"); break;
      case 18: throw new Error("Campo conta corrente em branco!"); break;
      case 19: throw new Error("Escolha uma opção do questionário"); break;
      case 21: throw new Error("Escolha a UF do orgão emissor"); break;
      case 20: throw new Error("É necessário dar aceite aos Termos e Condições da Politica de Privacidade"); break;
    }
  }


  registroInfo.nome == "" ? camposEmBranco(1) : ""; registroInfo.cpf == "" ? camposEmBranco(2) : ""; registroInfo.rg == "" ? camposEmBranco(3) : "";
  registroInfo.orgao_emissor == "" ? camposEmBranco(4) : ""; registroInfo.nascimento == "" ? camposEmBranco(5) : ""; registroInfo.estado_civil == "" ? camposEmBranco(6) : "";
  registroInfo.sexo == "" ? camposEmBranco(7) : ""; registroInfo.email == "" ? camposEmBranco(8) : ""; registroInfo.celular == "" ? camposEmBranco(9) : "";
  registroInfo.crm == "" ? camposEmBranco(10) : ""; registroInfo.endereco == "" ? camposEmBranco(12) : "";
  registroInfo.bairro == "" ? camposEmBranco(13) : ""; registroInfo.cidade == "" ? camposEmBranco(14) : ""; registroInfo.estado == "" ? camposEmBranco(15) : "";
  registroInfo.banco == "" ? camposEmBranco(16) : ""; registroInfo.agencia == "" ? camposEmBranco(17) : ""; registroInfo.conta_corrente == "" ? camposEmBranco(18) : "";
  registroInfo.questionario == "" ? camposEmBranco(19) : ""; registroInfo.checkbox_politica_privacidade == false ? camposEmBranco(20) : "";
  document.getElementById("orgao_uf").value == "" ? camposEmBranco(21) : "";

  axios.post('https://cadastro.consultoriahealthcare.com/novo', registroInfo).then(function () {
    loadingEnd();
    alert('Salvo com sucesso!');
    window.open("Bem-Vindo.html", "_self");
  }).catch(function (error) {
    loadingEnd();
    console.log("Erro no server: " + error.message);
  });

} catch (error) {
  alert(error.message);
  console.log("Erro no frontend: " + error.message);
  loadingEnd();
}
}

//mascara do campo Nome
function ApenasLetras(e, t) {
try {
  if (window.event) {
    var charCode = window.event.keyCode;
  } else if (e) {
    var charCode = e.which;
  } else {
    return true;
  }
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
    return true;
  else
    return false;
} catch (err) {
  alert(err.Description);
}
}

//mascara para o campo CPF
function fMasc(objeto, mascara) {
obj = objeto
masc = mascara
setTimeout("fMascEx()", 1)
}

function fMascEx() {
obj.value = masc(obj.value)
}

function mCPF(cpf) {
cpf = cpf.replace(/\D/g, "")
cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
return cpf
}
/////////////////////////////////////////////////

function fMascRG(objeto, mascara) {
  obj = objeto
  masc = mascara
  setTimeout("fMascExRG()", 1)
}

function fMascExRG() {
  obj.value = masc(obj.value)
}

function mRG(rg) {
  rg = rg.replace(/\D/g, "")
  return rg
}


//mascara para o campo Celular
function Mascara(objeto) {
if (objeto.value.length == 0)
  objeto.value = '(' + objeto.value;

if (objeto.value.length == 3)
  objeto.value = objeto.value + ')';

if (objeto.value.length == 9)
  objeto.value = objeto.value + '-';
}

//mascara para o campo CEP
function MascaraCep(objeto) {
if (objeto.value.length == 5)
  objeto.value = objeto.value + '-';

}

function loadingStart() {
$("#loader").addClass('loader-wrapper is-active');
$("#loader2").addClass('loader is-loading');
}
function loadingEnd() {
$("#loader").removeClass('loader-wrapper is-active');
$("#loader2").removeClass('loader is-loading');
}