import Navigation from "../../components/Navigation";
import TrustBadge from "../../components/TrustBadge";

export default function PurityPage() {
  return (
    <>
      <Navigation />
      
      <main className="container" style={{ padding: 'var(--space-7) var(--space-4)', minHeight: '70vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-5)', fontSize: '3rem' }}>
          Our Purity Guarantee
        </h1>
        
        <div style={styles.contentBox}>
          <h2 style={styles.sectionHeading}>The Cadmium-Free Commitment</h2>
          <p style={styles.text}>
            Purity fraud is a documented issue in the regional jewelry market, with cadmium often mixed into silver and gold alloys to cut costs. Cadmium is highly toxic and compromises the structural integrity of fine jewelry over time.
          </p>
          <p style={styles.text}>
            At NepJewls, we guarantee that every piece we cast is <strong>100% cadmium-free</strong>. We source our raw materials rigorously and partner only with master karigars in the Kathmandu Valley who share our commitment to ethical, clean metallurgy.
          </p>
          
          <div style={styles.divider}></div>
          
          <h2 style={styles.sectionHeading}>Verifying Your Certificate</h2>
          <p style={styles.text}>
            Every order shipped from our atelier includes a physical Purity Certificate card. This card contains:
          </p>
          <ul style={styles.list}>
            <li>The exact alloy composition (e.g., 925 Sterling Silver, 18k Gold Vermeil)</li>
            <li>The name of the karigar who cast the piece</li>
            <li>A unique lab-test batch reference number</li>
          </ul>
          <p style={styles.text}>
            To verify a specific piece's certificate number or request a copy of the lab testing batch report, please contact our support team via WhatsApp with your Certificate ID.
          </p>
          
          <div style={styles.actionContainer}>
            <a 
              href="https://wa.me/9779800000000?text=I'd%20like%20to%20verify%20my%20certificate%20number"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.verifyBtn}
            >
              Verify Certificate on WhatsApp
            </a>
          </div>
        </div>
      </main>

      <TrustBadge />
    </>
  );
}

const styles = {
  contentBox: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#FAFAFA',
    padding: 'var(--space-6)',
    borderRadius: '8px',
    border: '1px solid rgba(27, 42, 58, 0.1)',
  },
  sectionHeading: {
    fontSize: '2rem',
    marginBottom: 'var(--space-3)',
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: 'var(--space-4)',
    color: 'var(--color-support)',
  },
  list: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: 'var(--space-5)',
    color: 'var(--color-support)',
    paddingLeft: 'var(--space-5)',
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(27, 42, 58, 0.1)',
    margin: 'var(--space-5) 0',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 'var(--space-4)',
  },
  verifyBtn: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-neutral)',
    textDecoration: 'none',
    padding: 'var(--space-3) var(--space-5)',
    fontSize: '1.2rem',
    fontWeight: 600,
    borderRadius: '4px',
    transition: 'opacity var(--duration-fast)',
  }
};
