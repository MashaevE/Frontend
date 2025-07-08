// Функция создания HTML разметки для одной карточки
function createCard(card) {
    return "\n    <div class=\"service__card\">\n      <img src=\"".concat(card.img, "\" alt=\"\u041B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u043D\u044B\u0439 \u0424\u043B\u0430\u043A\u043E\u043D\" class=\"service__flacon-img\">\n      <div class=\"service__comment\">\n        <h2 class=\"service__card-title\">").concat(card.title, "</h2>\n        <p class=\"service__card-description\">").concat(card.description, "</p>\n      </div>\n    </div>\n  ");
}
// Функция отрисовки карточек
function renderCard(data) {
    var cardListLevelOne = document.querySelector('.service__card-level-1');
    var cardListLevelTwo = document.querySelector('.service__card-level-2');
    if (!cardListLevelOne || !cardListLevelTwo) {
        console.error('Не найдены контейнеры для карточек');
        return;
    }
    cardListLevelOne.innerHTML = '';
    cardListLevelTwo.innerHTML = '';
    var dataCardLevel1 = data.slice(0, 4);
    var dataCardLevel2 = data.slice(4);
    dataCardLevel1.forEach(function (card) {
        cardListLevelOne.insertAdjacentHTML('beforeend', createCard(card));
    });
    dataCardLevel2.forEach(function (card) {
        cardListLevelTwo.insertAdjacentHTML('beforeend', createCard(card));
    });
    console.log("Карточки - Уровень 1:\n", dataCardLevel1);
    console.log("Карточки - Уровень 2:\n", dataCardLevel2);
}
// Загрузка данных из JSON
fetch("scripts/cards.json")
    .then(function (response) {
    if (!response.ok)
        throw new Error("Ошибка загрузки JSON");
    return response.json();
})
    .then(function (data) {
    renderCard(data);
})
    .catch(function (error) { return console.error("Ошибка при загрузке карточек:", error); });
// Инициализация Swiper (через глобальную переменную)
document.addEventListener('DOMContentLoaded', function () {
    // Проверяем, доступен ли Swiper глобально
    if (window.Swiper) {
        var slider = new window.Swiper('.swiper', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    else {
        console.warn('Swiper не загружен глобально');
    }
});
// Прелоадер
document.addEventListener('DOMContentLoaded', function () {
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
        var preloader = document.querySelector('.preloader');
        if (preloader) {
            document.body.style.overflow = '';
            preloader.innerHTML = '';
            preloader.style.display = 'none';
        }
    }, 1500);
});
// Модальное окно
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.querySelector('.modal');
    var form = modal === null || modal === void 0 ? void 0 : modal.querySelector('form');
    var buttonClose = document.querySelector('.form__button-close');
    var buttonOpenModal = document.querySelector('.header__nav-button');
    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        form === null || form === void 0 ? void 0 : form.reset();
    }
    buttonOpenModal === null || buttonOpenModal === void 0 ? void 0 : buttonOpenModal.addEventListener('click', openModal);
    buttonClose === null || buttonClose === void 0 ? void 0 : buttonClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            closeModal();
        });
    }
});
