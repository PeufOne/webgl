import './style.css'
import { initShaderProgram } from './webgl/program'
import { initBuffers } from './webgl/cube'
import { drawScene } from './webgl/draw'
import { loadTexture } from './webgl/texture'
import logoUrl from '../public/JavaScript-logo.png'

const container = document.querySelector<HTMLDivElement>('#app')!
setup(container)

export function setup(container: HTMLDivElement) {
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 480
  container.appendChild(canvas)
  const gl = canvas.getContext('webgl')
  if (!gl) return

  const render = createRender(gl)
  requestAnimationFrame(render)
}

function createRender(gl: WebGLRenderingContext) {
  const programInfo = initShaderProgram(gl)!
  const buffers = initBuffers(gl)
  const texture = loadTexture(gl, logoUrl)
  let then = 0
  function render(now: number) {
    now *= 0.001
    const deltaTime = now - then
    then = now
    drawScene(gl, programInfo, buffers, texture, deltaTime)
    requestAnimationFrame(render)
  }
  return render
}
