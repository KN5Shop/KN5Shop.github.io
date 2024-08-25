document.addEventListener('DOMContentLoaded', () => {
    // Carregar serviços e pedidos
    fetchServices();
    fetchOrders();

    // Envio do formulário de suporte
    document.getElementById('support-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const message = document.getElementById('support-message').value;
        await sendSupportMessage(message);
        alert('Sua mensagem foi enviada!');
    });

    // Envio do formulário de configurações
    document.getElementById('settings-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        await updateSettings(email, password);
        alert('Configurações salvas!');
    });
});

async function fetchServices() {
    try {
        const response = await fetch('/api/services');
        const services = await response.json();
        const serviceList = document.getElementById('service-list');
        serviceList.innerHTML = '';
        services.forEach(service => {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'service-item';
            serviceItem.innerHTML = `
                <h3>${service.name}</h3>
                <p>Preço: R$${service.price}</p>
                <button onclick="buyService(${service.id})">Comprar</button>
            `;
            serviceList.appendChild(serviceItem);
        });
    } catch (error) {
        console.error('Erro ao carregar serviços:', error);
    }
}

async function fetchOrders() {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();
        const orderHistory = document.getElementById('order-history');
        orderHistory.innerHTML = '';
        orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <h3>Pedido #${order.id}</h3>
                <p>Serviço: ${order.serviceName}</p>
                <p>Status: ${order.status}</p>
            `;
            orderHistory.appendChild(orderItem);
        });
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
        alert(result.message);
    } catch (error) {
        console.error('Erro ao comprar serviço:', error);
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
