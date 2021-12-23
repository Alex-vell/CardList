import {Storage} from '../storage/storage';

const storage = new Storage('Cards');

export class CreateID {
    getId() {
        return Math.random().toString().substr(5, 10)
    }
}

const generate = new CreateID();

export class ActionCards {
    getAllCards() {
        const allCards = storage.get();
        return allCards || []
    }

    saveCard(data) {
        const allCards = this.getAllCards();
        storage.save(allCards.concat({
            ...data,
            id: generate.getId()
        }));
    }

    deleteCardById(id) {
        const allCards = this.getAllCards();
        if (allCards.length > 1) {
            storage.save(allCards.filter(el => el.id !== id));
        } else {
            storage.removeCardInStorage(allCards.filter(el => el.id !== id))
        }
    }
}