export class Storage {
    constructor(key) {
        this.key = key;
    }

    save(data) {
        window.localStorage.setItem(this.key, JSON.stringify(data));
    }

    get() {
        const data = window.localStorage[this.key];
        return data ? JSON.parse(window.localStorage[this.key]) : null
    }

    removeCardInStorage() {
        window.localStorage.removeItem(this.key);
    }
}
