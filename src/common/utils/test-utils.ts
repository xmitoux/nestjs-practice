import { PrismaClient, Prisma } from '@prisma/client';

export const resetTable = async (modelNames: Prisma.ModelName[]): Promise<void> => {
    const prisma = new PrismaClient();

    const tablenames = modelNames.map((modelName) => ({ tablename: modelName }));

    for (const { tablename } of tablenames) {
        try {
            await prisma.$executeRawUnsafe(
                `TRUNCATE TABLE "public"."${convertModelNameToTableName(tablename)}" RESTART IDENTITY CASCADE;`,
            );
        } catch (error) {
            console.log({ error });
        }
    }
};

const convertModelNameToTableName = (modelName: Prisma.ModelName): string => {
    const snakeCase = modelName
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '');

    return `${snakeCase}s`;
};
