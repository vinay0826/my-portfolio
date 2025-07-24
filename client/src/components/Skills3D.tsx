import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
  x: number;
  y: number;
  z: number;
  velocity: { x: number; y: number; z: number };
  color: string;
}

interface Skills3DProps {
  skills: Array<{ name: string; level: number; category: string; color: string }>;
  className?: string;
}

export default function Skills3D({ skills, className = "" }: Skills3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skills3D = useRef<Skill[]>([]);
  const particles = useRef<Array<{
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    life: number; maxLife: number;
    color: string; size: number;
  }>>([]);

  useEffect(() => {
    // Initialize 3D skills
    skills3D.current = skills.map((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const radius = 150 + (skill.level / 100) * 50;
      const height = (Math.random() - 0.5) * 100;
      
      return {
        ...skill,
        x: Math.cos(angle) * radius,
        y: height,
        z: Math.sin(angle) * radius,
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.3,
          z: (Math.random() - 0.5) * 0.5
        }
      };
    });

    // Initialize particles
    for (let i = 0; i < 200; i++) {
      particles.current.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        z: (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
        color: ['#00ffff', '#ff00ff', '#00ff00', '#ffbf00'][Math.floor(Math.random() * 4)],
        size: 1 + Math.random() * 3
      });
    }
  }, [skills]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let animationId: number;

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Clear with gradient background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvas.width, canvas.height));
      gradient.addColorStop(0, "rgba(10, 0, 20, 0.95)");
      gradient.addColorStop(0.5, "rgba(5, 0, 15, 0.98)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Auto rotation
      const currentRotation = {
        x: time * 0.002,
        y: time * 0.003,
        z: time * 0.001
      };

      // Update and draw particles
      particles.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        particle.life += 1;

        if (particle.life > particle.maxLife) {
          particle.x = (Math.random() - 0.5) * 800;
          particle.y = (Math.random() - 0.5) * 600;
          particle.z = (Math.random() - 0.5) * 400;
          particle.life = 0;
        }

        // 3D to 2D projection
        const cos = Math.cos(currentRotation.y);
        const sin = Math.sin(currentRotation.y);
        const x3d = particle.x * cos - particle.z * sin;
        const z3d = particle.x * sin + particle.z * cos;
        
        if (z3d > -200) {
          const scale = 300 / (300 + z3d);
          const x2d = centerX + x3d * scale;
          const y2d = centerY + particle.y * scale;
          const alpha = (1 - particle.life / particle.maxLife) * 0.6;

          ctx.globalAlpha = alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(x2d, y2d, particle.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw connection lines between skills
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 1;
      
      for (let i = 0; i < skills3D.current.length; i++) {
        for (let j = i + 1; j < skills3D.current.length; j++) {
          const skill1 = skills3D.current[i];
          const skill2 = skills3D.current[j];
          
          // Apply 3D rotation
          const cos = Math.cos(currentRotation.y);
          const sin = Math.sin(currentRotation.y);
          
          const x1_3d = skill1.x * cos - skill1.z * sin;
          const z1_3d = skill1.x * sin + skill1.z * cos;
          const x2_3d = skill2.x * cos - skill2.z * sin;
          const z2_3d = skill2.x * sin + skill2.z * cos;
          
          if (z1_3d > -200 && z2_3d > -200) {
            const scale1 = 300 / (300 + z1_3d);
            const scale2 = 300 / (300 + z2_3d);
            
            const x1_2d = centerX + x1_3d * scale1;
            const y1_2d = centerY + skill1.y * scale1;
            const x2_2d = centerX + x2_3d * scale2;
            const y2_2d = centerY + skill2.y * scale2;
            
            const distance = Math.sqrt(Math.pow(x2_2d - x1_2d, 2) + Math.pow(y2_2d - y1_2d, 2));
            if (distance < 150) {
              ctx.globalAlpha = (150 - distance) / 150 * 0.2;
              ctx.beginPath();
              ctx.moveTo(x1_2d, y1_2d);
              ctx.lineTo(x2_2d, y2_2d);
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw skills
      skills3D.current.forEach((skill, index) => {
        // Floating animation
        skill.x += skill.velocity.x;
        skill.y += skill.velocity.y;
        skill.z += skill.velocity.z;

        // Boundary bounce
        if (Math.abs(skill.x) > 300) skill.velocity.x *= -0.8;
        if (Math.abs(skill.y) > 200) skill.velocity.y *= -0.8;
        if (Math.abs(skill.z) > 300) skill.velocity.z *= -0.8;

        // Apply damping
        skill.velocity.x *= 0.995;
        skill.velocity.y *= 0.995;
        skill.velocity.z *= 0.995;

        // 3D rotation
        const cos = Math.cos(currentRotation.y);
        const sin = Math.sin(currentRotation.y);
        const x3d = skill.x * cos - skill.z * sin;
        const z3d = skill.x * sin + skill.z * cos;

        if (z3d > -200) {
          const scale = 300 / (300 + z3d);
          const x2d = centerX + x3d * scale;
          const y2d = centerY + skill.y * scale;
          const isActive = activeSkill === skill.name;

          // Skill node
          const nodeSize = (8 + skill.level / 10) * scale;
          const glowSize = nodeSize * (isActive ? 3 : 1.5);

          // Glow effect
          const glowGradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, glowSize);
          const colors = {
            cyan: 'rgba(0, 255, 255, 0.8)',
            pink: 'rgba(255, 0, 255, 0.8)',
            green: 'rgba(0, 255, 0, 0.8)',
            amber: 'rgba(255, 191, 0, 0.8)'
          };
          
          glowGradient.addColorStop(0, colors[skill.color as keyof typeof colors] || colors.cyan);
          glowGradient.addColorStop(0.4, colors[skill.color as keyof typeof colors]?.replace('0.8', '0.4') || colors.cyan.replace('0.8', '0.4'));
          glowGradient.addColorStop(1, 'transparent');

          ctx.globalAlpha = isActive ? 0.9 : 0.6;
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(x2d, y2d, glowSize, 0, Math.PI * 2);
          ctx.fill();

          // Core node
          ctx.globalAlpha = 1;
          ctx.fillStyle = colors[skill.color as keyof typeof colors] || colors.cyan;
          ctx.beginPath();
          ctx.arc(x2d, y2d, nodeSize, 0, Math.PI * 2);
          ctx.fill();

          // Pulsing ring
          if (isActive) {
            const ringRadius = nodeSize + Math.sin(time * 0.1) * 5;
            ctx.globalAlpha = 0.8;
            ctx.strokeStyle = colors[skill.color as keyof typeof colors] || colors.cyan;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x2d, y2d, ringRadius, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Skill label
          if (scale > 0.5) {
            ctx.globalAlpha = Math.min(scale * 2, 1);
            ctx.fillStyle = colors[skill.color as keyof typeof colors] || colors.cyan;
            ctx.font = `${Math.max(10, 12 * scale)}px 'JetBrains Mono'`;
            ctx.textAlign = "center";
            ctx.fillText(skill.name, x2d, y2d - nodeSize - 10);
            
            // Level indicator
            ctx.font = `${Math.max(8, 10 * scale)}px 'JetBrains Mono'`;
            ctx.fillText(`${skill.level}%`, x2d, y2d + nodeSize + 15);
          }
        }
      });

      time += 1;
      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Check if clicked on a skill
      let clickedSkill = null;
      skills3D.current.forEach(skill => {
        const cos = Math.cos(time * 0.003);
        const sin = Math.sin(time * 0.003);
        const x3d = skill.x * cos - skill.z * sin;
        const z3d = skill.x * sin + skill.z * cos;
        
        if (z3d > -200) {
          const scale = 300 / (300 + z3d);
          const x2d = canvas.width / 2 + x3d * scale;
          const y2d = canvas.height / 2 + skill.y * scale;
          const distance = Math.sqrt((mouseX - x2d) ** 2 + (mouseY - y2d) ** 2);
          
          if (distance < (8 + skill.level / 10) * scale) {
            clickedSkill = skill.name;
          }
        }
      });
      
      setActiveSkill(prev => prev === clickedSkill ? null : clickedSkill);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    draw();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Separate effect for active skill updates
  useEffect(() => {
    // Just for active skill visual updates
  }, [activeSkill]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ minHeight: "500px" }}
      />
      
      {/* Controls overlay */}
      <div className="absolute top-4 left-4 text-cyber-cyan text-xs font-mono space-y-1 opacity-60">
        <div>Mouse: Rotate view</div>
        <div>Click: Select skill</div>
        <div>Active: {activeSkill || "None"}</div>
      </div>
    </div>
  );
}