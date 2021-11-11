var letterBox = document.getElementById('letterBox'),
    correctBox = document.getElementById('correctBox'),
    errorCountBox = document.getElementById('errorCountBox'),
    audio = document.querySelector('audio'),
    typewriter = document.querySelector('#typewriter'),
    wrong = document.querySelector('#wrong'),
    kbd = document.querySelector('#kbdImg'),
    kbdInput = document.querySelector('#toggleKbd'),
    enInput = document.querySelector('#en'),
    ruInput = document.querySelector('#ru'),
    helpBtn = document.querySelector('#helpBtn'),
    okBtn = document.querySelector('#okBtn'),
    helpMsg = document.querySelector('#helpMsg'),
    letters = {
      en: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'q', 'u', 'v', 'w'],
      ru: ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я']
    },
    language = letters.en,
    currentLetter = '',
    errorCount = 0,
    correctCount = 0;

// ToDo
// * Добавить русский алфавит
// * Добавить возможность переключения между языками
// * Добавить счетчик успешных нажатий и ошибок
// * Добавить возможность показать убрать клавиатуру
// Сделать режим в котором буквы будут показываться в виде слайдера
// Сделать так чтобы при обновлении окна значения счетчиков сохранялись
// * Добавить звуки при нажатии и при ошибке
// Сделать возможным включение и отключение звуков
// * Добавить подробное описание
// Добавить меню настроек
// Сделать отображение нажимаемых клавиш на экранной клавиатуре
// Рефакторинг кода в ООП MVC стиле
// Не слушать функциональные клавиши
// Сделать один eventlistener со свитчем
// Создать репозиторий на гитхабе
// Загрузить приложение на свой сайт
// Опубликовать ссылку на своей странице вк

// Change language
function changeLang() {

  if (language === letters.en) {

    language = letters.ru;

  } else {

    language = letters.en;

  }

  showLetter();

}

// Show modal
function showHelp(e) {

  e.preventDefault();
  helpMsg.showModal();

}

// Function that toggles keyboard image
function toggleKbd() {

  kbd.classList.toggle('d-n');

}

// Listen to help btn
helpBtn.addEventListener('click', showHelp);

// Listen to ok btn
okBtn.addEventListener('click', () => helpMsg.close());

// Listen to togle keyboard
kbdInput.addEventListener('change', toggleKbd);

// Listen to language radio
enInput.addEventListener('change', changeLang);
ruInput.addEventListener('change', changeLang);

// Show random letter from array
function showLetter() {
  
  currentLetter = language[Math.floor(Math.random() * (language.length))];
  letterBox.innerHTML = currentLetter;

}

window.addEventListener('DOMContentLoaded', function() {
  
  showLetter();
  letterBox.innerHTML = currentLetter;
  correctBox.innerHTML = 'Correct: ' + correctCount;
  errorCountBox.innerHTML = 'Errors: ' + errorCount;
  
});

window.addEventListener('keydown', function(e) {

  // set sound volume
  audio.volume = 0.1;
  // rewind sound
  audio.currentTime = 0;

//   check pressed key
  if (e.key == currentLetter) {
    // play typewriter sound
    typewriter.play();
    letterBox.classList.remove('c-error');
    letterBox.classList.add('c-success');
    correctCount++;
    showLetter();
  } else {
    // play wrong answer sound
    // wrong.play();
    letterBox.classList.remove('c-success');
    letterBox.classList.add('c-error');
    errorCount++;
  }
});

function removeTransition(e) {

  if ( e.propertyName !== 'transform' ) {return};

  this.classList.remove('c-error');
  this.classList.remove('c-success');

}

letterBox.addEventListener('transitionend', removeTransition);

window.addEventListener('keyup', function(e) {
  
  correctBox.innerHTML = 'Correct: ' + correctCount;
  errorCountBox.innerHTML = 'Errors: ' + errorCount;

});