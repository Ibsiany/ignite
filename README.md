
# Cadastro de carro
**Requisito funcionais**
- Deve ser possível cadastrar um novo carro.

**Regra de negócio**
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado, por padrão com disponibilidade.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros
**Requisito funcionais**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regra de negócio**
- O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro
**Requisito funcionais**
- Deve ser possível cadastrar uma especificação para um carro.

**Regra de negócio**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma mesma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro
**Requisito funcionais**
- Deve ser possível cadastrar a imagem do carro.

**Requisito não funcional**
- Utilizar o multer para upload dos arquivos.

**Regra de negócio**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro
**Requisito funcionais**
- Deve ser possível cadastrar um aluguel.

**Regra de negócio**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.