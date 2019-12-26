import { CustomSet } from "../utils"

const TAGS_PATTERN = /[^a-zA-Z]+(ARM|x86|x86-64|Web Assembly|D3|WASM|Lab View|Webgl|Blockchain|opengl|bash|Unity|Dependency Injection|Inversion of Control|Full stack|Frontend|HTML|Jade|Pug|JavaScript|Websocket|TypeScript|JQuery|Knockout|Ember|Angular|Protractor|Vue|React|Hooks|Redux|Next|Thunk|Saga|Immutable|Backend|Node|Express|Webpack|npm|Yarn|GraphQL|Jasmine|Jest|Karma|Cypress|Puppeteer|CSS|SASS|LESS|PostCSS|REST|Python|Django|PyPI|Golang|PHP|Ruby|Java|Spring|Maven|C#|.NET|NuGet|Azure|Docker|Kubernetes|RDBMS|SQL|NoSQL|MySQL|Oracle|SaaS|PaaS|google-cloud-platform|amazon-web-services|azure|GoogleCloud|Google Compute Engine|GCE|GCP|TensorFlow|Linux|IoT|Auth0|Git|Electron|Cordova|Apache|Postgres|gRPC|Istio|Envoy|Canvas|Airtable|Salesforce|Pardot|AJAX|JSON|JSP|Struts|Gradle|Embedded|MQTT|SOA|Github|Trello|Slack|Chef|Ansible|Vagrant|OpenCV|Yocto|iOS|Vitual Reality|Augmented Reality|ARKit)/gi

const CASE_SENSITIVE_TAGS_PATTERN = /[^a-zA-Z#]+(JS|TS|TDD|SOLID|DI|IoC|Go|C|C\+\+|CI|CD|SVN|PWA|VR|AR)[^a-zA-Z#]+/g

const TAG_ALIASES = {
    "javascript" : "JS",
    "typescript" : "TS",
    "dependency injection" : "DI",
    "inversion of control" : "IoC",
    "golang" : "Go",
    "virtual reality" : "VR",
    "augmented reality" : "AR",
    "google-cloud-platform" : "GCP",
    "amazon-web-services" : "AWS",
    "web assembly" : "WASM"
}

export interface EndpointData {
    data : string[][],
    links : string[][]
}

function retrieveTagsFromStringWithPattern(str: string, pattern: RegExp):CustomSet<string> {
    const tags:CustomSet<string> = new CustomSet()
    const results = str.matchAll(pattern)
    for (let { value: result, done } = results.next(); done === false; {value: result, done} = results.next()) {
        const val = result[1].toLowerCase().trim()
        if (val in TAG_ALIASES) {
            tags.add(TAG_ALIASES[val].toLowerCase())
        }
        else {
            tags.add(val)
        }
    }
    return tags
}

function retrieveTagsFromString(str: string): CustomSet<string> {
    const tags:CustomSet<string> = retrieveTagsFromStringWithPattern(str, TAGS_PATTERN)
    tags.addSet(retrieveTagsFromStringWithPattern(str, CASE_SENSITIVE_TAGS_PATTERN))

    return tags
}

/*
function isolateTagsFromArray(values: [string]): CustomSet<string> {
    const tags = values.reduce(function(tags, val, index) {
        val[0].split(",").forEach(function(newVal) {
            tags.add(newVal.trim())
        })
        return tags
    }, new CustomSet())

    return tags
}
*/

function isolateTagsFromTagString(str: string, delim: string): CustomSet<string> {
    let tags: CustomSet<string> = new CustomSet()
    str.split(delim).forEach(function(tag: string) {
        tags.add(tag.trim())
    })
    return tags
}

function fetchDataFromEndpointURL(url: string):CheerioStatic {
    const html:string = UrlFetchApp.fetch(url).getContentText()
    return cheerio.load(html)
}

export {
    retrieveTagsFromString,
    isolateTagsFromTagString,
    fetchDataFromEndpointURL
}
