export default function Hero() {
  return (
    <section style={styles.hero}>
      <div className="container" style={styles.container}>
        <h1 style={styles.title}>The Signature Collection</h1>
        <p style={styles.subtitle}>Karigar-crafted in Kathmandu. 100% Cadmium-Free.</p>
        <button style={styles.button}>Explore the Collection</button>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-neutral)',
    padding: 'var(--space-7) 0',
    textAlign: 'center',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-4)',
  },
  title: {
    color: 'var(--color-accent)',
    fontSize: '4rem',
    marginBottom: '0',
  },
  subtitle: {
    fontSize: '1.4rem',
    opacity: 0.9,
    marginBottom: 'var(--space-4)',
  },
  button: {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-primary)',
    border: 'none',
    padding: 'var(--space-3) var(--space-5)',
    fontSize: '1.2rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '50px',
    transition: 'transform var(--duration-base) var(--ease-premium)',
  }
};
