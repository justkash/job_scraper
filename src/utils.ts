export class CustomSet<T> implements Iterator<T> {
    private data : Array<T>
    private pointer : number

    constructor() {
        this.data = new Array<T>()
        this.pointer = 0
    }

    public delete(item: T): boolean {
        const index = this.data.indexOf(item)
        if (index < 0) return false

        this.data = this.data.slice(0, index).concat(this.data.slice(index + 1))
        return true
    }

    public has(item: T): boolean {
        return this.data.some((val) => val === item)
    }

    public size(): number {
        return this.data.length
    }

    public clear(): void {
        this.pointer = 0
        this.data = new Array<T>()
    }

    public forEach(callback: Function): void {
        for (let i = 0; i < this.data.length; ++i) {
            callback(this.data[i], i, this)
        }
    }

    public add(val: T): CustomSet<T> {
        if (this.data.indexOf(val) < 0) this.data.push(val)

        return this
    }

    /* Received the following error from GoogleScript 
       ReferenceError: "Symbol" is not defined.
    */
    /*
    public [Symbol.iterator]() {
        let step = -1
        const iterator = {
            next() {
                step++
                if (step === this.data.length) {
                    return {
                        done : true,
                        value : null
                    }
                }
                return {
                    done : false,
                    value : this.data[step]
                }
            }
        }
        
    }*/

    public next(): IteratorResult<T> {
        if (this.pointer < this.data.length) {
            return {
                done : false,
                value : this.data[this.pointer++]
            }
        }
        else {
            return {
                done : true,
                value : null
            }
        }
    }
}
