class HistoryService {
    #history = [];

    constructor() {
        this.isWriting = false;
    }

    getAllHistory() {
        return new Promise((resolve) => {
            if (!this.isWriting) {
                resolve(this.#history);
            } else {
                let counter = 0;
                let timer = setInterval(() => {
                    if(!this.isWriting) {
                        clearInterval(timer);
                        resolve(this.#history);
                    }
                    counter++
                    if (counter > 100) {
                        clearInterval(timer);
                        resolve([]);
                    }
                    
                }, 100);
            }
        });
    }

    getHistoryById(id) {
        return new Promise((resolve) => {
            if (!this.isWriting) {
                const event = this.#history.find(elem => elem.id === id);
                if (event) {
                    return resolve(event);
                } else {
                    return resolve({});
                }
                
            } else {
                let counter = 0;
                let timer = setInterval(() => {
                    if(!this.isWriting) {
                        clearInterval(timer);
                        const event = this.#history.find(elem => elem.id === id);
                        if (event) {
                            return resolve(event);
                        } else {
                            return resolve({});
                        }
                    }
                    counter++
                    if (counter > 100) {
                        clearInterval(timer);
                        resolve({});
                    }
                }, 100);
            }
        });
        
    }

    addEventToHistory(event) {
        return Promise.resolve()
            .then(() => {
                this.isWriting = true;
                return this.#history.push(event);
            })
            .then(() => {
                this.isWriting = false;
                return event;
            })
            .catch((err) => {
                console.log(err);
                this.isWriting = false;
            });
        
    }
}

module.exports = new HistoryService();