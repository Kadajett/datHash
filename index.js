class DatHash {
    constructor() {
        this.list = [];
    }

    /**
     * O(1 + number of collisions for a hash?)
     * @param {*} x 
     */
    get(x) {
        let result;
        let i = this.hash(x);

        if(!this.list[i]) {
            return undefined;
        }

        this.list[i].forEach(pair => {
            if (pair[0] === x) {
                result = pair[1];
            }
        });

        return result;
    }

    /**
     * O(1)
     * @param {*} x 
     * @param {*} y 
     */
    set(x, y) {
        let i = this.hash(x);
        if(!this.list[i]) {
            this.list[i] = []
        }
        this.list[i].push([x, y]);
    }

    /**
     * O(n)
     * @param {*} key 
     */
    hash(key) {
        let hash = 0;
        if (key.length == 0) {
            return hash;
        }
        for (let i = 0; i < key.length; i++) {
            let char = key.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return -hash;
    }
}

let h = new DatHash();

for (let i = 10; i >= 0; i--) {
    h.set(`element${i}`, i);
}

console.time('with 10 records in the map')
h.get(2)
console.timeEnd('with 10 records in the map')

for (let i = 500000; i >= 0; i--) {
    h.set(`element${i}`, i);
}

console.time('with 5000000 records in the map')
h.get(254000)
console.timeEnd('with 5000000 records in the map')