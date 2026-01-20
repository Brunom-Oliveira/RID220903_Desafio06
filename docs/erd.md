# Mermaid ERD

```mermaid
erDiagram
  PRODUTO {
    string nome
    string descricao
    number preco
    string categoria
    string sku
    boolean ativo
  }

  CLIENTE {
    string nome
    string email
    string telefone
    string rua
    string numero
    string cidade
    string estado
    string cep
  }

  ESTOQUE {
    number quantidade
    string localizacao
  }

  PEDIDO {
    string status
    number total
  }

  VENDA {
    number total
    string forma_pagamento
    date data_venda
  }

  PRODUTO ||--o{ ESTOQUE : possui
  CLIENTE ||--o{ PEDIDO : realiza
  CLIENTE ||--o{ VENDA : compra
  PEDIDO ||--o{ VENDA : gera
  PRODUTO ||--o{ PEDIDO : compoe
  PRODUTO ||--o{ VENDA : compoe
```
