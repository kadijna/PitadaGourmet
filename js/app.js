var menuAtivo = "";
var valorTotal = [];
var valorCompra = 0;

$(document).ready(function () {

    $('#menu-toggle').on('click', function () {
        $('aside#menu').toggleClass('active');

        menuAtivo = $('aside#menu').hasClass('active');


        if (menuAtivo == true) {
            $('#content').click(function () {
                $('aside#menu').removeClass('active');
            });
        }

    });

    $('.receita-social button').on('click', function () {
        $(this).toggleClass('active');
    });

    $('.btn-modal').on('click', function () {
        $('div#abrirModal').toggleClass();
    });

    $('div#abrirModal').resize(function () {
        $('#abrirModal').removeClass();
    });

    $('.cancelar').on('click', function () {
        if ($('section#ingredientes ul').hasClass('select-itens')) {
            $('section#ingredientes ul').removeClass('select-itens');
            $('section#ingredientes ul li').removeClass('selected');
        }
        $('div.compra.first').removeClass('hide');
        $('div.compra.second').addClass('hide');
    });

    $('.comprar-itens').on('click', function () {
        $('div.compra.first').addClass('hide');
        $('div.compra.second').removeClass('hide');
        $('section#ingredientes ul').toggleClass('select-itens');
    });

    $('section#ingredientes ul li').on('click', function () {
        if ($('section#ingredientes ul').hasClass('select-itens')) {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
            }
        }
    });

    $('body#ingrediente div.ingrediente div.nome-ingrediente').on('click', function () {
        $(this).parent('.ingrediente').eq(0).toggleClass('active');
    });

    $('body#ingrediente div.ingrediente div.add-ingrediente button').on('click', function (evt) {
        evt.preventDefault();
    });

    $('.login-enviar button, .login-social button').on('click', function () {
        $("div.n-logado").hide();
        $('div.logado').show();
        $('aside#menu').addClass('active');
    });

    $('#menu .btn-sair').on('click', function () {
        $("div.logado").hide();
        $('div.n-logado').show();
    });

    $('#menu .btn-sair').on('click', function () {
        $("div.logado-livro").hide();
        $('div.deslogado-livro').show();
    });

    // Contador de números de pessoas na receita, conta apartir do número um.
    $(".aumentar").click(function () {
        $('#counter').val(parseInt($('#counter').val()) + 1);
        return false;
    });
    $(".diminuir").click(function () {
        if ($("#counter").val() != 1) {
            $('#counter').val(parseInt($('#counter').val()) - 1);
        }
        return false;
    });

});
// Faz a rolagem do botão ficar mais suave.
jQuery(document).ready(function ($) {
    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 800);
    });
});



$(document).ready(function () {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");

    }

    //click do botão do cep
    $(".btncep").on('click', function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $('#cep').val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");


                //Consulta o webservice viacep.com.br/
                $.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
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
});


// Cálculos da Receita


$(document).ready(function () {

    for (var i = 0; i < $('body.carrinho .ingrediente h2').length; i++) {
        $('body.carrinho .ingrediente h2')[i].childNodes[0].textContent += (" - R$ " + $('.ingrediente input[name="total"]')[i].defaultValue.replace(".", ","));
    }; //Adiciona o valor total depois do nome do ingrediente

    for (var y = 0; y < $(".ingrediente input[name='total']").length; y++) {
        valorTotal.push($(".ingrediente input[name='total']")[y].defaultValue);
    }; //Cria um array com os valores totais de cada ingrediente para dar o valor total da compra

    for (var x = 0; x < valorTotal.length; x++) {
        valorCompra += parseFloat(valorTotal[x]);
    }; //Soma todos os Valores do Array valot Total

    for (var z = 0; z < $(".ingrediente input[name='total']").length; z++) {
        $(".ingrediente input[name='total']")[z].value = ("R$ " + $(".ingrediente input[name='total']")[z].defaultValue.replace(".", ","));
    }; //Adiciona R$ ao input valor total

    $('#info-compra .valor-total')[0].innerText = 'R$ ' + valorCompra.toString().replace(".", ",");

});

$('#add-ingrediente-btn').on('click', function () {
    var numberPasso = $('#full-passe .passo').length + 1;
    $('#full-passe').append($('#full-passe .passo')[0].outerHTML.replace("Ingrediente 1", "Ingrediente " + numberPasso));

    $('.passo .icon-lixeira').on('click', function () {
        if ($('#full-passe .passo').length > 1) {
            $(this).parent('.passo').remove();
        }
        for (var ingNumber = 0; ingNumber < $('#full-passe .passo').length; ingNumber++) {
            $('#full-passe .passo input').eq(ingNumber).attr("placeholder", 'Ingrediente ' + (ingNumber + 1));
        }
    });
});

$('#add-passos-btn').on('click', function () {
    var numberPasso = $('#full-preparo .passo').length + 1;
    $('#full-preparo').append($('#full-preparo .passo')[0].outerHTML.replace("Passo 1", "Passo " + numberPasso));

    $('.passo .icon-lixeira').on('click', function () {
        if ($('#full-preparo .passo').length > 1) {
            $(this).parent('.passo').remove();
        }
        for (var ingNumber = 0; ingNumber < $('#full-preparo .passo').length; ingNumber++) {
            $('#full-preparo .passo input').eq(ingNumber).attr("placeholder", 'Passo ' + (ingNumber + 1));
        }
    });
});


$('.finalizar-compra').on('click',function(){
    alert('Compra finalizada com sucesso');
});

// Remover carrinho

