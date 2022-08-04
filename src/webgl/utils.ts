export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180
}

interface AttribPointerOptions {
  index: number
  numComponents: number
  type?: number
  normalize?: boolean
  stride?: number
  offset?: number
}

export function bindBuffer(
  gl: WebGLRenderingContext,
  buffer: WebGLBuffer,
  options: AttribPointerOptions
) {
  const defaultOptions: Required<
    Omit<AttribPointerOptions, 'numComponents' | 'index'>
  > = {
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offset: 0,
  }
  const opts = { ...defaultOptions, ...options }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.vertexAttribPointer(
    opts.index,
    opts.numComponents,
    opts.type,
    opts.normalize,
    opts.stride,
    opts.offset
  )
  gl.enableVertexAttribArray(opts.index)
}
