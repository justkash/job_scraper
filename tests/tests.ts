import { EndpointData, retrieveTagsFromString, isolateTagsFromTagString } from "../src/endpoint"
import { CustomSet } from "../src/utils"

function testRetrieveTagsFromString() {
    let tags: CustomSet<string> = retrieveTagsFromString("Demonstrated understanding of software design principles such as SOLID, DI/IoC, CI, TDD \n * Experience working with the full Microsoft technology stack, including .NET/C#, SQL Server, ASP.NET, MVC and Web API \n * RESTful Architecture experience \n * Object Relation Mapping such as Entity Framework or nHibernate is required \n * Experience with HTML5, JavaScript and CSS3 \n * Experience with front-end libraries, AngularJS, Angular, and jQuery (Angular is required). Bootstrap is a plus. \n * Experience with Software as a Service (SaaS), multi-tenancy application development \n * Experience working with large relational databases \n * Experience using Agile Scrum software development life cycle \n * Experience using source control management tools such as GIT")
    tags.forEach((tag) => {
        Logger.log(tag)
    })
}

function testIsolateTagsFromTagString() {
    let tags: CustomSet<string> = isolateTagsFromTagString("js, js , css, html", ",")
    tags.forEach((tag) => {
        Logger.log(tag)
    })
}
