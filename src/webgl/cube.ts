import { IBuffers, ICube } from '../types'

export function initBuffers(gl: WebGLRenderingContext): IBuffers {
  const cube = getCube()

  return {
    colors: addArrayBuffer(gl, cube.colors),
    nodes: addArrayBuffer(gl, cube.nodes),
    index: addElementsArrayBuffer(gl, cube.index),
    texture: addArrayBuffer(gl, cube.texture),
  }
}

function addArrayBuffer(gl: WebGLRenderingContext, arr: number[]): WebGLBuffer {
  const buffer = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW)
  return buffer
}

function addElementsArrayBuffer(
  gl: WebGLRenderingContext,
  arr: number[]
): WebGLBuffer {
  const buffer = gl.createBuffer()!
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(arr), gl.STATIC_DRAW)
  return buffer
}

function getCube(): ICube {
  const nodes2D = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]
  const faceFront = nodes2D.map((p) => [...p, 1])
  const faceBack = nodes2D.map((p) => [...p, -1])
  const getFaceLateral = (a: number, b: number) => [
    faceFront[a],
    faceFront[b],
    faceBack[b],
    faceBack[a],
  ]
  const nodes = [
    // Face avant
    faceFront,
    // Face arrière
    faceBack,
    // Face supérieur
    getFaceLateral(2, 3),
    // Face inférieur
    getFaceLateral(0, 1),
    // Face droite
    getFaceLateral(1, 2),
    // Face gauche
    getFaceLateral(0, 3),
  ]

  const colors = [
    [1, 1, 1, 1], // Face avant : blanc
    [1, 0, 0, 1], // Face arrière : rouge
    [0, 1, 0, 1], // Face supérieure : vert
    [0, 0, 1, 1], // Face inférieure : bleu
    [1, 1, 0, 1], // Face droite : jaune
    [1, 0, 1, 1], // Face gauche : violet
  ]

  const getTriangles = (i: number) => [i, i + 1, i + 2, i, i + 2, i + 3]
  const index = [...Array(6)].map((_, i) => getTriangles(i * 4)).flat()

  const textureFace = [0, 0, 1, 0, 1, 1, 0, 1]
  const texture = [...Array(6)].map(() => textureFace).flat()

  return {
    nodes: nodes.flat(2),
    colors: colors.map((c) => [c, c, c, c]).flat(2),
    index,
    texture,
  }
}
