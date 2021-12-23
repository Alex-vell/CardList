
export class CardDisplay {

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
