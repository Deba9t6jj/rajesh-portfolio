import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLoading } from "../../context/LoadingProvider";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current || initialized) return;
    setInitialized(true);

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    // Add simple lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Simple placeholder mesh instead of loading complex model
    const geometry = new THREE.BoxGeometry(2, 4, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      metalness: 0.3,
      roughness: 0.7,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const clock = new THREE.Clock();
    let mouse = { x: 0, y: 0 };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.005 + mouse.x * 0.001;
      mesh.rotation.x = mouse.y * 0.1;
      renderer.render(scene, camera);
    };

    animate();
    setLoading(100);

    const handleResize = () => {
      const newRect = canvasDiv.current?.getBoundingClientRect();
      if (newRect) {
        renderer.setSize(newRect.width, newRect.height);
        camera.aspect = newRect.width / newRect.height;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (canvasDiv.current?.contains(renderer.domElement)) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
    };
  }, [initialized, setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv} style={{ width: "100%", height: "100%" }}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
