Documentação do Banco de Dados — Marketplace
1. Visão geral

O banco de dados foi desenvolvido utilizando PostgreSQL + Prisma ORM.

A aplicação possui quatro entidades principais:

User: usuários da plataforma, compradores, vendedores e administradores.
Product: produtos cadastrados pelos vendedores.
Order: pedidos realizados pelos compradores.
OrderItem: produtos que compõem cada pedido.
Regras gerais
Um usuário pode realizar vários pedidos.
Um usuário pode cadastrar vários produtos, caso tenha o papel de vendedor.
Cada produto pertence a um único vendedor.
Cada pedido pertence a um comprador.
Cada pedido pertence a um vendedor.
Um pedido pode possuir vários itens.
Um produto pode estar presente em vários pedidos.
O preço do produto é registrado no momento da compra, evitando alterações nos pedidos antigos.
2. Enums
Role

Define o papel do usuário na aplicação.

Valor	Descrição
customer	Usuário que realiza compras.
seller	Usuário que cadastra e vende produtos.
admin	Administrador da plataforma.

Regra: o papel padrão de um novo usuário é customer.

OrderStatus

Define o estado atual de um pedido.

Status	Descrição
pending	Pedido criado, aguardando pagamento.
paid	Pagamento confirmado.
processing	Pedido em preparação.
shipped	Pedido enviado.
delivered	Pedido entregue.
cancelled	Pedido cancelado.

Importante: as mudanças de status devem seguir regras de negócio. Não permita que qualquer usuário altere livremente o status de um pedido.

3. Entidades
User

Representa todos os usuários da aplicação.

Campos:

Campo	Tipo	Descrição
id	String	Identificador UUID.
name	String	Nome do usuário.
email	String	E-mail único.
password	String	Senha armazenada com hash.
role	Role	Papel do usuário.
createdAt	DateTime	Data de criação.
updatedAt	DateTime?	Data da última atualização.

Relacionamentos:

Um usuário pode possuir vários produtos.
Um usuário pode realizar vários pedidos.

Operações esperadas nos controllers:

Criar usuário.
Buscar usuário por ID.
Listar usuários (admin).
Atualizar dados do usuário.
Atualizar senha.
Excluir ou desativar usuário.

Cuidados:

Nunca retornar o campo password nas respostas da API.
O e-mail deve ser único.
Não permitir que um usuário comum altere seu próprio role.
Senhas devem ser armazenadas utilizando hash seguro.
Product

Representa os produtos cadastrados pelos vendedores.

Campos:

Campo	Tipo	Descrição
id	String	Identificador UUID.
name	String	Nome do produto.
description	String?	Descrição opcional.
price	Int	Preço em centavos.
stock	Int	Quantidade disponível.
sellerId	String	ID do vendedor proprietário.
createdAt	DateTime	Data de criação.
updatedAt	DateTime?	Data da última atualização.

Relacionamentos:

Cada produto pertence a um usuário vendedor.
Um produto pode aparecer em vários OrderItem.

Operações esperadas nos controllers:

Criar produto.
Listar produtos.
Buscar produto por ID.
Atualizar produto.
Excluir produto.
Listar produtos de um vendedor.

Regras de negócio:

Somente usuários com role = seller podem cadastrar produtos.
O vendedor só pode atualizar ou excluir seus próprios produtos.
O preço deve ser maior que zero.
O estoque não pode ser negativo.
O sellerId deve ser obtido do usuário autenticado, não confiado diretamente ao body da requisição.

Exemplo de preço:

R$ 49,90 deve ser armazenado como 4990.

Isso evita problemas de precisão em operações monetárias.

Order

Representa uma compra realizada por um usuário.

Campos:

Campo	Tipo	Descrição
id	String	Identificador UUID.
userId	String	ID do comprador.
sellerId	String	ID do vendedor responsável.
status	OrderStatus	Estado do pedido.
total	Int	Valor total em centavos.
createdAt	DateTime	Data de criação.
updatedAt	DateTime	Data da última atualização.

Relacionamentos:

Cada pedido pertence a um comprador.
Cada pedido possui vários itens.
Cada pedido está associado a um vendedor.

Operações esperadas nos controllers:

Criar pedido.
Buscar pedido por ID.
Listar pedidos do comprador.
Listar pedidos recebidos pelo vendedor.
Atualizar status do pedido.
Cancelar pedido.

Regras de negócio:

O comprador só pode visualizar seus próprios pedidos.
O vendedor só pode visualizar pedidos associados a ele.
O total deve ser calculado no backend.
O status inicial deve ser pending.
Não confiar no valor total enviado pelo frontend.
O cancelamento deve respeitar as regras de negócio e de pagamento.
OrderItem

Representa cada produto dentro de um pedido.

Essa entidade é responsável pelo relacionamento N:N entre Order e Product.

Campos:

