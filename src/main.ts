/*
 *                   main
 *                    |
 *               +----+---
 */

// Tests
import {
    testRetrieveTagsFromString,
    testIsolateTagsFromTagString
} from "../tests/tests"

import { EndpointData } from "./endpoints/endpoint"
import { fetchDataFromRemoteOK } from "./endpoints/remoteok"
import { findOrCreateFileInFolder, findOrCreateSheetInSpreadsheet, updateSheetHeadings } from "./spreadsheet_utils"
import { Spreadsheet, Sheet } from "./googleappsscript_type_aliases"
//import { fetchDataFromEndpointURL } from "./endpoints/endpoint"

const FOLDER_ID = "1YVIMzVwIo19nqsjKfUg8Y03Q2rWpX6lt"
const FILENAME = "Remote Job Listings"
const SHEET_NAME = "Raw Data"
const HEADINGS = [["ID", "Posting Date","Deadline Date", "Title", "Company", "Company Location", "Compensation (USD/Year)", "Experience Level", "Key Qualifications", "Commitment", "Hours", "Applied Date"]];


declare let global:any

function updateRecords():void {
    const spreadsheet:Spreadsheet = findOrCreateFileInFolder(FOLDER_ID, FILENAME)
    if (spreadsheet === null) return

    const sheet:Sheet = findOrCreateSheetInSpreadsheet(spreadsheet, SHEET_NAME)

    // !Update headings with data for performance
    updateSheetHeadings(sheet, HEADINGS)

    // Read data from all endpoints
    const data:EndpointData = fetchDataFromRemoteOK()
    Logger.log(data)

    // Update records in sheet
}
global.updateRecords = updateRecords

function runTests():void {
    testRetrieveTagsFromString()
    testIsolateTagsFromTagString()
}
global.runTests = runTests
