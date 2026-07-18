import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const initialProducts = [
  {
    sku: 'lotus-1',
    name: 'The Signature Lotus',
    price: 150000,
    description: 'A masterpiece of Newari craftsmanship. 24k pure gold hand-beaten into the eternal lotus motif.',
    image: '/images/product_ring_heritage_1784294279552.jpg',
    has360: true,
    category: 'High Jewelry'
  },
  {
    sku: 'diamond-2',
    name: 'Kathmandu Diamond Ring',
    price: 320000,
    description: 'A brilliant cut diamond set in our signature cadmium-free 18k gold band.',
    image: '/images/product_ring_diamond_1784294289832.jpg',
    has360: false,
    category: 'Bridal'
  },
  {
    sku: 'pendant-3',
    name: 'Eternal Lotus Pendant',
    price: 85000,
    description: 'The iconic lotus motif suspended on a delicate 18k gold chain.',
    image: '/images/product_pendant_lotus_1784294299204.jpg',
    has360: false,
    category: 'The Signature Lotus'
  },
  {
    sku: 'bangle-4',
    name: 'Royal Gold Bangle',
    price: 210000,
    description: 'A heavy solid gold bangle featuring intricate handcrafted details from the Patan workshops.',
    image: '/images/product_bangle_gold_1784294317394.jpg',
    has360: false,
    category: 'High Jewelry'
  }
]

async function main() {
  console.log('Start seeding...')
  for (const p of initialProducts) {
    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        name: p.name,
        price: p.price,
        description: p.description,
        image: p.image,
        has360: p.has360,
        category: p.category
      },
      create: p,
    })
    console.log(`Created product with id: ${product.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
