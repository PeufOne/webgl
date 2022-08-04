import { IBuffers } from '../types'

export function initBuffers(gl: WebGLRenderingContext): IBuffers {
  return {
    square: getSquareBuffer(gl),
    color: getColorBuffer(gl),
    cube: getCubeBuffer(gl),
    indexs: getCubeIndexs(gl),
  }
}

function getSquareBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  const square = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ].flat()
  const buffer = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(square), gl.STATIC_DRAW)
  return buffer
}

function getColorBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  const faceColors = [
    [1.0, 1.0, 1.0, 1.0], // Face avant : blanc
    [1.0, 0.0, 0.0, 1.0], // Face arrière : rouge
    [0.0, 1.0, 0.0, 1.0], // Face supérieure : vert
    [0.0, 0.0, 1.0, 1.0], // Face infiérieure : bleu
    [1.0, 1.0, 0.0, 1.0], // Face droite : jaune
    [1.0, 0.0, 1.0, 1.0], // Face gauche : violet
  ]
  const colors = faceColors.map((c) => [c, c, c, c]).flat(2)

  const buffer = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
  return buffer
}

function getCubeBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  const p2D = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]
  const p3D = [p2D.map((p) => [...p, 1]), p2D.map((p) => [...p, -1])]
  const getLateral = (a: number, b: number) => [
    p3D[0][a],
    p3D[1][a],
    p3D[1][b],
    p3D[0][b],
  ]
  const cube = [
    // Face avant
    p3D[0],
    // Face arrière
    p3D[1],
    // Face supérieur
    getLateral(2, 3),
    // Face inférieur
    getLateral(0, 1),
    // Face droite
    getLateral(1, 3),
    // Face gauche
    getLateral(0, 2),
  ].flat(2)

  const buffer = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube), gl.STATIC_DRAW)
  return buffer
}

function getCubeIndexs(gl: WebGLRenderingContext): WebGLBuffer {
  const indexs = [
    [0, 1, 2],
    [0, 2, 3], // avant
    [4, 5, 6],
    [4, 6, 7], // arrière
    [8, 9, 10],
    [8, 10, 11], // haut
    [12, 13, 14],
    [12, 14, 15], // bas
    [16, 17, 18],
    [16, 18, 19], // droite
    [20, 21, 22],
    [20, 22, 23], // gauche
  ].flat()
  const buffer = gl.createBuffer()!
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indexs),
    gl.STATIC_DRAW
  )
  return buffer
}
