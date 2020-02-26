import { EndpointData, fetchDataFromEndpointURL, retrieveTagsFromString } from "./endpoint"
import { isolateAverageSalaryFromString, extractDateFromAgoString } from "../utils"

const STACKOVERFLOW_MAX_NUM_RECORDS = 100
const STACKOVERFLOW_BASE_URL = "https://stackoverflow.com"
const STACKOVERFLOW_DATA_URL = STACKOVERFLOW_BASE_URL + "/jobs?r=true&sort=p"
const ID_PREFIX = "stackoverflow-"
const SALARY_REGEXP = /(\d+)k/g

function fetchDataFromStackoverflow():EndpointData {
    let $:CheerioStatic = fetchDataFromEndpointURL(STACKOVERFLOW_DATA_URL)

    let data = []
    let links = []
    $("div.listResults div.-job").each(function(index) {
        const row = $(this)
        const rowData = []

        const id:string = ID_PREFIX + row.attr("data-jobid")
        const jobURL:string = row.find("a.s-link").attr("href")
        if (!jobURL) return
        const toURL:string = STACKOVERFLOW_BASE_URL + jobURL

        const rowDataBlock = row.find("div.fl1").first()
        const title:string = rowDataBlock.children("h2").first().text().trim()

        const companyDetailsBlock = rowDataBlock.find("h3 span")
        const companyName:string = companyDetailsBlock.first().text().trim()
        const companyLocationStr:string = companyDetailsBlock.last().text().trim()
        const companyLocation:string = (companyLocationStr === "No office location"? "" : companyLocationStr)

        const tagsList:string[] = []
        rowDataBlock.find("div a.post-tag").each(function(index) {
            const tagEl = $(this)
            tagsList.push(tagEl.text())
        })
        const tagsListSet = retrieveTagsFromString(tagsList.join(" "))

        const postingDate = extractDateFromAgoString(rowDataBlock.find("div div.grid--cell").first().text())
        const postingDateStr = (postingDate === null)? "":postingDate.toDateString()

        $ = fetchDataFromEndpointURL(toURL)
        const detailsContent = $("div.job-details--content")
        const compensationStr = detailsContent.find("span.-salary").first().text()
        const detailsAboutContent = detailsContent.find("div.job-details--about div.grid--cell6").first()

        const description = detailsContent.find("div.job-details__spaced").first().children("section.mb32").last().text()
        const tagsSet = retrieveTagsFromString(description)
        tagsSet.addSet(tagsListSet)

        const deadlineDate = ""
        const compensationNum = (isolateAverageSalaryFromString(compensationStr, SALARY_REGEXP)*1000)
        const compensation = (isNaN(compensationNum)? "" : compensationNum.toString(10))
        const experienceLevelBlock = detailsAboutContent.find("div.mb8").eq(1).find("span")
        const experienceLevel = (experienceLevelBlock.first().text().trim() === "Experience level:"? experienceLevelBlock.last().text().trim() : "") 
        const keyQualifications = tagsSet.toArray().join(", ")
        const commitmentStr = detailsAboutContent.find("div.mb8").first().find("span").last().text()
        const commitment = (commitmentStr === "Full-time"? "Full Time":commitmentStr)
        const hours = ""
        const appliedDate = ""
        
        rowData.push(id)
        rowData.push(postingDateStr)
        rowData.push(deadlineDate)
        rowData.push(title)
        rowData.push(companyName)
        rowData.push(companyLocation)
        rowData.push(compensation)
        rowData.push(experienceLevel)
        rowData.push(keyQualifications)
        rowData.push(commitment)
        rowData.push(hours)
        rowData.push(appliedDate)

        data.push(rowData)
        links.push(['=HYPERLINK("'+ toURL +'","'+ title +'")'])

        if (index == STACKOVERFLOW_MAX_NUM_RECORDS) return false
    })

    Logger.log("# of Records: " + data.length)

    return {
        data: data,
        links: links
    }

}

export {
    fetchDataFromStackoverflow
}
