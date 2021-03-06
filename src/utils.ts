export class CustomSet<T> implements Iterator<T> {
    private data:Array<T>
    private pointer:number

    constructor() {
        this.data = new Array<T>()
        this.pointer = 0
    }

    public delete(item:T):boolean {
        const index = this.data.indexOf(item)
        if (index < 0) return false

        this.data = this.data.slice(0, index).concat(this.data.slice(index + 1))
        return true
    }

    public has(item:T):boolean {
        return this.data.includes(item)
    }

    public size():number {
        return this.data.length
    }

    public clear():void {
        this.pointer = 0
        this.data = new Array<T>()
    }

    public forEach(callback:Function):void {
        for (let i = 0; i < this.data.length; ++i) {
            callback(this.data[i], this)
        }
    }

    public add(val:T):CustomSet<T> {
        if (!this.has(val)) this.data.push(val)

        return this
    }

    public addSet(otherSet:CustomSet<T>):CustomSet<T> {
        otherSet.forEach((item) => {
            this.add(item)
        })

        return this
    }

    public toArray():Array<T> {
        return this.data
    }

    public toString():string {
        return this.data.join(", ")
    }

    /* Received the following error from GoogleScript 
       ReferenceError:"Symbol" is not defined.
    */
    /*
    public [Symbol.iterator]() {
        let step = -1
        const iterator = {
            next() {
                step++
                if (step === this.data.length) {
                    return {
                        done :true,
                        value :null
                    }
                }
                return {
                    done :false,
                    value :this.data[step]
                }
            }
        }
        
    }*/

    public next():IteratorResult<T> {
        if (this.pointer < this.data.length) {
            return {
                done :false,
                value :this.data[this.pointer++]
            }
        }
        else {
            return {
                done :true,
                value :null
            }
        }
    }
}

function isolateAverageSalaryFromString(str:string, pattern:RegExp):number {
    const results = str.matchAll(pattern)
    let salarySum = 0
    let count = 0
    for (let { value: result, done } = results.next(); done === false; {value: result, done} = results.next()) {
        salarySum += Number(result[1])
		count++
    }
    return (salarySum / count)
}

const dateRegex = /(yesterday)|(\d+)(h|d)/gi
function extractDateFromAgoString(str:string):Date {
    let now:Date = new Date()
    const results = str.matchAll(dateRegex)
    for (let { value: result, done } = results.next(); done === false; {value: result, done} = results.next()) {
        if (result[1] === undefined) {
            const numHOrD:number = parseInt(result[2])
            if (result[3] === "h") {
                now.setHours(now.getHours() - numHOrD)
                return now
            }
            else if (result[3] === "d") {
                now.setDate(now.getDate() - numHOrD)
                return now
            }
        }
        else if (result[1] === "yesterday") {
            now.setDate(now.getDate() - 1)
            return now
        }
    }
    return null
}

export {
    isolateAverageSalaryFromString,
    extractDateFromAgoString
}
