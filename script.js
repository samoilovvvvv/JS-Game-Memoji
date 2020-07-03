document.addEventListener('DOMContentLoaded', function(){
// TODO: время, поворот карточек
const emojis = document.querySelectorAll('.emoji');
const $card = $('.card');

// Заполнение карточек
function randomWrite(){
    let emoji = ['\u{1F4A9}', '\u{1F47B}', '\u{1F436}', '\u{1F98A}', '\u{1F431}', '\u{1F984}', '\u{1F4A9}', '\u{1F47B}', '\u{1F436}', '\u{1F98A}', '\u{1F431}', '\u{1F984}'];
    emojis.forEach(element => {
        let max = emoji.length;
        let index = getRandomInRange(0, max);
        element.textContent = emoji[index];
        emoji.splice(index, 1);
    });
    
}

// Заполнение времени
function timeWrite(){
    $('.minutes').text('00');
    $('.seconds').text('00');
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function playGame(element){
    if($(element).hasClass('card-hidden')){
        openCard(element);
    } else {
        closeCard(element);
    }
}

function openCard(element){

    if($('.card-view').length === 2){

        $('.card-view').each(function(){
            closeCard(this);
        });
    }
    
    $(element)
    .css({
        'transform' : 'rotateY(180deg)'
    });

    setTimeout(function(){
        $(element)
        .removeClass('card-hidden')
        .addClass('card-view')
        .find('.hidden')
        .removeClass('hidden');

        let counter = document.querySelectorAll('.card-view').length;
        
        if(counter === 2){
           comparison();
        }

    }, 200);
}

function closeCard(element){
    $(element)
    .css({
        'transform' : ''
    });

    setTimeout(function(){
        $(element)
        .removeClass('card-view fail not-active')
        .addClass('card-hidden')
        .find('.emoji')
        .addClass('hidden');
    }, 160);
}

// Сравнение карт
function comparison(){
    if($('.card-view').eq(0).text() === $('.card-view').eq(1).text()){

        $('.card-view').each(function(){
            $(this).removeClass('card-view');
            $(this).addClass('success not-active');
        });
    } else {
        $('.card-view').each(function(){
            $(this).addClass('fail not-active');
        });
    }
}

// Таймер
// Получение оставшееся время
function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);

    return {
      'total': t,
      'minutes': minutes,
      'seconds': seconds
    };
  }

// Инициализация часов
  function initializeClock(id, endtime) {
    let clock = document.querySelector(id);
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');
   
    // Обновление часов
    function updateClock() {
      let t = getTimeRemaining(endtime);

      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      

      if($('.success').length === 12){
          clearInterval(timeinterval);
          finishGameSuccess();
      }

      if (t.total <= 0) {
        clearInterval(timeinterval);
        finishGameLoose();
      }
    }
   
    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
  }

// Получение дедлайна
function clock(){
    let deadline = new Date(Date.parse(new Date()) + 60 * 1000);
    initializeClock('.timer', deadline);
}

// Победа
function finishGameSuccess(){
    $('.result').text('Win')
    $('.window')
    .removeClass('hidden')
    .animate({
        opacity: 1
    }, 300, 'swing');

    $('.overlay')
    .removeClass('hidden')
    .animate({
        opacity: 0.5
    }, 300, 'swing');
}

// Поражение
function finishGameLoose(){
    $('.result').text('Lose')
    $('.window')
    .removeClass('hidden')
    .animate({
        opacity: 1
    }, 300, 'swing');

    $('.overlay')
    .removeClass('hidden')
    .animate({
        opacity: 0.5
    }, 300, 'swing');
}

function restartGame(){
    $('.window')
    .animate({
        opacity: 0
    })
    .addClass('hidden');

    $('.overlay')
    .animate({
        opacity: 0
    })
    .addClass('hidden');

    $card.each(function(){
        $(this).removeClass('success');
        closeCard(this);
    });

    $('.result').text('');

    randomWrite();
    timeWrite();
}

// Обработка клика по карте
$card.click(function(){
    if($('.minutes').text() === '00' && $('.seconds').text() === '00') clock();
    playGame(this);
});

// Перезапуск игры
$('.reset').click(restartGame);

randomWrite();
timeWrite();
});