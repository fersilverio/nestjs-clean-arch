import {
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleDestroy() {
    await this.$disconnect()
  }

  async onModuleInit() {
    await this.$connect()
  }
}