Campo	Tipo	Descrição
id	String	Identificador UUID.
orderId	String	ID do pedido.
productId	String	ID do produto.
quantity	Int	Quantidade comprada.
unitPrice	Int	Preço unitário no momento da compra.

Exemplo:

Um comprador realiza um pedido contendo:

Produto	Quantidade	Preço unitário
Camiseta	2	R$ 50,00
Calça	1	R$ 120,00
Boné	3	R$ 30,00

O pedido terá três registros em OrderItem.

Por que armazenar unitPrice?

O preço de um produto pode mudar depois da compra.

O unitPrice preserva o preço original, garantindo que o histórico do pedido continue correto.

Regras de negócio:

A quantidade deve ser maior que zero.
O preço unitário deve ser obtido do banco de dados no momento da compra.
O comprador não deve informar livremente o preço dos itens.
A quantidade deve respeitar o estoque disponível.
4. Relacionamentos do banco
Origem	Destino	Relação
User	Product	1:N
User	Order	1:N
Product	OrderItem	1:N
Order	OrderItem	1:N
Representação simplificada
text
USER
 ├── PRODUCTS
 │     └── ORDER_ITEMS
 │
 └── ORDERS
       └── ORDER_ITEMS
             └── PRODUCT


O vendedor e o comprador são representados pela entidade User, diferenciados pelo campo role.

5. Índices

Os índices foram adicionados pensando nas consultas mais frequentes da aplicação.

Entidade	Índice	Objetivo
Product	sellerId	Buscar produtos de um vendedor.
Order	userId	Buscar pedidos de um comprador.
Order	sellerId	Buscar pedidos de um vendedor.
Por que utilizar índices?

Índices ajudam o PostgreSQL a localizar registros com mais eficiência.

Entretanto, possuem custos:

Ocupam espaço adicional.
Aumentam o trabalho durante INSERT.
Aumentam o trabalho durante UPDATE e DELETE.

Portanto, devem ser adicionados conforme os padrões reais de consulta da aplicação.

6. Consultas Prisma para os controllers
Buscar produtos de um vendedor
typescript
const products = await prisma.product.findMany({
  where: {
    sellerId: userId,
  },
});

Buscar pedidos de um comprador
typescript
const orders = await prisma.order.findMany({
  where: {
    userId,
  },
  include: {
    items: {
      include: {
        product: true,
      },
    },
  },
});

Buscar pedidos de um vendedor
typescript
const orders = await prisma.order.findMany({
  where: {
    sellerId: userId,
  },
  include: {
    items: {
      include: {
        product: true,
      },
    },
  },
});

Buscar um pedido completo
typescript
const order = await prisma.order.findUnique({
  where: {
    id: orderId,
  },
  include: {
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
    items: {
      include: {
        product: true,
      },
    },
  },
});

Criar um produto
typescript
const product = await prisma.product.create({
  data: {
    name,
    description,
    price,
    stock,
    sellerId: authenticatedUser.id,
  },
});

7. Fluxo de criação de pedidos

A criação de pedidos merece atenção especial.

O fluxo recomendado é:

O comprador envia os produtos e suas quantidades.
O backend verifica se todos os produtos existem.
O backend verifica se os produtos pertencem ao mesmo vendedor.
O backend verifica o estoque disponível.
O backend consulta os preços atuais no banco.
O backend calcula o total.
O backend cria o pedido.
O backend cria os OrderItem.
O backend atualiza o estoque.
A operação é concluída em uma transação.

Importante: utilize prisma.$transaction para garantir que o pedido, os itens e a atualização do estoque sejam consistentes.

Nunca confie nos preços enviados pelo frontend.

8. Decisões arquiteturais atuais
Um usuário pode ser comprador ou vendedor, identificado por Role.
Um vendedor pode cadastrar vários produtos.
Um pedido pertence a um comprador e a um vendedor.
Cada pedido possui vários itens.
Cada item guarda o preço praticado no momento da compra.
Os valores monetários são armazenados em centavos.
Os identificadores utilizam UUID.
Os relacionamentos são definidos por Foreign Keys.
Os índices são utilizados para otimizar consultas frequentes.
Limitação atual do modelo

Atualmente, cada pedido pertence a apenas um vendedor.

Se futuramente um comprador puder comprar produtos de vários vendedores em um único checkout, será necessário evoluir a arquitetura para separar o pedido principal dos pedidos individuais de cada vendedor.

9. Checklist antes de implementar os controllers
Implementar autenticação e autorização por Role.
Garantir que usuários não acessem pedidos de terceiros.
Garantir que vendedores só gerenciem seus próprios produtos.
Validar preço, quantidade e estoque.
Calcular valores sempre no backend.
Utilizar transações na criação de pedidos.
Não retornar senhas nas respostas.
Implementar paginação nas listagens.
Definir regras de cancelamento e atualização de status.
Tratar erros de registros inexistentes e violações de unicidade.

Objetivo desta documentação: servir como referência para implementar os controllers, services e regras de negócio mantendo a consistência com o modelo de dados do Prisma.