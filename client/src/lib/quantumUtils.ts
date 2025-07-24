export const generateQuantumParticle = () => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    hue: Math.random() * 60 + 180, // Cyan to blue range
    life: Math.random() * 300 + 200,
    maxLife: Math.random() * 300 + 200
  };
};

export const generateNeuralConnection = () => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    startX: Math.random() * window.innerWidth,
    startY: Math.random() * window.innerHeight,
    endX: Math.random() * window.innerWidth,
    endY: Math.random() * window.innerHeight,
    opacity: Math.random() * 0.5 + 0.1,
    life: Math.random() * 200 + 100,
    maxLife: Math.random() * 200 + 100
  };
};

export const createGlitchEffect = (text: string, intensity: number = 0.3): string => {
  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
  return text
    .split("")
    .map(char => {
      if (Math.random() < intensity) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    })
    .join("");
};

export const calculateQuantumEntanglement = (x1: number, y1: number, x2: number, y2: number): number => {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return Math.max(0, 1 - distance / 500); // Max entanglement distance of 500px
};

export const generateMatrixCode = (): string => {
  const chars = "01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
  return chars[Math.floor(Math.random() * chars.length)];
};

export const applyQuantumUncertainty = (value: number, uncertainty: number = 0.1): number => {
  const deviation = value * uncertainty * (Math.random() - 0.5) * 2;
  return value + deviation;
};
