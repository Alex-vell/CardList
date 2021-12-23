

(function () {
    'use strict';

    class CreateID {
        getId() {
            return Math.random().toString().substr(5, 10)
        }
    }

    class Storage {
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

    const storage = new Storage('Cards');
    const generate = new CreateID();

    class ActionCards {
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

    class CardDisplay {

        createCard(cardData) {
            const cardElement = document.createElement('div');
            cardElement.setAttribute('id', cardData.id);
            cardElement.className = 'card';
            const setImg = (cardNumber) => {

                if (cardNumber[0] == 5) {
                    return 'assets/img/master-card.svg'
                }
                if (cardNumber[0] == 4) {
                    return 'assets/img/visa.svg'
                }
            };

            cardElement.innerHTML = `
             <div class = "card_remove" >
                <img src = "assets/img/delete.svg" class = "img_remove" alt = "dellete" data-card_id = "${cardData.id}"/>
             </div>
             <p class = "card_number" > ${cardData.cardNumber}</p>  
             <div class="comment_logoCard">
                <p class = "card_comment" > ${cardData.cardNote} </p>
                <img class = "card_logo" src = ${setImg(cardData.cardNumber)} alt = "card"/>
             </div>`;

            return cardElement
        }

        renderCardsList(allCards = [], deleteCard) {
            let content;
            if (allCards.length) {
                content = document.createElement('div');
                content.className = 'cards';

                allCards.forEach(el => {
                    content.prepend(this.createCard(el));
                });
                content.addEventListener('click', event => {
                    let target = event.target;
                    let cardId = target.dataset.card_id;
                    if (cardId && confirm('remove the card?')) {
                        deleteCard(cardId);
                    }
                });
            } else {
                content = document.createElement('div');
                content.className = 'cards';
                content.innerHTML = '<p>You don\'t have any cards yet</p>';
            }
            let cardsContainer = document.querySelector('.cardsContainer');
            cardsContainer.innerHTML = '';
            cardsContainer.prepend(content);
        }

    }

    class CardControl {
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

    let moduleCards = new ActionCards;
    let cardView = new CardDisplay;
    let cardControl = new CardControl(moduleCards, cardView);

    cardControl.getAddDisplayCard();
    cardControl.subscribeFormData();

}());
