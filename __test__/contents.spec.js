process.env.NODE_ENV = 'test'
const supertest = require('supertest')
const basePath = require('../index')
const request = supertest(basePath)
const Contents = require('../contents/contents.model')

describe('TEST API', () => {
	beforeEach(async () => {
		await Contents.deleteMany()
	})
})

describe('TEST DB', () => {
	it('adds data  to the database', async () => {
		const content = new Contents({
			sharerName: 'Neche',
			contentTitle: 'Hello Miss. Purity',
			contentUrl:
				'https://baby.hashnode.dev/git-and-github-for-absolute-beginners',
			contentCategory: 'blog',
		})

		await content.save()
		expect(content.sharerName).toBe('Neche')
		expect(content.contentTitle).toBe('Hello Miss. Purity')
	})

	it('retrieve all the contents', async () => {
		const res = await request.get('/all-resource')
		expect(res.statusCode).toBe(200)
	})

	// custom matcher to match array of object returned by database
	expect.extend({
		toContainObject(received, expected) {
			const pass = this.equals(
				received,
				expect.arrayContaining(expect.objectContaining(expected))
			)

			if (pass) {
				return {
					message: () =>
						`expected ${this.utils.printReceived(
							received
						)} to be ${this.utils.printExpected(expected)}`,
					pass: true,
				}
			} else {
				return {
					message: () =>
						`expected ${this.utils.printReceived(
							received
						)} not to be ${this.utils.printExpected(arguments)}`,
					pass: false,
				}
			}
		},
	})

	it('db retrieves files correctly', async () => {
		const items = [
			{
				sharerName: 'Neche',
				contentTitle: 'some title here',
				contentCategory: 'article',
				contentUrl: 'https://neche.com',
			},
			{
				sharerName: 'Spato',
				contentTitle: 'some title here',
				contentCategory: 'blog',
				contentUrl: 'https://spatocode.com/blog',
			},
			{
				sharerName: 'Purity',
				contentTitle: 'some title here',
				contentCategory: 'article',
				contentUrl: 'https://purity.com',
			},
		]
		await Contents.insertMany(items)
		let content = await Contents.find()
		expect.toContainObject({
			sharerName: 'Neche',
			contentTitle: 'some title here',
		})
		expect(content).toHaveLength(4)
	})

	it('returns empty array if no content is addded', async () => {
		await Contents.deleteMany()
		let content = await Contents.find()
		expect(content).toHaveLength(0)
	})
})
