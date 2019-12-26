import {
    testRetrieveTagsFromString,
    testIsolateTagsFromTagString
} from "../tests/tests"

import { EndpointData } from "./endpoints/endpoint"
import { fetchDataFromRemoteOK } from "./endpoints/remoteok"
import { fetchDataFromStackoverflow } from "./endpoints/stackoverflow"
import {
    findOrCreateFileInFolder, 
    findOrCreateSheetInSpreadsheet, 
    updateSheetHeadings,
    updateSheetWithNewDataAndLinks
} from "./spreadsheet_utils"
import { Spreadsheet, Sheet } from "./googleappsscript_type_aliases"

const FOLDER_ID = "1YVIMzVwIo19nqsjKfUg8Y03Q2rWpX6lt"
const FILENAME = "Remote Job Listings"
const SHEET_NAME = "Raw Data"
const HEADINGS = [["ID", "Posting Date","Deadline Date", "Title", "Company", "Company Location", "Compensation (USD/Year)", "Experience Level", "Key Qualifications", "Commitment", "Hours", "Applied Date"]];
const ID_INDEX = HEADINGS[0].indexOf("ID")
const LINKS_INDEX = HEADINGS[0].indexOf("Title")

declare let global:any

function getSheet():Sheet {
    const spreadsheet:Spreadsheet = findOrCreateFileInFolder(FOLDER_ID, FILENAME)
    if (spreadsheet === null) return

    return findOrCreateSheetInSpreadsheet(spreadsheet, SHEET_NAME)
}

function updateRecords():void {
    const sheet:Sheet = getSheet() 

    // Read data from all endpoints
    const stackoverflowData:EndpointData = fetchDataFromStackoverflow()
    const remoteOKData:EndpointData = fetchDataFromRemoteOK()
    const data =  stackoverflowData.data.concat(remoteOKData.data)
    const links = stackoverflowData.links.concat(remoteOKData.links)

    updateSheetWithNewDataAndLinks(sheet, data, links, ID_INDEX, LINKS_INDEX)
}
global.updateRecords = updateRecords

function updateHeadings():void {
    const sheet:Sheet = getSheet()
    updateSheetHeadings(sheet, HEADINGS)
}
global.updateHeadings = updateHeadings

function updateRemoteOKRecords():void {
    const sheet = getSheet()

    const remoteOKData:EndpointData = fetchDataFromRemoteOK()

    updateSheetWithNewDataAndLinks(sheet, remoteOKData.data, remoteOKData.links, ID_INDEX, LINKS_INDEX)
}
global.updateRemoteOKRecords = updateRemoteOKRecords

function updateStackoverflowRecords():void {
    const sheet = getSheet()

    const stackoverflowData:EndpointData = fetchDataFromStackoverflow()

    updateSheetWithNewDataAndLinks(sheet, stackoverflowData.data, stackoverflowData.links, ID_INDEX, LINKS_INDEX)
}
global.updateStackoverflowRecords = updateStackoverflowRecords

function runTests():void {
    testRetrieveTagsFromString()
    testIsolateTagsFromTagString()
}
global.runTests = runTests
