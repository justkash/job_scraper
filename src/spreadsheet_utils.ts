import { Spreadsheet, Sheet, Folder, File, FileIterator } from "./googleappsscript_type_aliases"
import { CustomSet } from "./utils"

function findOrCreateFileInFolder(folderId: string, filename: string):Spreadsheet {
    const folder:Folder = DriveApp.getFolderById(folderId)
    if (folder === null) {
        Logger.log("Error, folder with id: %s was not found.", folderId)
        return null
    }

    const fileIter:FileIterator = folder.getFilesByName(filename)
    if (!fileIter.hasNext()) {
        let spreadsheet:Spreadsheet = SpreadsheetApp.create(filename)
        let file:File = DriveApp.getFileById(spreadsheet.getId())
        folder.addFile(file)
        DriveApp.removeFile(file)
        return spreadsheet
    }
    let file:File = fileIter.next() 
    return SpreadsheetApp.open(file)
}

function findOrCreateSheetInSpreadsheet(spreadsheet:Spreadsheet, sheetName:string):Sheet {
    let sheet = spreadsheet.getSheetByName(sheetName)
    if (sheet !== null) {
        return spreadsheet.getSheetByName(sheetName)
    }
    return spreadsheet.insertSheet(sheetName)
}

function updateSheetHeadings(sheet:Sheet, headings:string[][]):void {
    const endColumn = String.fromCharCode('A'.charCodeAt(0) + headings[0].length - 1)
    const headingsRange = sheet.getRange("A1:" + endColumn  + "1")
    headingsRange.setValues(headings)
    const headingsStyle = SpreadsheetApp.newTextStyle().setBold(true).build()
    headingsRange.setTextStyle(headingsStyle)
}

function getIdsFromSheet(sheet:Sheet, idColumnIndex:number):[number, string[]] {
    const lastRow = sheet.getDataRange().getLastRow()
    const idColumn = String.fromCharCode('A'.charCodeAt(0) + idColumnIndex)
    const idRange = sheet.getRange(idColumn + "2:" + idColumn + lastRow.toString(10))
    return [lastRow, idRange.getValues().map((value) => value[0])]
}

function updateSheetWithNewDataAndLinks(
    sheet:Sheet, 
    data:string[][], 
    links:string[][], 
    idColumnIndex:number,
    linksColumnIndex:number
):void {
    const [ lastRow, ids ] = getIdsFromSheet(sheet, idColumnIndex)

    const newData = []
    const newLinks = []
    for (let i = 0; i < data.length; ++i) {
        const id:string = data[i][idColumnIndex]
        if (ids.includes(id.trim())) continue

        newData.push(data[i])
        newLinks.push(links[i])
    }

    if (newData.length === 0) return

    const endColumn = String.fromCharCode('A'.charCodeAt(0) + data[0].length - 1)
    const startRow = (lastRow + 1).toString(10)
    const endRow = (lastRow + newData.length).toString(10)
    const newDataRange = sheet.getRange("A" + startRow + ":" + endColumn + endRow)
    newDataRange.setValues(newData)

    const linksColumn = String.fromCharCode('A'.charCodeAt(0) + linksColumnIndex)
    var linksRange = sheet.getRange(linksColumn + startRow + ":" + linksColumn + endRow)
    linksRange.setFormulas(newLinks)
}

export {
    findOrCreateFileInFolder,
    findOrCreateSheetInSpreadsheet,
    updateSheetHeadings,
    updateSheetWithNewDataAndLinks
}
