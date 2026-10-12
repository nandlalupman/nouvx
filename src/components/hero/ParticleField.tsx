"use client";

import * as React from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  color?: string;
  size?: number;
  speed?: number;
  interactive?: boolean;
}

export function ParticleField({
  className,
  particleCount = 2000,
  color = "#d4a373",
  size = 1.5,
  speed = 0.1,
  interactive = true,
}: ParticleFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const sceneRef = React.useRef<THREE.Scene | null>(null);
  const cameraRef = React.useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = React.useRef<THREE.Points | null>(null);
  const animationIdRef = React.useRef<number | undefined>(undefined);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const timeRef = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.z = 10;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 0.5 + Math.random() * 0.5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      basePositions[i * 3] = positions[i * 3];
      basePositions[i * 3 + 1] = positions[i * 3 + 1];
      basePositions[i * 3 + 2] = positions[i * 3 + 2];

      sizes[i] = size * (0.5 + Math.random() * 1.5);
      alphas[i] = 0.3 + Math.random() * 0.7;

      velocities[i * 3] = (Math.random() - 0.5) * 0.0005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0005;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute("basePosition", new THREE.BufferAttribute(basePositions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 1,
      transparent: true,
      opacity: 1,
      vertexColors: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    particlesRef.current = points;
    scene.add(points);

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      camera.left = -rect.width / 200;
      camera.right = rect.width / 200;
      camera.top = rect.height / 200;
      camera.bottom = -rect.height / 200;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.001 * speed * 100;

      if (!particlesRef.current || !rendererRef.current || !cameraRef.current) return;

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;
      const basePositions = particlesRef.current.geometry.attributes.basePosition.array as Float32Array;
      const alphas = particlesRef.current.geometry.attributes.alpha.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        const dx = positions[i3] - mouseRef.current.x * 0.5;
        const dy = positions[i3 + 1] - mouseRef.current.y * 0.5;
        const dz = positions[i3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 0.3 && interactive) {
          const force = (0.3 - dist) * 0.01;
          positions[i3] += dx * force;
          positions[i3 + 1] += dy * force;
          positions[i3 + 2] += dz * force;
        }

        const baseDist = Math.sqrt(
          Math.pow(positions[i3] - basePositions[i3], 2) +
          Math.pow(positions[i3 + 1] - basePositions[i3 + 1], 2) +
          Math.pow(positions[i3 + 2] - basePositions[i3 + 2], 2)
        );

        if (baseDist > 0.5) {
          positions[i3] += (basePositions[i3] - positions[i3]) * 0.01;
          positions[i3 + 1] += (basePositions[i3 + 1] - positions[i3 + 1]) * 0.01;
          positions[i3 + 2] += (basePositions[i3 + 2] - positions[i3 + 2]) * 0.01;
        }

        alphas[i] = 0.2 + 0.5 * Math.sin(timeRef.current * 2 + i * 0.1) + 
                    0.3 * Math.sin(timeRef.current + i * 0.05);
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.alpha.needsUpdate = true;

      particlesRef.current.rotation.y += 0.0001 * speed;
      particlesRef.current.rotation.x += 0.00005 * speed;

      rendererRef.current.render(scene, cameraRef.current);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [particleCount, color, size, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      aria-hidden="true"
    />
  );
}

interface NodeData {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  metric: string;
  status: "nominal" | "warning" | "critical";
  connections: string[];
}

interface SystemMapProps {
  className?: string;
  nodes?: NodeData[];
  showConnections?: boolean;
  interactive?: boolean;
}

export function SystemMap({
  className,
  nodes = DEFAULT_NODES,
  showConnections = true,
  interactive = true,
}: SystemMapProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const sceneRef = React.useRef<THREE.Scene | null>(null);
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const nodeMeshesRef = React.useRef<Map<string, THREE.Mesh>>(new Map());
  const connectionLinesRef = React.useRef<THREE.LineSegments | null>(null);
  const glowMeshesRef = React.useRef<Map<string, THREE.Mesh>>(new Map());
  const animationIdRef = React.useRef<number | undefined>(undefined);
  const hoveredNodeRef = React.useRef<string | null>(null);
  const timeRef = React.useRef(0);

  const defaultNodes: NodeData[] = [
    { id: "inference", label: "INFERENCE", position: [0, 0.8, 0], color: "#d4a373", metric: "12ms", status: "nominal", connections: ["vision", "robotics", "infrastructure"] },
    { id: "vision", label: "VISION", position: [-0.8, 0, 0.5], color: "#10b981", metric: "41 FPS", status: "nominal", connections: ["inference", "infrastructure"] },
    { id: "robotics", label: "ROBOTICS", position: [0.8, 0, -0.5], color: "#c68642", metric: "76 FLEET", status: "nominal", connections: ["inference", "infrastructure"] },
    { id: "infrastructure", label: "INFRASTRUCTURE", position: [0, -0.8, 0], color: "#b87333", metric: "99.98%", status: "nominal", connections: ["inference", "vision", "robotics", "security"] },
    { id: "security", label: "SECURITY", position: [0, 0, 0.9], color: "#e5a950", metric: "ACTIVE", status: "nominal", connections: ["infrastructure"] },
  ];

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 3);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    nodes.forEach((node) => {
      const geometry = new THREE.IcosahedronGeometry(0.08, 2);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: 1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...node.position);
      mesh.userData = { nodeId: node.id };
      nodeGroup.add(mesh);
      nodeMeshesRef.current.set(node.id, mesh);

      const glowGeometry = new THREE.IcosahedronGeometry(0.12, 1);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: 0,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      glowMesh.position.set(...node.position);
      nodeGroup.add(glowMesh);
      glowMeshesRef.current.set(node.id, glowMesh);

      const labelDiv = document.createElement("div");
      labelDiv.className = "absolute pointer-events-none text-xs font-mono text-text-secondary transform -translate-x-1/2 -translate-y-full transition-all duration-200";
      labelDiv.style.cssText = "opacity: 0; white-space: nowrap;";
      labelDiv.textContent = `${node.label} • ${node.metric}`;
      canvas.parentElement?.appendChild(labelDiv);
      (mesh as any).labelElement = labelDiv;
    });

    if (showConnections) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions: number[] = [];
      const lineColors: number[] = [];

      nodes.forEach((node) => {
        node.connections.forEach((connId) => {
          const targetNode = nodes.find((n) => n.id === connId);
          if (targetNode) {
            linePositions.push(node.position[0], node.position[1], node.position[2]);
            linePositions.push(targetNode.position[0], targetNode.position[1], targetNode.position[2]);
            const color = new THREE.Color(node.color);
            lineColors.push(color.r, color.g, color.b);
            lineColors.push(color.r, color.g, color.b);
          }
        });
      });

      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      connectionLinesRef.current = lines;
      scene.add(lines);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00e5ff, 1, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      updateLabelPositions();
    };

    const updateLabelPositions = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      nodeMeshesRef.current.forEach((mesh, nodeId) => {
        const labelEl = (mesh as any).labelElement;
        if (!labelEl) return;
        
        const vector = new THREE.Vector3();
        vector.setFromMatrixPosition(mesh.matrixWorld);
        if (cameraRef.current) vector.project(cameraRef.current);
        
        const rect = canvas.getBoundingClientRect();
        const x = (vector.x * 0.5 + 0.5) * rect.width;
        const y = (-vector.y * 0.5 + 0.5) * rect.height;
        
        labelEl.style.left = `${x}px`;
        labelEl.style.top = `${y}px`;
        
        if (cameraRef.current) {
          const dist = cameraRef.current.position.distanceTo(mesh.position);
          labelEl.style.opacity = dist < 4 ? "1" : "0";
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !cameraRef.current || !rendererRef.current) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);
      
      const meshes = Array.from(nodeMeshesRef.current.values());
      const intersects = raycaster.intersectObjects(meshes);
      
      if (intersects.length > 0) {
        const nodeId = intersects[0].object.userData.nodeId;
        if (hoveredNodeRef.current !== nodeId) {
          hoveredNodeRef.current = nodeId;
          const glowMesh = glowMeshesRef.current.get(nodeId);
          if (glowMesh) {
            (glowMesh.material as THREE.MeshBasicMaterial).opacity = 0.6;
          }
          const mesh = nodeMeshesRef.current.get(nodeId);
          if (mesh) {
            (mesh.material as THREE.MeshBasicMaterial).opacity = 1;
          }
        }
      } else if (hoveredNodeRef.current) {
        const prevGlow = glowMeshesRef.current.get(hoveredNodeRef.current);
        if (prevGlow) {
          (prevGlow.material as THREE.MeshBasicMaterial).opacity = 0;
        }
        hoveredNodeRef.current = null;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.01;

      nodeMeshesRef.current.forEach((mesh, nodeId) => {
        const node = nodes.find((n) => n.id === nodeId);
        if (!node) return;
        
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.003;
        mesh.position.y = node.position[1] + Math.sin(timeRef.current + nodeId.length) * 0.02;
        
        const glowMesh = glowMeshesRef.current.get(nodeId);
        if (glowMesh && hoveredNodeRef.current !== nodeId) {
          glowMesh.position.copy(mesh.position);
          glowMesh.rotation.copy(mesh.rotation);
          glowMesh.scale.setScalar(1 + Math.sin(timeRef.current * 2 + nodeId.length) * 0.1);
        }
      });

      if (connectionLinesRef.current) {
        (connectionLinesRef.current.material as THREE.LineBasicMaterial).opacity = 
          0.2 + 0.2 * Math.sin(timeRef.current * 2);
      }

      updateLabelPositions();
      if (cameraRef.current) {
        rendererRef.current?.render(scene, cameraRef.current);
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (interactive) window.removeEventListener("mousemove", handleMouseMove);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      
      nodeMeshesRef.current.forEach((mesh) => {
        const labelEl = (mesh as any).labelElement;
        labelEl?.remove();
        mesh.geometry.dispose();
        const material = mesh.material as THREE.Material | THREE.Material[];
        if (Array.isArray(material)) {
          material.forEach(m => m.dispose());
        } else {
          material.dispose();
        }
      });
      
      glowMeshesRef.current.forEach((mesh) => {
        mesh.geometry.dispose();
        const material = mesh.material as THREE.Material | THREE.Material[];
        if (Array.isArray(material)) {
          material.forEach(m => m.dispose());
        } else {
          material.dispose();
        }
      });
      
      connectionLinesRef.current?.geometry.dispose();
      const connMaterial = connectionLinesRef.current?.material;
      if (Array.isArray(connMaterial)) {
        connMaterial.forEach(m => m.dispose());
      } else if (connMaterial) {
        connMaterial.dispose();
      }
      renderer.dispose();
    };
  }, [nodes, showConnections, interactive]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
}

