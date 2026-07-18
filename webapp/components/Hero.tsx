export default function Hero() {
  return (
    <section className="full-bleed" style={styles.hero}>
      {/* Cinemagraph Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={styles.videoBg}
      >
        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
      </video>

      {/* Overlay to ensure text readability */}
      <div style={styles.overlay}></div>

      <div className="container luxury-fade-in" style={styles.container}>
        <h1 style={styles.title}>The Signature Collection</h1>
        <p style={styles.subtitle} className="luxury-label">Karigar-crafted in Kathmandu. 100% Cadmium-Free.</p>
        <button style={styles.button} className="luxury-label">Explore the Collection</button>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    height: '100vh', /* Full viewport height for editorial impact */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
    overflow: 'hidden',
  },
  videoBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(27, 42, 58, 0.4)', /* Navy tint for contrast */
    zIndex: -1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-5)', /* Massive breathing room */
    zIndex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: '6rem', /* Dramatic scale contrast */
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    marginBottom: '0',
    maxWidth: '800px',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
  },
  button: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    padding: 'var(--space-3) var(--space-6)',
    cursor: 'pointer',
    transition: 'all var(--duration-slow) var(--ease-premium)',
  }
};
