import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const initialProducts = [
  {
    sku: 'nep-signet-01',
    name: 'The Kathmandu Signet',
    price: 850000,
    description: 'A masterclass in restraint. This piece balances the raw, grounding power of Himalayan gold with the exactitude of modern geometry. Forged over 140 hours in our Patan atelier.',
    image: '/images/product_signet_ring_1784343759398.jpg',
    has360: true,
    category: 'The Architectural Collection'
  },
  {
    sku: 'nep-bridal-01',
    name: 'The Solitaire Diamond',
    price: 2100000,
    description: 'An uncompromising brilliant-cut diamond, suspended in pure darkness. The setting is minimal to the point of invisibility, allowing the stone to hold the light with absolute authority.',
    image: '/images/product_solitaire_diamond_1784343770631.jpg',
    has360: false,
    category: 'Bridal'
  },
  {
    sku: 'nep-bangle-01',
    name: 'The Raw Sapphire Bangle',
    price: 1450000,
    description: 'Forged in the shadows of the Himalayas. Solid 24k gold, brutally hammered and stacked with uncut sapphires. A piece of wearable armor that commands attention without raising its voice.',
    image: '/images/product_hammered_bangle_1784343780875.jpg',
    has360: false,
    category: 'High Jewelry'
  },
  {
    sku: 'nep-pendant-01',
    name: 'The Shadow Lotus Pendant',
    price: 620000,
    description: 'The ancient Newari lotus motif reimagined through a lens of brutalist restraint. Cast in shadow, catching a single sliver of light to reveal its mathematical perfection.',
    image: '/images/product_lotus_pendant_1784343791427.jpg',
    has360: false,
    category: 'The Signature Lotus'
  }
]

async function main() {
  console.log('Clearing old inventory...')
  // Clean up order items that might reference old products
  await prisma.orderItem.deleteMany()
  // Clean up old products
  await prisma.product.deleteMany()

  console.log('Seeding The Inaugural Collection...')
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
    console.log(`Secured masterpiece in vault: ${product.name}`)
  }
  console.log('Vault sealed.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
