export const products = [
  {
    id: "signature-lotus-ring",
    name: "Signature Lotus Ring",
    price: 15000,
    description: "The flagship piece of the NepJewls collection. Forged from 100% cadmium-free silver with a heavy 24k gold vermeil. Features our signature spinning motif.",
    image: "/images/ring.jpg",
    hoverImage: null,
    has360: true
  },
  {
    id: "lotus-pendant",
    name: "Lotus Pendant",
    price: 12500,
    description: "A delicate interpretation of the signature motif, suspended on an 18-inch cable chain.",
    image: "/images/pendant.jpg",
    hoverImage: null,
    has360: false
  },
  {
    id: "lotus-earrings",
    name: "Lotus Earrings",
    price: 18000,
    description: "Symmetrical drops that catch the light from every angle. Karigar crafted.",
    image: "/images/earrings.jpg",
    hoverImage: null,
    has360: false
  }
];

export function getProductById(id) {
  return products.find(p => p.id === id);
}
