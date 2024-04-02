import { execSync } from 'node:child_process'

export function setupPrismaTests() {
  // para criar o banco de testes para os testes
  execSync(
    'npx dotenv-cli -e .env.test -- npx prisma migrate deploy --schema ./src/shared/infrastructure/database/prisma/schema.prisma',
  )
}
