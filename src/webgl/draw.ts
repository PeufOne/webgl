import { mat4 } from 'gl-matrix'

import { IBuffers, IProgramInfo } from '../types'
import { degToRad, addVertexAttribPointer } from './utils'

let cubeRotation = 0

export function drawScene(
  gl: WebGLRenderingContext,
  programInfo: IProgramInfo,
  buffers: IBuffers,
  deltaTime: number
) {
  cubeRotation += deltaTime

  gl.clearColor(0, 0, 0, 1)
  gl.clearDepth(1)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const fieldOfView = degToRad(45) // en radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
  const zNear = 0.1
  const zFar = 100.0
  const projectionMatrix = mat4.create()
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

  const modelViewMatrix = mat4.create()
  mat4.translate(modelViewMatrix, modelViewMatrix, [-0, 0, -6])
  mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation, [0, 0, 1])
  mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * 1, [1, 1, 0])

  addVertexAttribPointer(gl, buffers.nodes, {
    index: programInfo.attribLocations.vertexPosition,
    numComponents: 3,
  })
  addVertexAttribPointer(gl, buffers.colors, {
    index: programInfo.attribLocations.vertexColor,
    numComponents: 4,
  })

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index)

  gl.useProgram(programInfo.program)

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  )
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  )

  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
}
