//

interface SStorage {
    [key: string]: T
}

class LocalStorage<T> {
    private storage : SStorage<T> = {}
    set(key:string, value:T) {
        this.storage[key] = value;
    }
    remove(key:string) {
        delete this.storage[key]
    }
    get(key:string) : T | undefined {
        return this.storage[key]
    }
    clear() {
        this.storage = {}
    }
}

const stringStorage = new LocalStorage<string>();
stringStorage.set("name", "hello");
stringStorage.set("age", "20");
stringStorage.get("name");
stringStorage.remove("age");
stringStorage.clear();

const booleanStorage = new LocalStorage<boolean>();
booleanStorage.set("isLoggedIn", true);
booleanStorage.get("isLoggedIn");

