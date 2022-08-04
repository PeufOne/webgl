export interface IProgramInfo {
  program: WebGLProgram
  attribLocations: {
    vertexPosition: number
    vertexColor: number
  }
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null
    modelViewMatrix: WebGLUniformLocation | null
  }
}

export interface IBuffers {
  color: WebGLBuffer
  square: WebGLBuffer
  cube: WebGLBuffer
  indexs: WebGLBuffer
}
