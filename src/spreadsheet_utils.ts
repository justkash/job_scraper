import { Spreadsheet, Sheet, Folder, File, FileIterator } from "./googleappsscript_type_aliases"

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

export {
    findOrCreateFileInFolder,
    findOrCreateSheetInSpreadsheet,
    updateSheetHeadings
}
