import type { IProgramInfo } from '../types'
import vsSource from '../shader/vertex.glsl?raw'
import fsSource from '../shader/fragment.glsl?raw'

export function initShaderProgram(
  gl: WebGLRenderingContext
): IProgramInfo | undefined {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
  const shaderProgram = gl.createProgram()
  if (!vertexShader || !fragmentShader || !shaderProgram) return

  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  const success = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)
  if (!success) {
    console.log(gl.getProgramInfoLog(shaderProgram))
    return
  }

  const programInfo: IProgramInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        'uProjectionMatrix'
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  }

  return programInfo
}

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!success) {
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return
  }
  return shader
}
