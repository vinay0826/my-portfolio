import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

interface Skills3DWheelProps {
  skills: Skill[];
  className?: string;
}

export default function Skills3DWheel({ skills, className = "" }: Skills3DWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const draw = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;

      // Smooth rotation interpolation
      setRotation(prev => ({
        x: prev.x + (targetRotation.x - prev.x) * 0.08,
        y: prev.y + (targetRotation.y - prev.y) * 0.08
      }));

      // Clear canvas with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
      gradient.addColorStop(0, "rgba(0, 20, 40, 0.95)");
      gradient.addColorStop(0.5, "rgba(0, 10, 20, 0.98)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw 3D grid background
      ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      for (let i = -10; i <= 10; i++) {
        const offset = i * 20;
        const x1 = centerX + offset * Math.cos(rotation.y);
        const x2 = centerX + offset * Math.cos(rotation.y + Math.PI);
        const y1 = centerY + offset * Math.sin(rotation.x) * 0.5;
        const y2 = centerY - offset * Math.sin(rotation.x) * 0.5;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Draw skills in 3D wheel formation
      skills.forEach((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const heightOffset = Math.sin(angle * 2) * 30;
        
        // Calculate 3D position
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle) + heightOffset;
        let z = Math.sin(angle + rotation.y) * 50;

        // Apply 3D rotations
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        // Rotate around Y axis
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        
        // Rotate around X axis
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Project to 2D
        const perspective = 400 / (400 + z2);
        const screenX = centerX + x1 * perspective;
        const screenY = centerY + y1 * perspective;

        const isActive = activeSkill === skill.name;
        const nodeSize = (8 + skill.level / 10) * perspective;
        const glowSize = nodeSize * (isActive ? 2.5 : 1.8);

        // Skip if behind camera
        if (z2 < -300) return;

        // Color mapping
        const colors = {
          cyan: { main: '#00ffff', glow: 'rgba(0, 255, 255, 0.6)' },
          pink: { main: '#ff00ff', glow: 'rgba(255, 0, 255, 0.6)' },
          green: { main: '#00ff00', glow: 'rgba(0, 255, 0, 0.6)' },
          amber: { main: '#ffbf00', glow: 'rgba(255, 191, 0, 0.6)' }
        };
        
        const skillColor = colors[skill.color as keyof typeof colors] || colors.cyan;

        // Draw glow effect
        const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowSize);
        glowGradient.addColorStop(0, skillColor.glow);
        glowGradient.addColorStop(0.4, skillColor.glow.replace('0.6', '0.3'));
        glowGradient.addColorStop(1, 'transparent');

        ctx.globalAlpha = isActive ? 0.9 : 0.4;
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw core node
        ctx.globalAlpha = 1;
        ctx.fillStyle = skillColor.main;
        ctx.beginPath();
        ctx.arc(screenX, screenY, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw connection to center
        if (perspective > 0.3) {
          ctx.globalAlpha = 0.2 * perspective;
          ctx.strokeStyle = skillColor.glow;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(screenX, screenY);
          ctx.stroke();
        }

        // Draw skill label
        if (perspective > 0.4) {
          ctx.globalAlpha = perspective;
          ctx.fillStyle = skillColor.main;
          ctx.font = `${Math.max(10, 14 * perspective)}px 'JetBrains Mono'`;
          ctx.textAlign = "center";
          ctx.fillText(skill.name, screenX, screenY - nodeSize - 15);
          
          // Level percentage
          ctx.font = `${Math.max(8, 11 * perspective)}px 'JetBrains Mono'`;
          ctx.fillText(`${skill.level}%`, screenX, screenY + nodeSize + 20);
        }

        // Pulsing ring for active skill
        if (isActive) {
          const ringRadius = nodeSize + Math.sin(time * 0.2) * 8;
          ctx.globalAlpha = 0.8;
          ctx.strokeStyle = skillColor.main;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(screenX, screenY, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Store position for click detection
        (skill as any).screenX = screenX;
        (skill as any).screenY = screenY;
        (skill as any).screenSize = nodeSize;
        (skill as any).depth = z2;
      });

      // Draw center hub
      ctx.globalAlpha = 0.8;
      const hubGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
      hubGradient.addColorStop(0, "rgba(0, 255, 255, 0.8)");
      hubGradient.addColorStop(1, "rgba(0, 255, 255, 0.2)");
      ctx.fillStyle = hubGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.fill();

      // Hub border
      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.stroke();

      time += 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    // Mouse/touch interaction
    let lastMousePos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      setIsDragging(true);
      lastMousePos = { x: clientX, y: clientY };
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      if (isDragging) {
        const deltaX = clientX - lastMousePos.x;
        const deltaY = clientY - lastMousePos.y;
        
        setTargetRotation(prev => ({
          x: prev.x + deltaY * 0.003,
          y: prev.y + deltaX * 0.003
        }));
        
        lastMousePos = { x: clientX, y: clientY };
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleClick = (e: MouseEvent) => {
      if (isDragging) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Find clicked skill
      let clickedSkill = null;
      let minDistance = Infinity;
      
      skills.forEach(skill => {
        const screenX = (skill as any).screenX;
        const screenY = (skill as any).screenY;
        const screenSize = (skill as any).screenSize;
        
        if (screenX && screenY) {
          const distance = Math.sqrt((mouseX - screenX) ** 2 + (mouseY - screenY) ** 2);
          if (distance < screenSize && distance < minDistance) {
            minDistance = distance;
            clickedSkill = skill.name;
          }
        }
      });
      
      setActiveSkill(prev => prev === clickedSkill ? null : clickedSkill);
    };

    // Auto-rotation when not dragging
    const autoRotate = () => {
      if (!isDragging) {
        setTargetRotation(prev => ({
          ...prev,
          y: prev.y + 0.002
        }));
      }
    };

    const autoRotateInterval = setInterval(autoRotate, 16);

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleMouseDown);
    canvas.addEventListener('touchmove', handleMouseMove);
    canvas.addEventListener('touchend', handleMouseUp);

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(autoRotateInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchend', handleMouseUp);
    };
  }, [skills, isDragging, targetRotation, activeSkill]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ minHeight: "600px" }}
      />
      
      {/* Control instructions */}
      <div className="absolute top-4 left-4 text-cyber-cyan text-xs font-mono space-y-1 opacity-70">
        <div>Drag: Rotate 3D wheel</div>
        <div>Click: Select skill node</div>
        <div>Active: {activeSkill || "None"}</div>
      </div>

      {/* Active skill info panel */}
      {activeSkill && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-90 border border-cyber-cyan rounded-lg p-4 min-w-48">
          <div className="text-cyber-cyan text-sm font-mono">
            <div className="text-cyber-pink font-bold mb-2">{activeSkill}</div>
            {(() => {
              const skill = skills.find(s => s.name === activeSkill);
              return skill ? (
                <>
                  <div>Category: {skill.category}</div>
                  <div>Proficiency: {skill.level}%</div>
                  <div>Status: {skill.level >= 90 ? 'EXPERT' : skill.level >= 75 ? 'ADVANCED' : 'PROFICIENT'}</div>
                </>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}