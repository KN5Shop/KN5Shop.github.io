// painel.js

document.addEventListener('DOMContentLoaded', function() {
    const notificationList = document.getElementById('notification-list');
    const ordersTableBody = document.querySelector('#orders-table tbody');

    // WebSocket Setup
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = function(event) {
        const message = JSON.parse(event.data);

        if (message.type === 'notifications') {
            notificationList.innerHTML = message.data.map(notification => `<li>${notification.message}</li>`).join('');
        }

        if (message.type === 'orders') {
            ordersTableBody.innerHTML = message.data.map(order => `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.date}</td>
                    <td>${order.customer}</td>
                    <td>${order.status}</td>
                </tr>
            `).join('');
        }
    };

    ws.onerror = function() {
        console.log('Erro no WebSocket, iniciando polling como fallback.');
        startPolling();
    };

    ws.onclose = function() {
        console.log('WebSocket fechado, iniciando polling como fallback.');
        startPolling();
    };

    // Polling Function
    function startPolling() {
        function loadNotifications() {
            fetch('/api/notifications')
                .then(response => response.json())
                .then(notifications => {
                    notificationList.innerHTML = notifications.map(notification => `<li>${notification.message}</li>`).join('');
                });
        }

        function loadOrders() {
            fetch('/api/orders')
                .then(response => response.json())
                .then(orders => {
                    ordersTableBody.innerHTML = orders.map(order => `
                        <tr>
                            <td>${order.id}</td>
                            <td>${order.date}</td>
                            <td>${order.customer}</td>
                            <td>${order.status}</td>
                        </tr>
                    `).join('');
                });
        }

        // Carregar dados inicialmente
        loadNotifications();
        loadOrders();

        // Atualizar dados a cada 30 segundos
        setInterval(() => {
            loadNotifications();
            loadOrders();
        }, 30000); // 30000 ms = 30 segundos
    }

    // Inicialmente carregar os dados se WebSocket não estiver disponível
    startPolling();
});
