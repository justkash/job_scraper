import { expect } from "chai"

import { EndpointData, retrieveTagsFromString, isolateTagsFromTagString } from "../src/endpoints/endpoint"
import { CustomSet } from "../src/utils"

function testRetrieveTagsFromString() {
    Logger.log("Runing testRetrieveTagsFromString...")

    let tags: CustomSet<string> = retrieveTagsFromString("Demonstrated understanding of software design principles such as SOLID, DI/IoC, CI, TDD \n * Experience working with the full Microsoft technology stack, including .NET/C#, SQL Server, ASP.NET, MVC and Web API \n * RESTful Architecture experience \n * Object Relation Mapping such as Entity Framework or nHibernate is required \n * Experience with HTML5, JavaScript and CSS3 \n * Experience with front-end libraries, AngularJS, Angular, and jQuery (Angular is required). Bootstrap is a plus. \n * Experience with Software as a Service (SaaS), multi-tenancy application development \n * Experience working with large relational databases \n * Experience using Agile Scrum software development life cycle \n * Experience using source control management tools such as GIT")

    expect(tags.toArray()).to.be.an('array').that.includes("js");
    expect(tags.toArray()).to.be.an('array').that.includes(".net");
    expect(tags.toArray()).to.be.an('array').that.includes("c#");
    expect(tags.toArray()).to.be.an('array').that.includes("sql");
    expect(tags.toArray()).to.be.an('array').that.includes("rest");
    expect(tags.toArray()).to.be.an('array').that.includes("html");
    expect(tags.toArray()).to.be.an('array').that.includes("js");
    expect(tags.toArray()).to.be.an('array').that.includes("css");
    expect(tags.toArray()).to.be.an('array').that.includes("angular");
    expect(tags.toArray()).to.be.an('array').that.includes("jquery");
    expect(tags.toArray()).to.be.an('array').that.includes("saas");
    expect(tags.toArray()).to.be.an('array').that.includes("git");
}

function testIsolateTagsFromTagString() {
    Logger.log("Runing testIsolateTagsFromTagString...")

    let tags: CustomSet<string> = isolateTagsFromTagString("js, js , css, html", ",")

    expect(tags.toArray()).to.be.an('array').that.includes("js");
    expect(tags.toArray()).to.be.an('array').that.includes("css");
    expect(tags.toArray()).to.be.an('array').that.includes("html");
}

export {
    testRetrieveTagsFromString,
    testIsolateTagsFromTagString
}
