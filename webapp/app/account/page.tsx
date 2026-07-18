import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function AccountPage() {
  // Mock data for the Private Client Portal
  const mockClient = {
    name: 'A.D.',
    memberSince: '2023',
    advisor: 'Elena V.'
  };

  const mockAcquisitions = [
    {
      id: 'nep-982-14',
      date: 'Dec 12, 2025',
      piece: 'The Kathmandu Signet',
      status: 'Secured in Vault',
      price: 'Rs. 850,000'
    },
    {
      id: 'nep-341-89',
      date: 'Aug 04, 2024',
      piece: 'The Shadow Lotus Pendant',
      status: 'Delivered',
      price: 'Rs. 620,000'
    }
  ];

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen">
      <Navigation />
      
      <div className="max-w-[1200px] mx-auto px-8 pt-40 pb-32 min-h-screen">
        
        {/* Header */}
        <div className="mb-24 border-b border-white/10 pb-12">
          <span className="tracking-[0.4em] text-[#8C857B] text-[10px] mb-6 block uppercase font-light">
            The Inner Circle
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#E5E0D8]">
            Welcome back, {mockClient.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column: Acquisitions */}
          <div className="lg:col-span-2 space-y-12">
            <h2 className="font-serif text-3xl text-[#E5E0D8]">Your Acquisitions</h2>
            
            <div className="border border-white/10 bg-[#1A1614] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-[#8C857B]">
                    <th className="p-6 font-normal">Date</th>
                    <th className="p-6 font-normal">Piece</th>
                    <th className="p-6 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light">
                  {mockAcquisitions.map((item, index) => (
                    <tr key={index} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="p-6 text-[#8C857B]">{item.date}</td>
                      <td className="p-6 text-[#E5E0D8]">{item.piece}</td>
                      <td className="p-6">
                        <span className="px-3 py-1 text-[9px] uppercase tracking-widest border border-white/10 text-[#8C857B]">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="pt-8">
              <Link href="/collections" className="text-[10px] uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37]/30 hover:border-white pb-1">
                Acquire New Pieces &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Private Advisory */}
          <div className="space-y-12">
            <h2 className="font-serif text-3xl text-[#E5E0D8]">Private Advisory</h2>
            
            <div className="bg-[#1A1614] border border-white/10 p-8 space-y-8">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-[#8C857B] mb-2">Dedicated Advisor</span>
                <span className="text-lg text-[#E5E0D8] font-serif">{mockClient.advisor}</span>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <span className="block text-[10px] uppercase tracking-widest text-[#8C857B] mb-4">Concierge Services</span>
                <ul className="space-y-4 text-sm font-light text-[#8C857B]">
                  <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                    <span className="text-[#D4AF37]">+</span> Request Legacy Maintenance
                  </li>
                  <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                    <span className="text-[#D4AF37]">+</span> Curate a Gift
                  </li>
                  <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                    <span className="text-[#D4AF37]">+</span> Book a Private Viewing
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button className="w-full tracking-[0.2em] text-[10px] uppercase bg-white/5 text-[#E5E0D8] border border-white/10 py-4 hover:bg-white hover:text-black transition-colors duration-500">
                  Message Advisor
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
