const hearts = [
  { left: '8%', top: '12%', size: '0.95rem', delay: '0s', duration: '15s' },
  { left: '18%', top: '68%', size: '1.2rem', delay: '1.3s', duration: '17s' },
  { left: '78%', top: '16%', size: '0.85rem', delay: '2.2s', duration: '14s' },
  { left: '88%', top: '42%', size: '1.05rem', delay: '3.6s', duration: '19s' },
  { left: '32%', top: '84%', size: '0.8rem', delay: '0.8s', duration: '16s' },
  { left: '62%', top: '72%', size: '1.25rem', delay: '4.4s', duration: '20s' },
  { left: '52%', top: '10%', size: '0.75rem', delay: '2.8s', duration: '13s' },
  { left: '70%', top: '88%', size: '1rem', delay: '5.2s', duration: '18s' },
];

function FloatingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart, index) => (
        <span
          key={`${heart.left}-${heart.top}-${index}`}
          className="heart-particle"
          style={{
            left: heart.left,
            top: heart.top,
            '--heart-size': heart.size,
            '--heart-delay': heart.delay,
            '--heart-duration': heart.duration,
          }}
        />
      ))}
    </div>
  );
}

export default FloatingHearts;
