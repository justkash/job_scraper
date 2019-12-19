/*
 *                   main
 *                    |
 *               +----+---
 */

import { CustomSet } from "./utils"
import { EndpointData, retrieveTagsFromString, isolateTagsFromTagString } from "./endpoint"
import { findOrCreateFileInFolder, findOrCreateSheetInSpreadsheet, updateSheetHeadings } from "./spreadsheet_utils"
import { Spreadsheet, Sheet } from "./googleappsscript_type_aliases"

const FOLDER_ID = "1YVIMzVwIo19nqsjKfUg8Y03Q2rWpX6lt"
const FILENAME = "Remote Job Listings"
const SHEET_NAME = "Raw Data"
const HEADINGS = [["ID", "Posting Date","Deadline Date", "Title", "Company", "Company Location", "Compensation (USD/Year)", "Experience Level", "Key Qualifications", "Commitment", "Hours", "Applied Date"]];


declare let global:any;

function updateRecords():void {
    const spreadsheet:Spreadsheet = findOrCreateFileInFolder(FOLDER_ID, FILENAME)
    if (spreadsheet === null) return

    const sheet:Sheet = findOrCreateSheetInSpreadsheet(spreadsheet, SHEET_NAME)

    updateSheetHeadings(sheet, HEADINGS)
    // Read data from all endpoints
    // Update records in sheet
}
global.updateRecords = updateRecords
