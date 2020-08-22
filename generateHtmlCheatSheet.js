const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')

const cheatSheetTemplatePath = path.resolve(__dirname, './handlebars/cheatSheet.handlebars')
const cheatSheetTemplate = fs.readFileSync(cheatSheetTemplatePath, 'utf8')
const fillCheatSheetTemplate = Handlebars.compile(cheatSheetTemplate)

const cheatSheetSectionTemplatePath = path.resolve(__dirname, './handlebars/cheatSheetSection.handlebars')
const cheatSheetSectionTemplate = fs.readFileSync(cheatSheetSectionTemplatePath, 'utf8')
const fillCheatSheetSectionTemplate = Handlebars.compile(cheatSheetSectionTemplate)

const generateHTMLCheatSheet = cheatSheetData => {
    const sectionsString = cheatSheetData.sections.map(sectionObject => fillCheatSheetSectionTemplate(sectionObject)).join('')
    const content = fillCheatSheetTemplate({ ...cheatSheetData, sections: sectionsString })
    fs.writeFileSync(`build/html/${cheatSheetData.file}`, content)
    fs.writeFileSync(`${cheatSheetData.file}.html`, content)
}

module.exports = generateHTMLCheatSheet