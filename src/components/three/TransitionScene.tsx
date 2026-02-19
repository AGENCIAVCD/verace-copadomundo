import { Canvas, useFrame } from '@react-three/fiber';
import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const Particles = ({ pulse }: { pulse: MutableRefObject<number> }) => {
    const points = useRef<THREE.Points>(null);
    const material = useRef<THREE.PointsMaterial>(null);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const count = 900;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i += 1) {
            const radius = 12 * Math.random();
            const angle = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 6;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    const pulseRef = useRef(0);

    useFrame((_, delta) => {
        if (points.current) {
            points.current.rotation.y += delta * 0.06;
        }

        const target = pulse.current;
        pulseRef.current += (target - pulseRef.current) * 0.08;

        if (material.current) {
            material.current.opacity = 0.08 + pulseRef.current * 0.25;
        }
    });

    return (
        <points ref={points} geometry={geometry}>
            <pointsMaterial
                ref={material}
                size={0.08}
                color="#FFB500"
                transparent
                opacity={0.12}
            />
        </points>
    );
};

const GlowPlane = ({ pulse }: { pulse: MutableRefObject<number> }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const material = useRef<THREE.MeshBasicMaterial>(null);
    const pulseRef = useRef(0);

    useFrame(() => {
        pulseRef.current += (pulse.current - pulseRef.current) * 0.08;
        if (material.current) {
            material.current.opacity = 0.08 + pulseRef.current * 0.35;
        }
        if (mesh.current) {
            mesh.current.scale.setScalar(1 + pulseRef.current * 0.05);
        }
    });

    return (
        <mesh ref={mesh} position={[0, 0, -2]}>
            <planeGeometry args={[18, 18]} />
            <meshBasicMaterial
                ref={material}
                color="#FFB500"
                transparent
                opacity={0.12}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

export function TransitionScene({ trigger }: { trigger: number }) {
    const pulseRef = useRef(0);
    const targetRef = useRef(0);

    useEffect(() => {
        targetRef.current = 1;
    }, [trigger]);

    const PulseAnimator = () => {
        useFrame(() => {
            targetRef.current = Math.max(0, targetRef.current - 0.02);
            pulseRef.current += (targetRef.current - pulseRef.current) * 0.1;
        });
        return null;
    };

    return (
        <div className="pointer-events-none fixed inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 14], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true }}
            >
                <ambientLight intensity={0.4} />
                <PulseAnimator />
                <Particles pulse={pulseRef} />
                <GlowPlane pulse={pulseRef} />
            </Canvas>
        </div>
    );
}
