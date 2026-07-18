import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';

const ARTICLES = [
  { 
    id: 1, 
    title: "The Meaning of 24k Pure Gold", 
    date: "Oct 12", 
    category: "Craftsmanship",
    excerpt: "Why the purest form of gold is the only medium worthy of true heirlooms.",
    img: "/images/journal_artisan_1784294328273.jpg",
    featured: true
  },
  { 
    id: 2, 
    title: "Sourcing Ethical Diamonds", 
    date: "Sep 28", 
    category: "Ethics",
    excerpt: "Our journey to ensure every stone meets the highest standards of integrity.",
    img: "/images/journal_diamonds_1784294340032.jpg",
    featured: false
  },
  { 
    id: 3, 
    title: "The Architectural Influence", 
    date: "Aug 15", 
    category: "Inspiration",
    excerpt: "How the temples of Patan inspire the structural integrity of our rings.",
    img: "/images/journal_architecture_1784294357588.jpg",
    featured: false
  },
  { 
    id: 4, 
    title: "The Lost Art of Granulation", 
    date: "Jul 02", 
    category: "History",
    excerpt: "Reviving an ancient technique that fuses gold without solder.",
    img: "/images/craft_molten_gold_1784294378044.jpg",
    featured: false
  }
];

export default function JournalPage() {
  const featuredArticle = ARTICLES.find(a => a.featured);
  const regularArticles = ARTICLES.filter(a => !a.featured);

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen">
      <Navigation />
      
      {/* Featured Article Hero */}
      {featuredArticle && (
        <section className="pt-[90px] relative w-full h-[85vh] group overflow-hidden cursor-none">
          <Link href={`#`} className="block w-full h-full relative" data-cursor="read">
            <div className="absolute inset-0 bg-luxury-dark/30 z-10 transition-opacity duration-700 group-hover:bg-luxury-dark/40"></div>
            <img 
              src={featuredArticle.img} 
              alt={featuredArticle.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105 z-0"
            />
            
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-32 max-w-[1800px] mx-auto w-full">
              <span className="tracking-nav text-luxury-gold mb-6 block text-[11px] uppercase">
                {featuredArticle.category} — {featuredArticle.date}
              </span>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-[100px] text-[#FFFFFF] leading-[0.9] max-w-5xl mb-8">
                {featuredArticle.title}
              </h1>
              <p className="text-xl font-light text-[#FFFFFF]/80 max-w-2xl">
                {featuredArticle.excerpt}
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-luxury-7 px-8 max-w-[1800px] mx-auto">
        <div className="flex justify-between items-end mb-24 border-b hairline-border-b pb-8">
          <h2 className="text-section-title font-serif">Latest Publications</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {regularArticles.map((article) => (
            <Link href={`#`} key={article.id} className="group block cursor-none">
              <div className="aspect-[4/5] overflow-hidden mb-8" data-cursor="read">
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover grayscale opacity-90 transition-all duration-[1400ms] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" 
                />
              </div>
              
              <div className="flex flex-col">
                <span className="tracking-nav text-luxury-text-secondary text-[10px] uppercase mb-4">
                  {article.category} — {article.date}
                </span>
                <h3 className="font-serif text-4xl mb-4 group-hover:text-luxury-gold transition-colors duration-luxury-base leading-[1.1]">
                  {article.title}
                </h3>
                <p className="text-luxury-text-secondary font-light">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
