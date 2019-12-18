/*
 *                   main
 *                    |
 *               +----+---
 */

import { CustomSet } from "./utils"
import { EndpointData, retrieveTagsFromString, isolateTagsFromTagString } from "./endpoint"

declare let global: any;

function testIsolateTagsFromTagString() {
    let tags: CustomSet<string> = isolateTagsFromTagString("js, js , css, html", ",")
    tags.forEach((tag) => {
        Logger.log(tag)
    })
}
global.testIsolateTagsFromTagString = testIsolateTagsFromTagString

