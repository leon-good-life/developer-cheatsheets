const fs = require('fs')
const path = require('path')
const pdfmake = require('pdfmake')
const fonts = require('./fonts/fonts')

String.prototype.replaceAll = function (search, replacement) {
	var target = this
	return target.replace(new RegExp(search, 'g'), replacement)
}

const generateSections = (cheatSheetData) => {
	let sectionsArr = cheatSheetData.sections.map(sectionObject => {
		if (sectionObject.type === 'image') {
			return null
		}
		return [
			{
				text: sectionObject.title,
				fontSize: 16,
				bold: true
			},
			{
				text: sectionObject.content.replaceAll('  ', '\u200B\t\t') + '\n\n\n\n',
				fontSize: 12,
				bold: false
			}
		]
	})
	sectionsArr = sectionsArr.filter(section => section !== null)

	const columns = []

	for (let i = 0; i < sectionsArr.length; i += 2) {
		if (i + 1 < cheatSheetData.sections.length) {
			columns.push({
				columns: [sectionsArr[i], sectionsArr[i + 1]]
			})
		} else {
			columns.push({
				columns: [sectionsArr[i]]
			})
		}
	}

	return columns
}

const template = ({ title, keywords, color, logo, sections }) => {
	return docDefinition
}

const generatePdfCheatSheet = cheatSheetData => {
	const sectionsPdf = generateSections(cheatSheetData)
	let content = []
	content.push({
		text: cheatSheetData.title + '\n\n',
		fontSize: 22,
		bold: true
	})
	content = content.concat(sectionsPdf)
	content.push({
		text: '\nCopyright © 2018 - 2020\nwww.developer-cheatsheets.com',
		fontSize: 12,
		bold: false,
		alignment: 'center'
	})
	const docDefinition = { content }


	const printer = new pdfmake(fonts)
	const pdfDoc = printer.createPdfKitDocument(docDefinition)
	pdfDoc.pipe(fs.createWriteStream(`build/pdf/${cheatSheetData.file}.pdf`))
	pdfDoc.end()
}

module.exports = generatePdfCheatSheet