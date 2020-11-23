# TPC 6 de Processamento e Representação de Informação (PRI)

Este trabalho de casa consiste num servidor desenvolvido em **Node.js** capaz de responder a pedidos de GET e POST na porta 7777 com uma **API REST** configurada através do 
**JSON-Server**.  

Para tal foi construida uma **Single Page Application** capaz de inserir tarefas com uma descrição, responsável, uma data limite e o seu estado. Essas tarefas também são 
apresentadas numa tabela ordenadas por data limite de forma ascendente e pelo responsável. Nesta tabela também é possível indicar cada tarefa como resolvida ou cancelada 
através de um botão.

Finalmente, os dados são armazenados num ficheiro **JSON**.
