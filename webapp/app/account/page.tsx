import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import MagneticButton from '../../components/MagneticButton';

export default function AccountPage() {
  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 mt-24">
        
        <div className="max-w-md w-full">
          <span className="tracking-nav text-luxury-text-secondary text-[11px] mb-12 block uppercase">
            Client Portal
          </span>
          <h1 className="font-serif text-5xl md:text-6xl leading-none mb-8">
            Private Access
          </h1>
          <p className="text-paragraph font-light text-luxury-text-secondary mb-16 leading-relaxed">
            Enter your email address to receive a secure link to your private collection and order history.
          </p>
          
          <form className="flex flex-col gap-8 w-full">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b hairline-border-b py-4 outline-none font-light tracking-wider placeholder-luxury-text-secondary/50 focus:border-luxury-text transition-colors duration-luxury-base"
                required
              />
            </div>
            
            <div className="mt-8">
              <MagneticButton>
                <button type="submit" className="tracking-btn text-[14px] uppercase border border-luxury-text px-12 py-5 w-full hover:bg-luxury-text hover:text-luxury-bg transition-colors duration-[400ms] flex items-center justify-center group">
                  Enter Maison
                  <span className="inline-block transform transition-transform duration-[400ms] group-hover:translate-x-2 ml-4">→</span>
                </button>
              </MagneticButton>
            </div>
          </form>
        </div>

      </div>

      <Footer />
    </main>
  );
}
