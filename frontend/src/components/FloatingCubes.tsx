const FloatingCubes = () => {
  return (
    <div>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="floating-cube absolute hidden md:block"
          style={{
            left: `${10 + ((i * 8) % 80)}%`,
            top: `${10 + ((i * 13) % 80)}%`,
            animationDelay: `${i * 0.8}s`,
            transform: `rotateX(${i * 30}deg) rotateY(${i * 45}deg)`,
          }}
        >
          <div className="cube-3d">
            <div className="cube-face cube-front"></div>
            <div className="cube-face cube-back"></div>
            <div className="cube-face cube-right"></div>
            <div className="cube-face cube-left"></div>
            <div className="cube-face cube-top"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingCubes;
