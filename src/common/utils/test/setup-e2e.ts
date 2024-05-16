import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const generateUniqueDatabaseURL = (schemaId: string): string => {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provider a DATABASE_URL environment variable.');
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schemaId);

    return url.toString();
};

export const randomSchemaId = randomUUID();

beforeAll(async () => {
    const databaseURL = generateUniqueDatabaseURL(randomSchemaId);

    process.env.DATABASE_URL = databaseURL;

    execSync('npx prisma migrate dev');
});

afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${randomSchemaId}" CASCADE`);
    await prisma.$disconnect();
});
