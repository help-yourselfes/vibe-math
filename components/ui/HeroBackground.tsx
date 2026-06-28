"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

const GRID_SIZE = 8
const SPREAD = 1200

export function HeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = window.innerWidth
    const h = window.innerHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x050508, 500, 1400)

    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000)
    camera.position.set(0, 300, 600)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    mount.appendChild(renderer.domElement)

    // ── Ground Grid ──
    const half = SPREAD / 2
    const step = SPREAD / GRID_SIZE
    const gridPositions: number[] = []
    for (let i = 0; i <= GRID_SIZE; i++) {
      const pos = -half + i * step
      gridPositions.push(-half, 0, pos, half, 0, pos)
      gridPositions.push(pos, 0, -half, pos, 0, half)
    }

    const gridGeo = new THREE.BufferGeometry()
    gridGeo.setAttribute("position", new THREE.Float32BufferAttribute(gridPositions, 3))
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    })
    const gridLines = new THREE.LineSegments(gridGeo, gridMat)
    scene.add(gridLines)

    // ── Floating bubbles at each grid intersection ──
    const pointCount = (GRID_SIZE + 1) * (GRID_SIZE + 1)
    const positions = new Float32Array(pointCount * 3)
    const sizes = new Float32Array(pointCount)
    const colors = new Float32Array(pointCount * 3)
    const floatPhase = new Float32Array(pointCount)
    const floatSpeed = new Float32Array(pointCount)
    const floatAmp = new Float32Array(pointCount)
    const sizePhase = new Float32Array(pointCount)

    let idx = 0
    for (let ix = 0; ix <= GRID_SIZE; ix++) {
      for (let iz = 0; iz <= GRID_SIZE; iz++) {
        const i3 = idx * 3
        const x = -half + ix * step
        const z = -half + iz * step
        positions[i3] = x
        positions[i3 + 1] = 0
        positions[i3 + 2] = z
        sizes[idx] = 2 + Math.random() * 6
        const b = 0.4 + Math.random() * 0.6
        colors[i3] = 0.31 * b
        colors[i3 + 1] = 0.16 * b
        colors[i3 + 2] = 0.56 * b
        floatPhase[idx] = Math.random() * Math.PI * 2
        floatSpeed[idx] = 0.3 + Math.random() * 0.5
        floatAmp[idx] = 8 + Math.random() * 25
        sizePhase[idx] = Math.random() * Math.PI * 2
        idx++
      }
    }

    const pointGeo = new THREE.BufferGeometry()
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    pointGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    pointGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const pointMat = new THREE.PointsMaterial({
      size: 6,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(pointGeo, pointMat)
    scene.add(points)

    // ── Animation ──
    const mouse = { x: 0.5, y: 0.5 }
    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth
      mouse.y = e.clientY / window.innerHeight
    }
    window.addEventListener("mousemove", handleMouse)

    const timer = new THREE.Timer()

    const animate = () => {
      timer.update()
      const t = timer.getElapsed()

      const autoRotY = Math.sin(t * 0.08) * 0.2
      const autoRotX = Math.sin(t * 0.06 + 1) * 0.04
      const rotY = autoRotY + (mouse.x - 0.5) * 0.3
      const rotX = autoRotX + (mouse.y - 0.5) * 0.1 + 0.35
      const dist = 600
      camera.position.x = Math.sin(rotY) * Math.cos(rotX) * dist
      camera.position.y = Math.sin(rotX) * dist * 0.45
      camera.position.z = Math.cos(rotY) * Math.cos(rotX) * dist
      camera.lookAt(0, 0, 0)

      const pos = pointGeo.attributes.position.array as Float32Array
      const sz = pointGeo.attributes.size.array as Float32Array
      for (let i = 0; i < pointCount; i++) {
        const i3 = i * 3
        pos[i3 + 1] = Math.sin(t * floatSpeed[i] + floatPhase[i]) * floatAmp[i] + floatAmp[i]
        const base = sizes[i]
        const pulse = 1 + 0.5 * Math.sin(t * (0.6 + sizePhase[i] * 0.2) + sizePhase[i])
        sz[i] = base * pulse
      }
      pointGeo.attributes.position.needsUpdate = true
      pointGeo.attributes.size.needsUpdate = true

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    let frameId = requestAnimationFrame(animate)

    const handleResize = () => {
      const ww = window.innerWidth
      const wh = window.innerHeight
      camera.aspect = ww / wh
      camera.updateProjectionMatrix()
      renderer.setSize(ww, wh)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(frameId)
      pointGeo.dispose()
      pointMat.dispose()
      gridGeo.dispose()
      gridMat.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <>
      <div ref={mountRef} className="absolute inset-0 pointer-events-none select-none" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none select-none" aria-hidden="true" style={{ background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)' }} />
    </>
  )
}
