/**
 * + Compras Mini Mercado - JavaScript
 * Funcionalidades de navegação, formulário e FAQ
 */

document.addEventListener('DOMContentLoaded', function() {
    inicializarAbas();
    inicializarMenuMobile();
    inicializarFormulario();
    inicializarFAQ();
});

/**
 * Sistema de abas - navegação entre seções
 */
function inicializarAbas() {
    const botoesAbas = document.querySelectorAll('.tab-btn');
    const conteudosAbas = document.querySelectorAll('.tab-content');

    botoesAbas.forEach(botao => {
        botao.addEventListener('click', function() {
            const abaAlvo = this.getAttribute('data-tab');

            // Remove classe active de todos
            botoesAbas.forEach(btn => btn.classList.remove('active'));
            conteudosAbas.forEach(conteudo => conteudo.classList.remove('active'));

            // Adiciona classe active no botão e conteúdo selecionados
            this.classList.add('active');
            document.getElementById(abaAlvo).classList.add('active');

            // Fecha menu mobile se estiver aberto
            document.querySelector('.nav-tabs').classList.remove('ativo');
        });
    });
}

/**
 * Função global para abrir aba (usada em links)
 */
function abrirAba(nomeAba) {
    const botao = document.querySelector(`.tab-btn[data-tab="${nomeAba}"]`);
    if (botao) {
        botao.click();
    }
}

/**
 * Menu mobile - toggle para telas pequenas
 */
function inicializarMenuMobile() {
    const menuMobile = document.querySelector('.menu-mobile');
    const navTabs = document.querySelector('.nav-tabs');

    if (menuMobile && navTabs) {
        menuMobile.addEventListener('click', function() {
            navTabs.classList.toggle('ativo');
            this.classList.toggle('ativo');
        });

        // Fecha ao clicar fora
        document.addEventListener('click', function(e) {
            if (!menuMobile.contains(e.target) && !navTabs.contains(e.target)) {
                navTabs.classList.remove('ativo');
                menuMobile.classList.remove('ativo');
            }
        });
    }
}

/**
 * Formulário de contato - validação e feedback
 */
function inicializarFormulario() {
    const formulario = document.getElementById('formContato');

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validação básica
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (!nome || !email || !mensagem) {
                mostrarToast('Por favor, preencha todos os campos obrigatórios.', 'erro');
                return;
            }

            // Simula envio (em produção, integraria com backend)
            mostrarToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
            formulario.reset();
        });

        // Máscara para telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let valor = e.target.value.replace(/\D/g, '');
                if (valor.length > 11) valor = valor.slice(0, 11);
                valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
                valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = valor;
            });
        }
    }
}

/**
 * FAQ - accordion para perguntas e respostas
 */
function inicializarFAQ() {
    const itensFAQ = document.querySelectorAll('.faq-item');

    itensFAQ.forEach(item => {
        const pergunta = item.querySelector('.faq-pergunta');

        pergunta.addEventListener('click', function() {
            const estaAtivo = item.classList.contains('ativo');

            // Fecha todos os outros
            itensFAQ.forEach(outro => {
                outro.classList.remove('ativo');
            });

            // Abre o clicado se não estava aberto
            if (!estaAtivo) {
                item.classList.add('ativo');
            }
        });
    });
}

/**
 * Toast - notificação temporária
 */
function mostrarToast(mensagem, tipo = 'sucesso') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = mensagem;
    toast.className = 'toast visivel';

    if (tipo === 'erro') {
        toast.style.background = '#c1121f';
    } else {
        toast.style.background = 'var(--verde-principal)';
    }

    setTimeout(() => {
        toast.classList.remove('visivel');
    }, 4000);
}
