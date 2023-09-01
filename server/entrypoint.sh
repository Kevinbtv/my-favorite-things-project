#!/bin/bash
set -e

# Função para verificar se o banco de dados está pronto para conexões
function wait_for_db() {
    until nc -zv db 5432; do
        echo "Aguardando o banco de dados..."
        sleep 2
    done
}

wait_for_db

# Executar as migrações e a aplicação
npx prisma migrate deploy --preview-feature
npm run dev