const DEFAULT_NODES: NodeData[] = [
  { id: "inference", label: "INFERENCE", position: [0, 0.8, 0], color: "#d4a373", metric: "12ms P99", status: "nominal", connections: ["vision", "robotics", "infrastructure"] },
  { id: "vision", label: "VISION", position: [-0.8, 0, 0.5], color: "#10b981", metric: "41 FPS", status: "nominal", connections: ["inference", "infrastructure"] },
  { id: "robotics", label: "ROBOTICS", position: [0.8, 0, -0.5], color: "#c68642", metric: "76 FLEET", status: "nominal", connections: ["inference", "infrastructure"] },
  { id: "infrastructure", label: "INFRASTRUCTURE", position: [0, -0.8, 0], color: "#b87333", metric: "99.98%", status: "nominal", connections: ["inference", "vision", "robotics", "security"] },
  { id: "security", label: "SECURITY", position: [0, 0, 0.9], color: "#e5a950", metric: "ACTIVE", status: "nominal", connections: ["infrastructure"] },
];

export function VariableFontDisplay({
  children,
  className,
  weight = 400,
  weightRange = [300, 700],
  speed = 1,
  axis = "wght",
}: {
  children: React.ReactNode;
  className?: string;
  weight?: number;
  weightRange?: [number, number];
  speed?: number;
  axis?: string;
}) {
  const [currentWeight, setCurrentWeight] = React.useState(weight);
  const timeRef = React.useRef(0);

  React.useEffect(() => {
    let animationId: number;
    const animate = () => {
      timeRef.current += 0.01 * speed;
      const [min, max] = weightRange;
      const newWeight = min + (max - min) * 0.5 * (1 + Math.sin(timeRef.current));
      setCurrentWeight(newWeight);
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [weightRange, speed]);

  return (
    <span
      className={cn("font-display transition-all duration-300", className)}
      style={{
        fontVariationSettings: `"${axis}" ${currentWeight}`,
        fontWeight: currentWeight,
      } as React.CSSProperties}
    >
      {children}
    </span>
  );
}

export function GlitchText({
  children,
  className,
  intensity = 0.1,
  speed = 1,
}: {
  children: string;
  className?: string;
  intensity?: number;
  speed?: number;
}) {
  const [glitch, setGlitch] = React.useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 50);
    }, 3000 / speed);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      {glitch && (
        <>
          <span className="absolute inset-0 text-accent clip-path-[polygon(0_0,100%_0,100%_50%,0_50%)]" style={{ transform: `translate(${intensity * 2}px, ${-intensity}px)` }}>{children}</span>
          <span className="absolute inset-0 text-infrastructure clip-path-[polygon(0_50%,100%_50%,100%_100%,0_100%)]" style={{ transform: `translate(${-intensity}px, ${intensity * 1.5}px)` }}>{children}</span>
        </>
      )}
    </span>
  );
}

export function MetricCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  delay = 0,
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  decimals?: number;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(value * eased);
        if (progress < 1) requestAnimationFrame(animate);
        else setDisplayValue(value);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, duration, delay]);

  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {displayValue.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}