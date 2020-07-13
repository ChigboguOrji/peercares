
const form = $('#resource-form')

form.on('submit', function (e) {
	e.preventDefault()
	const sharerName = $('#sharerName').val() || 'Anonymuous'
	const contentTitle = $('#contentTitle').val()
	const contentUrl = $('#contentUrl').val()
	const contentCategory = $('#contentCategory').val()

	console.log(
		`%c ${sharerName}, ${contentTitle}, ${contentUrl}, ${contentCategory}`,
		'color:green;font-size:20px;'
	)

	jQuery.ajax({
		method: 'POST',
		url: '/contents/v1/new-resource',
		data: { sharerName, contentTitle, contentUrl, contentCategory },
		accepts: 'application/json',
	})
		.done(function (done) {
			console.log(done)
			console.log('%cSuccess!!', 'color:green;font-size:30px;')
		})
		.fail(function (failed) {
			console.log(failed)
			console.log('%cFailed!!', 'color:green;font-size:30px;')
		})
})
