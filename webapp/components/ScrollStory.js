'use client';

import { useEffect, useRef } from 'react';

export default function ScrollStory() {
  const containerRef = useRef(null);
  
  // Mutable state for the animation loop
  const state = useRef({
    trackHeight: 0,
    windowHeight: 0,
    ticking: false,
    observer: null
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    state.current.trackHeight = container.getBoundingClientRect().height;
    state.current.windowHeight = window.innerHeight;

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const scrolledPast = -rect.top;
      const scrollableDistance = state.current.trackHeight - state.current.windowHeight;
      
      let progress = scrolledPast / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      container.style.setProperty('--scroll-progress', progress.toFixed(4));
      state.current.ticking = false;
    };

    const onScroll = () => {
      if (!state.current.ticking) {
        window.requestAnimationFrame(tick);
        state.current.ticking = true;
      }
    };

    state.current.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        // Trigger initial tick
        tick();
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    });

    state.current.observer.observe(container);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (state.current.observer) {
        state.current.observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={styles.scrollStory}>
      <div style={styles.sticky}>
        
        {/* Realistic Image Parallax */}
        <div className="motif-parallax" style={styles.motifPlaceholder}>
          <img src="/images/ring.jpg" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} alt="Signature Motif" />
        </div>

        {/* Text Blocks */}
        <div style={styles.textContainer}>
          <div className="story-block story-block-1" style={styles.block}>
            <h2 style={styles.heading}>The Signature Motif</h2>
            <p style={styles.text}>Inspired by Newari lattice work, it represents connection.</p>
          </div>
          
          <div className="story-block story-block-2" style={styles.block}>
            <h2 style={styles.heading}>Karigar Crafted</h2>
            <p style={styles.text}>Every angle forged by hand in Kathmandu.</p>
          </div>
          
          <div className="story-block story-block-3" style={styles.block}>
            <h2 style={styles.heading}>100% Cadmium-Free</h2>
            <p style={styles.text}>Purity you can verify. Art you can wear.</p>
          </div>
        </div>

      </div>

      {/* We inject the pure CSS calculations for the animation here */}
      <style dangerouslySetInnerHTML={{__html: `
        .motif-parallax {
          transform: scale(calc(1 - (var(--scroll-progress) * 0.4))) rotate(calc(var(--scroll-progress) * 45deg));
        }
        .motif-parallax > div:last-child {
          opacity: calc(0.2 + (var(--scroll-progress) * 0.8));
        }
        
        .story-block-1 {
          opacity: calc(1 - ((var(--scroll-progress) - 0.2) * 10));
          transform: translate(-50%, calc(-50% - (var(--scroll-progress) * 50px)));
        }

        .story-block-2 {
          opacity: calc(min(((var(--scroll-progress) - 0.3) * 10), (1 - ((var(--scroll-progress) - 0.5) * 10))));
          transform: translate(-50%, calc(-50% + 50px - (var(--scroll-progress) - 0.3) * 100px));
        }

        .story-block-3 {
          opacity: calc((var(--scroll-progress) - 0.6) * 10);
          transform: translate(-50%, calc(-50% + 50px - (var(--scroll-progress) - 0.6) * 100px));
        }
      `}} />
    </div>
  );
}

const styles = {
  scrollStory: {
    height: '400vh',
    position: 'relative',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-neutral)',
    '--scroll-progress': 0,
  },
  sticky: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  motifPlaceholder: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    transition: 'transform 0.1s linear',
    zIndex: 1,
  },
  motifDiamond: {
    position: 'absolute',
    inset: 0,
    border: '4px solid var(--color-accent)',
    transform: 'rotate(45deg)',
    opacity: 0.8,
  },
  motifCenter: {
    position: 'absolute',
    inset: '20%',
    backgroundColor: 'var(--color-accent)',
    borderRadius: '50%',
  },
  textContainer: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px',
    padding: 'var(--space-4)',
  },
  block: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    opacity: 0,
    transition: 'opacity 0.1s linear, transform 0.1s linear',
  },
  heading: {
    color: 'var(--color-accent)',
    fontSize: '3.2rem',
    marginBottom: 'var(--space-3)',
  },
  text: {
    fontSize: '1.5rem',
    margin: 0,
  }
};
