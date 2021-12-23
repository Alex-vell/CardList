export class CardControl {
    constructor(action, list) {
        this.action = action;
        this.list = list;
    }

    getAddDisplayCard() {
        let allCards = this.action.getAllCards();
        this.list.renderCardsList(allCards, this.deleteCard.bind(this));
    }

    createCard(cardData) {
        let visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
        let masterRegEx = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
        if (masterRegEx.test(cardData.cardNumber) === true || visaRegEx.test(cardData.cardNumber) === true) {
            this.action.saveCard(cardData);
            this.getAddDisplayCard();
        } else {
            alert('incorrect card number');
        }
    }

    deleteCard(cardID) {
        this.action.deleteCardById(cardID);
        this.getAddDisplayCard();
    }

    subscribeFormData() {
        let cardForm = document.getElementById('bankCardForm');
        cardForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.createCard({
                cardNumber: cardForm.cardNumber.value,
                cardNote: cardForm.cardNote.value
            });
            cardForm.reset();
        });
    }
}