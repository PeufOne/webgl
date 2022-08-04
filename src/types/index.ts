export interface IProgramInfo {
  program: WebGLProgram
  attribLocations: {
    vertexPosition: number
    textureCoord: number
  }
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null
    modelViewMatrix: WebGLUniformLocation | null
    uSampler: WebGLUniformLocation | null
  }
}

export interface ICube {
  colors: number[]
  nodes: number[]
  index: number[]
  texture: number[]
}

export type IBuffers = {
  [Property in keyof ICube]: WebGLBuffer
}
