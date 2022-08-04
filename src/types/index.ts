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

export interface ICube {
  colors: number[]
  nodes: number[]
  index: number[]
}

export interface IBuffers {
  colors: WebGLBuffer
  nodes: WebGLBuffer
  index: WebGLBuffer
}
