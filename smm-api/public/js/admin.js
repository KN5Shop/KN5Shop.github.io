document.addEventListener('DOMContentLoaded', function() {
    // Carregar pedidos na página de pedidos
    if (window.location.pathname.includes('orders.html')) {
        fetch('/api/orders')
            .then(response => response.json())
            .then(orders => {
                const ordersTableBody = document.querySelector('#orders-table tbody');
                orders.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order.id}</td>
                        <td>${order.date}</td>
                        <td>${order.name}</td>
                        <td>${order.service}</td>
                        <td>${order.status}</td>
                    `;
                    ordersTableBody.appendChild(row);
                });
            });
    }

    // Carregar usuários na página de usuários
    if (window.location.pathname.includes('users.html')) {
        fetch('/api/users')
            .then(response => response.json())
            .then(users => {
                const usersTableBody = document.querySelector('#users-table tbody');
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.status}</td>
                    `;
                    usersTableBody.appendChild(row);
                });
            });
    }

    // Carregar serviços na página de serviços
    if (window.location.pathname.includes('services.html')) {
        fetch('/api/services')
            .then(response => response.json())
            .then(services => {
                const servicesTableBody = document.querySelector('#services-table tbody');
                services.forEach(service => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${service.id}</td>
                        <td>${service.name}</td>
                        <td>${service.description}</td>
                        <td>${service.price}</td>
                    `;
                    servicesTableBody.appendChild(row);
                });
            });
    }

    // Carregar notificações na página de notificações
    if (window.location.pathname.includes('notifications.html')) {
        fetch('/api/notifications')
            .then(response => response.json())
            .then(notifications => {
                const notificationsList = document.querySelector('#notifications-list');
                notifications.forEach(notification => {
                    const listItem = document.createElement('li');
                    listItem.textContent = notification.message;
                    notificationsList.appendChild(listItem);
                });
            });
    }
});
