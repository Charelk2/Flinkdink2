let fetchCleanPhoto

beforeAll(async () => {
  ;({ default: fetchCleanPhoto } = await import('../utils/fetchCleanPhoto.js'))
})

describe('fetchCleanPhoto', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    delete global.fetch
  })

  test('returns first result', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ urls: { small: 'http://img.test/a.jpg' } }] }),
    })

    await expect(fetchCleanPhoto('cats')).resolves.toBe('http://img.test/a.jpg')
  })

  test('handles existing query strings', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ urls: { small: 'http://img.test/a.jpg?foo=1' } }] }),
    })

    await expect(fetchCleanPhoto('cats')).resolves.toBe('http://img.test/a.jpg?foo=1')
  })

  test('includes crop params in API request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ urls: { small: 'http://img.test/a.jpg' } }] }),
    })

    await fetchCleanPhoto('pug')
    expect(global.fetch.mock.calls[0][0]).toContain('fit=crop')
    expect(global.fetch.mock.calls[0][0]).toContain('crop=faces,entropy')
  })

  test('trims whitespace in query', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ urls: { small: 'http://img.test/d.jpg' } }] }),
    })

    const result = await fetchCleanPhoto('  Dalmatian  ')
    expect(result).toBe('http://img.test/d.jpg')
    expect(global.fetch.mock.calls[0][0]).toContain('Dalmatian')
  })

  test('falls back through queries', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ results: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ results: [] }) })
      .mockResolvedValueOnce({ ok: false, status: 404, text: async () => 'Not found' })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ results: [{ urls: { small: 'dog.jpg' } }] }) })

    const result = await fetchCleanPhoto('pug')
    expect(result).toBe('dog.jpg')
    expect(global.fetch).toHaveBeenCalledTimes(4)
    expect(global.fetch.mock.calls[0][0]).toContain('orientation=portrait')
    expect(global.fetch.mock.calls[1][0]).toContain('color=white')
    expect(global.fetch.mock.calls[2][0]).toContain('isolated')
    expect(global.fetch.mock.calls[3][0]).toContain('pug')
  })

  test('returns placeholder on 404', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => 'Not found',
    })

    const result = await fetchCleanPhoto('pug')
    expect(result).toBe('/images/placeholder.png')
    expect(global.fetch).toHaveBeenCalledTimes(4)
  })

  test('returns placeholder on network error', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(Object.assign(new Error('fail'), { code: 'ENETUNREACH' }))

    const result = await fetchCleanPhoto('pug')
    expect(result).toBe('/images/placeholder.png')
  })

  test('returns placeholder on server error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Server error',
    })

    const result = await fetchCleanPhoto('pug')
    expect(result).toBe('/images/placeholder.png')
  })
})
