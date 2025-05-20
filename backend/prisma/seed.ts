import { PrismaClient } from '@prisma/client';
import { data } from '../src/common/initialData';

const prisma = new PrismaClient();
async function main() {

    for (const film of data.films) {
        await prisma.film.upsert({
            where: {
                id: film.id,
            },
            create: film,
            update: film,
        });
    }

    for (const cat of data.categories) {
        const catData = {
            id: cat.id,
            name: cat.name,
        }
        await prisma.category.upsert({
            where: {
                id: cat.id,
            },
            create: catData,
            update: catData,
        });

        for (const subcat of cat.subCategories) {
            const subcatData = {
                id: subcat.id,
                name: subcat.name,
                parentId: cat.id,
                films: {
                    connect: subcat.filmIds.map(id => ({ id }))
                }
            }
            await prisma.category.upsert({
                where: {
                    id: subcat.id,
                },
                create: subcatData,
                update: subcatData,
            });
        }
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
