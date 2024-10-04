const getCSS = (variavel) => {
    const bodyStyles = getComputedStyle(document.body)
    return bodyStyles.getPropertyValue(variavel)
}

const tickConfig = {
    family: getCSS('--font'),
    size: 16,
    color: getCSS('--primary-color')
}

export { getCSS, tickConfig }

const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/dados-globais.json'

async function vizualizarInformacoesGlobais() {
    const res = await fetch(url)
    const dados = await res.json()
    const pessoasConectadas = (dados.total_pessoas_conectadas / 1e9)
    const pessoasNoMundo = (dados.total_pessoas_mundo / 1e9)
    const horas = parseInt(dados.tempo_medio)
    const minutos = Math.round((dados.tempo_medio - horas) * 100)
    const porcentagemConectada = ((pessoasConectadas / pessoasNoMundo ) * 100).toFixed(2)

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('graficos-container__texto')
    
    // Adicionando estilos diretamente no JavaScript
    paragrafo.style.backgroundColor = '#f0f0f0'; // Cor de fundo clara
    paragrafo.style.color = '#333'; // Cor do texto para bom contraste
    paragrafo.style.padding = '15px'; // Adiciona espaço ao redor do texto
    paragrafo.style.borderRadius = '8px'; // Borda arredondada
    paragrafo.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Sombra leve para destaque
    paragrafo.style.fontFamily = getCSS('--font'); // Mantém a fonte do estilo global
    paragrafo.style.fontSize = '16px'; // Ajusta o tamanho da fonte
    paragrafo.style.fontWeight = 'bold'; // Torna o texto mais destacado
    paragrafo.style.lineHeight = '1.5'; // Aumenta a altura da linha para melhor legibilidade

    paragrafo.innerHTML = `Você sabia que o mundo tem <span>${pessoasNoMundo} bilhões</span> de pessoas e que aproximadamente <span>${pessoasConectadas} bilhões</span> estão conectadas em alguma rede social e passam em média <span>${horas} horas</span> e <span>${minutos} minutos</span> conectadas.<br>Isso significa que aproximadamente <span>${porcentagemConectada}%</span> de pessoas estão conectadas em alguma rede social.`

    const container = document.getElementById('graficos-container')
    container.appendChild(paragrafo)
}

vizualizarInformacoesGlobais()
