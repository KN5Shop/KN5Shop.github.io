document.addEventListener('DOMContentLoaded', function() {
    // Carregar pedidos
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
});
