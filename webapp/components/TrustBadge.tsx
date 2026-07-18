export default function TrustBadge() {
  return (
    <div style={styles.badge}>
      <div className="container" style={styles.container}>
        <div style={styles.item}>
          <span style={styles.icon}>✧</span>
          <span>100% Cadmium-Free</span>
        </div>
        <div style={styles.item}>
          <span style={styles.icon}>⟡</span>
          <span>Karigar Crafted in Nepal</span>
        </div>
        <div style={styles.item}>
          <span style={styles.icon}>✦</span>
          <span>Verified Hallmark</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  badge: {
    backgroundColor: 'var(--color-neutral)',
    borderTop: '1px solid rgba(27, 42, 58, 0.1)',
    borderBottom: '1px solid rgba(27, 42, 58, 0.1)',
    padding: 'var(--space-3) 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 'var(--space-3)',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    fontFamily: 'var(--font-inter)',
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--color-primary)',
  },
  icon: {
    color: 'var(--color-accent)',
    fontSize: '1.2rem',
  }
};
