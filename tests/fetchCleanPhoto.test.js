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
      json: async () => ({ results: [{ urls: { raw: 'http://img.test/a.jpg' } }] }),
    })

    await expect(fetchCleanPhoto('cats')).resolves.toBe(
      'http://img.test/a.jpg?w=640&h=360&fit=crop&crop=faces,entropy',
    )
  })

  test('handles existing query strings', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ urls: { raw: 'http://img.test/a.jpg?foo=1' } }] }),
    })

    await expect(fetchCleanPhoto('cats')).resolves.toBe(
      'http://img.test/a.jpg?foo=1&w=640&h=360&fit=crop&crop=faces,entropy',
    )
  })

  test('includes smart crop parameters', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ urls: { raw: 'http://img.test/a.jpg' } }] }),
    })

    const result = await fetchCleanPhoto('pug')
    expect(result).toContain('fit=crop')
    expect(result).toContain('crop=faces,entropy')
  })

  test('trims whitespace in query', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ urls: { raw: 'http://img.test/d.jpg' } }] }),
    })

    const result = await fetchCleanPhoto('  Dalmatian  ')
    expect(result).toBe(
      'http://img.test/d.jpg?w=640&h=360&fit=crop&crop=faces,entropy',
    )
    expect(global.fetch.mock.calls[0][0]).toContain('Dalmatian')
  })

  test('falls back through queries', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ results: [] }) })
      .mockResolvedValueOnce({ ok: false, status: 404, text: async () => 'Not found' })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ results: [{ urls: { raw: 'dog.jpg' } }] }) })

    const result = await fetchCleanPhoto('pug')
    expect(result).toBe('dog.jpg?w=640&h=360&fit=crop&crop=faces,entropy')
    expect(global.fetch).toHaveBeenCalledTimes(3)
    expect(global.fetch.mock.calls[0][0]).toContain('isolated')
    expect(global.fetch.mock.calls[2][0]).toContain('dog%20white%20background')
  })

  test('returns placeholder on failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404, text: async () => 'Not found' })

    const result = await fetchCleanPhoto('pug')
    expect(result).toBe('/images/placeholder.png')
    expect(global.fetch).toHaveBeenCalledTimes(3)
  })
})
