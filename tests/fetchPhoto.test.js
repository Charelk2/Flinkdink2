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

  test('returns URL on success', async () => {
    const url = 'http://img.test/photo.jpg'
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ url }),
    })

    await expect(fetchPhoto('cats')).resolves.toBe(url)
  })

  test('returns placeholder on 404', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => 'Not found',
    })

    await expect(fetchPhoto('cats')).resolves.toBe('/images/placeholder.png')
  })

  test('returns placeholder on network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('fail'))

    await expect(fetchPhoto('cats')).resolves.toBe('/images/placeholder.png')
    expect(errorSpy).toHaveBeenCalledWith('Photo fetch failed', expect.any(Error))
  })
})
