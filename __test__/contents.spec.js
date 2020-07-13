process.env.NODE_ENV = 'test'
const supertest = require('supertest')
const basePath = require('../index')
const Contents = require('../contents/contents.model')

describe('TEST API',() => {
	beforeEach(async () => {
		await Contents.deleteMany()
	})
})

describe('TEST DB', () => {
	it('adds data  to the database', async () => {
		const content = new Contents({
			sharerName: 'Neche',
			contentTitle: 'Hello is also Purity',
			contentUrl:
				'https://baby.hashnode.dev/git-and-github-for-absolute-beginners',
			contentCategory: 'blog',
		})

		await content.save()
		expect(content.sharerName).toBe('Neche')
		expect(content.contentTitle).toBe('Hello is also Purity')
  })

  it()
})
