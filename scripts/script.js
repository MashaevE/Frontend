// const cards = {
//     card_1: {
//         id: 1,
//         img: "../img/ps_lab.png",
//         title: "Фирменный дизайн",
//         description: "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Со мной все в порядке, но теперь я убираю его в холодильник на Хэллоуин, фанаты."
//     },

//     card_2: {
//         id: 2,
//         img: "../img/ps_lab.png",
//         title: "Фирменный дизайн",
//         description: "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Со мной все в порядке, но теперь я убираю его в холодильник на Хэллоуин, фанаты."
//     },

//     card_3: {
//         id: 3,
//         img: "../img/ps_lab.png",
//         title: "Фирменный дизайн",
//         description: "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Со мной все в порядке, но теперь я убираю его в холодильник на Хэллоуин, фанаты."
//     },

//     card_4: {
//         id: 4,
//         img: "../img/ps_lab.png",
//         title: "Фирменный дизайн",
//         description: "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Со мной все в порядке, но теперь я убираю его в холодильник на Хэллоуин, фанаты."
//     },

//     card_5: {
//         id: 5,
//         img: "../img/ps_lab.png",
//         title: "Фирменный дизайн",
//         description: "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Со мной все в порядке, но теперь я убираю его в холодильник на Хэллоуин, фанаты."
//     },

//     card_6: {
//         id: 6,
//         img: "../img/ps_lab.png",
//         title: "Фирменный дизайн",
//         description: "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Со мной все в порядке, но теперь я убираю его в холодильник на Хэллоуин, фанаты."
//     },
//     card_7: {
//         id: 7,
//         img: "../img/ps_lab.png",
//         title: "Фирменный дизайн",
//         description: "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Со мной все в порядке, но теперь я убираю его в холодильник на Хэллоуин, фанаты."
//     },
//     card_8: {
//         id: 8,
//         img: "../img/ps_lab.png",
//         title: "Фирменный дизайн",
//         description: "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Со мной все в порядке, но теперь я убираю его в холодильник на Хэллоуин, фанаты."
//     }
// }

fetch("scripts/cards.json")
.then (response => response.json())
.then(data =>{
    renderCard(data);
})

function createCard(cards) {
    return `
        <div class="service__card">
                        <img src="${cards.img}" alt="Лабораторный Флакон" class="service__flacon-img">
                        <div class="service__comment">
                            <h2 class="service__card-title">${cards.title}</h2>
                            <p class="service__card-description">${cards.description}</p>
                        </div>
        </div>
    `;
}



function renderCard(data) {
    const cardListLevelOne = document.querySelector('.service__card-level-1');
    const cardListLevelTwo = document.querySelector('.service__card-level-2');

    cardListLevelOne.innerHTML = '';
    cardListLevelTwo.innerHTML = '';

    const dataCardLevel1 = data.slice(0,4);
    const dataCardLevel2 = data.slice(4);


    dataCardLevel1.forEach(card => {
        const cardElement = createCard(card);
        cardListLevelOne.insertAdjacentHTML ('beforeend', cardElement);
    });

    dataCardLevel2.forEach(card => {
        const cardElement = createCard(card);
        cardListLevelTwo.insertAdjacentHTML ('beforeend', cardElement);
    });


    console.log("Карточки - Уровень 1:\n",dataCardLevel1);
    console.log("Карточки - Уровень 2:\n",dataCardLevel2);
}

const slider = new Swiper('.swiper', {
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        document.body.style.overflow = '';
        preloader.innerHTML = '';
        preloader.style.display = 'none';
    }, 1500);

});

document.addEventListener("DOMContentLoaded", function () {


    const modal = document.querySelector('.modal');
    const form = modal.querySelector('form')
    const buttonClose = document.querySelector('.form__button-close');
    const buttonOpenModal = document.querySelector('.header__nav-button');

    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        form.reset();
    }

    buttonOpenModal.addEventListener('click', openModal);

    buttonClose.addEventListener('click', closeModal);

    modal.addEventListener('click', function (event) {

        if (event.target === modal) {
            closeModal();
        }
    });

    modal.addEventListener('submit', function (event) {
        event.preventDefault();
        closeModal();

    });

});
