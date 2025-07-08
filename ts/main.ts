// Определяем интерфейс для карточки
interface ICard {
  id: number;
  img: string;
  title: string;
  description: string;
}

// Функция создания HTML разметки для одной карточки
function createCard(card: ICard): string {
  return `
    <div class="service__card">
      <img src="${card.img}" alt="Лабораторный Флакон" class="service__flacon-img">
      <div class="service__comment">
        <h2 class="service__card-title">${card.title}</h2>
        <p class="service__card-description">${card.description}</p>
      </div>
    </div>
  `;
}

// Функция отрисовки карточек
function renderCard(data: ICard[]): void {
  const cardListLevelOne = document.querySelector('.service__card-level-1') as HTMLElement;
  const cardListLevelTwo = document.querySelector('.service__card-level-2') as HTMLElement;

  if (!cardListLevelOne || !cardListLevelTwo) {
    console.error('Не найдены контейнеры для карточек');
    return;
  }

  cardListLevelOne.innerHTML = '';
  cardListLevelTwo.innerHTML = '';

  const dataCardLevel1 = data.slice(0, 4);
  const dataCardLevel2 = data.slice(4);

  dataCardLevel1.forEach((card) => {
    cardListLevelOne.insertAdjacentHTML('beforeend', createCard(card));
  });

  dataCardLevel2.forEach((card) => {
    cardListLevelTwo.insertAdjacentHTML('beforeend', createCard(card));
  });

  console.log("Карточки - Уровень 1:\n", dataCardLevel1);
  console.log("Карточки - Уровень 2:\n", dataCardLevel2);
}

// Загрузка данных из JSON
fetch("scripts/cards.json")
  .then(response => {
    if (!response.ok) throw new Error("Ошибка загрузки JSON");
    return response.json();
  })
  .then((data: ICard[]) => {
    renderCard(data);
  })
  .catch(error => console.error("Ошибка при загрузке карточек:", error));

// Инициализация Swiper (через глобальную переменную)
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, доступен ли Swiper глобально
  if ((window as any).Swiper) {
    const slider = new (window as any).Swiper('.swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } else {
    console.warn('Swiper не загружен глобально');
  }
});

// Прелоадер
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    const preloader = document.querySelector('.preloader') as HTMLElement;
    if (preloader) {
      document.body.style.overflow = '';
      preloader.innerHTML = '';
      preloader.style.display = 'none';
    }
  }, 1500);
});

// Модальное окно
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector('.modal') as HTMLElement;
  const form = modal?.querySelector('form') as HTMLFormElement | null;
  const buttonClose = document.querySelector('.form__button-close') as HTMLButtonElement;
  const buttonOpenModal = document.querySelector('.header__nav-button') as HTMLButtonElement;

  function openModal(): void {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal(): void {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    form?.reset();
  }

  buttonOpenModal?.addEventListener('click', openModal);
  buttonClose?.addEventListener('click', closeModal);

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