document.addEventListener('DOMContentLoaded', () => {
    const serviceSelect = document.getElementById('service');
    const detailsSelect = document.getElementById('details');

    serviceSelect.addEventListener('change', (event) => {
        const category = event.target.value;
        populateDetails(category);
    });

    document.getElementById('orderForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const service = document.getElementById('details').value;
        
        if (name && service) {
            const whatsappUrl = `https://api.whatsapp.com/send?phone=+5519995271979&text=Olá, gostaria de solicitar ${service} com o nome ${name}.`;
            window.open(whatsappUrl, '_blank');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});

function populateDetails(category) {
    const detailsSelect = document.getElementById('details');
    detailsSelect.innerHTML = ''; // Clear existing options

    let options = [];
    
    if (category === 'worldwide') {
        options = [
            { value: '500 seguidores mundiais - R$5.00', text: '🌍 500 seguidores mundiais - R$5.00' },
            { value: '1000 seguidores mundiais - R$10.00', text: '🌍 1000 seguidores mundiais - R$10.00' },
            { value: '1500 seguidores mundiais - R$15.00', text: '🌍 1500 seguidores mundiais - R$15.00' },
            { value: '2000 seguidores mundiais - R$20.00', text: '🌍 2000 seguidores mundiais - R$20.00' },
            { value: '2500 seguidores mundiais - R$25.00', text: '🌍 2500 seguidores mundiais - R$25.00' },
            { value: '500 visualizações mundiais - R$0.50', text: '🌍 500 visualizações mundiais - R$0.50' },
            { value: '1000 visualizações mundiais - R$1.00', text: '🌍 1000 visualizações mundiais - R$1.00' },
            { value: '1500 visualizações mundiais - R$1.50', text: '🌍 1500 visualizações mundiais - R$1.50' },
            { value: '2000 visualizações mundiais - R$2.00', text: '🌍 2000 visualizações mundiais - R$2.00' },
            { value: '2500 visualizações mundiais - R$2.50', text: '🌍 2500 visualizações mundiais - R$2.50' },
            { value: '500 curtidas mundiais - R$1.50', text: '🌍 500 curtidas mundiais - R$1.50' },
            { value: '1000 curtidas mundiais - R$3.00', text: '🌍 1000 curtidas mundiais - R$3.00' },
            { value: '1500 curtidas mundiais - R$4.50', text: '🌍 1500 curtidas mundiais - R$4.50' },
            { value: '2000 curtidas mundiais - R$6.00', text: '🌍 2000 curtidas mundiais - R$6.00' },
            { value: '2500 curtidas mundiais - R$7.50', text: '🌍 2500 curtidas mundiais - R$7.50' }
        ];
    } else if (category === 'brazilian') {
        options = [
            { value: '500 seguidores brasileiros - R$12.00', text: '🇧🇷 500 seguidores brasileiros - R$12.00' },
            { value: '1000 seguidores brasileiros - R$24.00', text: '🇧🇷 1000 seguidores brasileiros - R$24.00' },
            { value: '1500 seguidores brasileiros - R$34.00', text: '🇧🇷 1500 seguidores brasileiros - R$34.00' },
            { value: '2000 seguidores brasileiros - R$46.00', text: '🇧🇷 2000 seguidores brasileiros - R$46.00' },
            { value: '500 visualizações brasileiras - R$1.00', text: '🇧🇷 500 visualizações brasileiras - R$1.00' },
            { value: '1000 visualizações brasileiras - R$2.00', text: '🇧🇷 1000 visualizações brasileiras - R$2.00' },
            { value: '1500 visualizações brasileiras - R$3.00', text: '🇧🇷 1500 visualizações brasileiras - R$3.00' },
            { value: '2000 visualizações brasileiras - R$4.00', text: '🇧🇷 2000 visualizações brasileiras - R$4.00' },
            { value: '500 curtidas brasileiras - R$3.50', text: '🇧🇷 500 curtidas brasileiras - R$3.50' },
            { value: '1000 curtidas brasileiras - R$7.00', text: '🇧🇷 1000 curtidas brasileiras - R$7.00' },
            { value: '1500 curtidas brasileiras - R$10.50', text: '🇧🇷 1500 curtidas brasileiras - R$10.50' },
            { value: '2000 curtidas brasileiras - R$14.00', text: '🇧🇷 2000 curtidas brasileiras - R$14.00' }
        ];
    }

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        detailsSelect.appendChild(opt);
    });
}

function toggleCategory(categoryId) {
    const categoryElement = document.getElementById(categoryId);
    categoryElement.classList.toggle('hidden');
}
