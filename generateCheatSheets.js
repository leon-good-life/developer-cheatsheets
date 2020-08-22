const fs = require('fs')
const path = require('path')

const generateHTMLCheatSheet = require('./generateHTMLCheatSheet')
const generatePdfCheatSheet = require('./generatePdfCheatSheet')

const getSectionFileContent = (pageName, sectionObject) => {
    const contentPath = `./data/${pageName}/sections/${sectionObject.name}.txt`
    const content = fs.readFileSync(path.resolve(__dirname, contentPath), 'utf8')
    return content
}

const addSectionFileContentToSections = cheatSheetData => {
    const sections = cheatSheetData.sections.map(sectionObject => {
        const content = getSectionFileContent(cheatSheetData.file, sectionObject)
        return {
            ...sectionObject,
            content,
        }
    })
    return { ...cheatSheetData, sections }
}

const getCompleteCheatSheetData = pageName => {
    const cheatSheetData = require(`./data/${pageName}/${pageName}`)
    const completeCheatSheetData = addSectionFileContentToSections(cheatSheetData)
    return completeCheatSheetData
}

const generatePage = pageName => {
    const cheatSheetData = getCompleteCheatSheetData(pageName)
    generateHTMLCheatSheet(cheatSheetData)
    generatePdfCheatSheet(cheatSheetData)
}

const cheatSheetPages = ['react', 'react-router', 'es6', 'redux'];
cheatSheetPages.forEach(generatePage)

