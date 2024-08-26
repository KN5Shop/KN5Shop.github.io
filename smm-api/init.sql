-- Inicializar tabelas e dados de exemplo
INSERT INTO users (name, email, status) VALUES ('João', 'joao@example.com', 'Ativo');
INSERT INTO users (name, email, status) VALUES ('Maria', 'maria@example.com', 'Inativo');

INSERT INTO services (name, description, price) VALUES ('500 seguidores mundiais', 'Aumente sua presença global', 'R$5.00');
INSERT INTO services (name, description, price) VALUES ('1000 seguidores mundiais', 'Aumente ainda mais sua presença', 'R$10.00');

INSERT INTO orders (date, name, service, status) VALUES ('2024-08-20', 'João', '500 seguidores mundiais', 'Completo');
INSERT INTO orders (date, name, service, status) VALUES ('2024-08-21', 'Maria', '1000 seguidores mundiais', 'Pendente');

INSERT INTO notifications (message) VALUES ('Novo pedido recebido.');
INSERT INTO notifications (message) VALUES ('Atualização no status do pedido.');
