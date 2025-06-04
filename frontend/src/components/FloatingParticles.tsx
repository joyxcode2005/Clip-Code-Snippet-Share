

const FloatingParticles = () => {
  return (
    <>
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background:
              i % 4 === 0
                ? "#3b82f6"
                : i % 4 === 1
                ? "#1e40af"
                : i % 4 === 2
                ? "#0ea5e9"
                : "#6366f1",
            animation: `floatAdvanced ${
              4 + Math.random() * 3
            }s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        ></div>
      ))}
    </>
  );
};

export default FloatingParticles;
