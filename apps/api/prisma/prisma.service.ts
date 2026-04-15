// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';


@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {

   // ← composition instead of inheritance (extends PrismaClient)
  // private readonly prisma: PrismaClient;

  // constructor() {
  //   this.prisma = new PrismaClient();
  // }


  private readonly prisma: PrismaClient;

  constructor() {
    // 1. Create a PostgreSQL connection pool
    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL 
    });

    // 2. Initialize the adapter
    const adapter = new PrismaPg(pool);

    // 3. Pass the adapter to the client instance
    this.prisma = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    // Connect to DB when NestJS module initializes
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    // Gracefully disconnect when app shuts down
    await this.prisma.$disconnect();
  }

  get client(): PrismaClient {
    return this.prisma;
  }
}