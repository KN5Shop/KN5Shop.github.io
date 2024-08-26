// painel.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('visible');
    });

    fetchServices();
    fetchOrders();

    document.getElementById('support-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const message = document.getElementById('support-message').value;
        await sendSupportMessage(message);
        showFeedback('Sua mensagem foi enviada com sucesso!');
    });

    document.getElementById('settings-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        await updateSettings(email, password);
        showFeedback('Configurações salvas!');
    });

    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('feedback-modal').style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            document.getElementById('feedback-modal').style.display = 'none';
        }
    });
});

async function fetchServices() {
    try {
        const response = await fetch('/api/servicos'); // Corrigido para '/api/servicos'
        const services = await response.json();
        const serviceList = document.getElementById('service-list');
        serviceList.innerHTML = services.map(service => `
            <div class="service-item">
                <h3>${service.nome}</h3> <!-- Corrigido para service.nome -->
                <p>${service.descricao}</p> <!-- Corrigido para service.descricao -->
                <p>Preço: R$${service.preco.toFixed(2)}</p> <!-- Corrigido para service.preco -->
                <button onclick="buyService(${service.id})">Comprar</button> <!-- Corrigido para service.id -->
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar serviços:', error);
    }
}

async function fetchOrders() {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();
        const orderHistory = document.getElementById('order-history');
        orderHistory.innerHTML = orders.map(order => `
            <div class="order-item">
                <h3>Pedido #${order.id}</h3>
                <p>Serviço: ${order.serviceName}</p>
                <p>Status: ${order.status}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
    }
}

async function buyService(serviceId) {
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify({ serviceId }),
            headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();
        showFeedback(result.message);
    } catch (error) {
        console.error('Erro ao comprar serviço:', error);
        showFeedback('Erro ao processar a compra.');
    }
}

async function sendSupportMessage(message) {
    try {
        await fetch('/api/support', {
            method: 'POST',
            body: JSON.stringify({ message }),
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Erro ao enviar mensagem de suporte:', error);
        showFeedback('Erro ao enviar mensagem de suporte.');
    }
}

async function updateSettings(email, password) {
    try {
        await fetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Erro ao atualizar configurações:', error);
    }
}

function showFeedback(message) {
    const modal = document.getElementById('feedback-modal');
    const feedbackMessage = document.getElementById('feedback-message');
    feedbackMessage.textContent = message;
    modal.style.display = 'block';
}
