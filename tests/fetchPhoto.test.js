let fetchPhoto

beforeAll(async () => {
  ;({ fetchPhoto } = await import('../src/utils/fetchPhoto.js'))
})

describe('fetchPhoto', () => {
  let logSpy
  let errorSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => {
    logSpy.mockRestore()
    errorSpy.mockRestore()
    jest.restoreAllMocks()
    delete global.fetch
  })

  test('returns URLs on success', async () => {
    const data = { small: 'http://img.test/small.jpg', regular: 'http://img.test/reg.jpg' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(data),
    })

    await expect(fetchPhoto('cats')).resolves.toEqual({
      avif: `${data.regular}&fm=avif`,
      webp: `${data.regular}&fm=webp`,
      fallback: data.small,
    })
  })

  test('returns placeholder on 404', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => 'Not found',
    })

    await expect(fetchPhoto('cats')).resolves.toEqual({
      avif: '/images/placeholder.png',
      webp: '/images/placeholder.png',
      fallback: '/images/placeholder.png',
    })
  })

  test('returns placeholder on network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('fail'))

    await expect(fetchPhoto('cats')).resolves.toEqual({
      avif: '/images/placeholder.png',
      webp: '/images/placeholder.png',
      fallback: '/images/placeholder.png',
    })
    expect(errorSpy).toHaveBeenCalledWith('Photo fetch failed', expect.any(Error))
  })
})
