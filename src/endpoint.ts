import { CustomSet } from "./utils"

const HEADINGS = [["ID", "Posting Date","Deadline Date", "Title", "Company", "Company Location", "Compensation (USD/Year)", "Experience Level", "Key Qualifications", "Commitment", "Hours", "Applied Date"]];

const HEADINGS_TITLE_INDEX = HEADINGS[0].indexOf("Title");

const TAGS_PATTERN = /[^a-zA-Z]+(Unity|Dependency Injection|Inversion of Control|Full stack|Frontend|HTML|Jade|Pug|JavaScript|Websocket|TypeScript|JQuery|Knockout|Ember|Angular|Protractor|Vue|React|Hooks|Redux|Next|Thunk|Saga|Immutable|Backend|Node|Express|Webpack|npm|Yarn|GraphQL|Jasmine|Jest|Karma|Cypress|Puppeteer|CSS|SASS|LESS|PostCSS|REST|Python|Django|PyPI|Golang|PHP|Ruby|Java|Spring|Maven|C#|.NET|NuGet|Azure|Docker|Kubernetes|RDBMS|SQL|NoSQL|MySQL|Oracle|SaaS|PaaS|GoogleCloud|Google Compute Engine|GCE|GCP|TensorFlow|Linux|IoT|Auth0|Git|Electron|Cordova|Apache|Postgres|gRPC|Istio|Envoy|Canvas|Airtable|Salesforce|Pardot|AJAX|JSON|JSP|Struts|Gradle|Embedded|MQTT|SOA|Github|Trello|Slack|Chef|Ansible|Vagrant|OpenCV|Yocto|iOS|Vitual Reality|Augmented Reality|ARKit)/gi;

const CASE_SENSITIVE_TAGS_PATTERN = /[^a-zA-Z#]+(JS|TS|TDD|SOLID|DI|IoC|Go|C|C\+\+|CI|CD|SVN|PWA|VR|AR)[^a-zA-Z#]+/g;

const TAG_ALIASES = {
    "javascript" : "JS",
    "typescript" : "TS",
    "dependency injection" : "DI",
    "inversion of control" : "IoC",
    "golang" : "Go",
    "virtual reality" : "VR",
    "augmented reality" : "AR",
}

export interface EndpointData {
    readonly rowData : string;
    readonly links : string;
}

function retrieveTagsFromStringWithPattern(tags: CustomSet<string>, str: string, pattern: RegExp): void {
    let results = str.matchAll(pattern)
    for (const result of results) {
        const val = result[1].toLowerCase()
        if (val in TAG_ALIASES) {
            tags.add(TAG_ALIASES[val].toLowerCase())
        }
        else {
            tags.add(val)
        }
    }
}

function retrieveTagsFromString(str: string): CustomSet<string> {
    let tags: CustomSet<string> = new CustomSet()

    retrieveTagsFromStringWithPattern(tags, str, TAGS_PATTERN)
    retrieveTagsFromStringWithPattern(tags, str, CASE_SENSITIVE_TAGS_PATTERN)

    return tags
}

/*
function isolateTagsFromArray(values: [string]): CustomSet<string> {
    const tags = values.reduce(function(tags, val, index) {
        val[0].split(",").forEach(function(newVal) {
            tags.add(newVal.trim());
        });
        return tags
    }, new CustomSet());

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

export {
    retrieveTagsFromString,
    isolateTagsFromTagString
}
