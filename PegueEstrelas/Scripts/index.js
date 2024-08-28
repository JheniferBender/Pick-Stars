$(document).ready(function () {

    var pontuacao = 0;
    var tempo = 30;
    var intervalo;
    var imagemAnterior = '../img/Estrelinha.png';
    var novaImagem = '../img/EstrelinhaQuebrada.png';
    var somClique = $('#som-estrela')[0];

    function moverImagem() {
        const containerLargura = $('.container-jogo').width();
        const containerAltura = $('.container-jogo').height();

        const imgLargura = $('img.imagem').width();
        const imgAltura = $('img.imagem').height();

        const newLeft = Math.random() * (containerLargura - imgLargura);
        const newTop = Math.random() * (containerAltura - imgAltura);

        $('.imagem').css({
            left: newLeft + 'px',
            top: newTop + 'px'
        });
    }

    function atualizaPontos() {
        $('.imagem').click(function () {
            pontuacao += 1;
            $('#pontuacao').text(pontuacao);
            moverImagem();
        });
    }

    function atualizarTempo() {
        tempo -= 1;
        $('#tempo-contagem').text(tempo);

        if (tempo <= 0) {
            clearInterval(intervalo);
            $('.imagem').off('click');
            $('.imagem').fadeOut();
            alert('O jogo acabou! Sua pontuação foi de: ' + pontuacao + ' ' + 'Estrelas');
        }
    }

    function mudaImagem() {

        $('.imagem').click(function () {
            var imagemAtual = $(this).attr('src');
            if (imagemAtual === imagemAnterior) {
                $(this).attr('src', novaImagem);
            } else {
                $(this).attr('src', imagemAnterior);
            }
        });
    }

    function ajustarTamanhoImagem(dificuldade) {
        var tamanho;

        if (dificuldade === 'facil') {
            tamanho = 110; 
        } else if (dificuldade === 'medio') {
            tamanho = 70; 
        } else if (dificuldade === 'dificil') {
            tamanho = 50; 
        }

        $('.imagem').css({
            width: tamanho + 'px',
            height: tamanho + 'px'
        });
    }

    $('#dificuldade').change(function () {
        var dificuldadeSelecionada = $(this).val();
        ajustarTamanhoImagem(dificuldadeSelecionada);
    });

    function efeitoSonoro(){
        $('.imagem').click(function() {
            somClique.play(); 
        });
    }



intervalo = setInterval(atualizarTempo, 1000);

efeitoSonoro();

ajustarTamanhoImagem('facil');

mudaImagem();

atualizaPontos();

setInterval(moverImagem, 1000);

});
