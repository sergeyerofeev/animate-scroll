/*Создаём флаг запрета повторного запуска функции анимации прокрутки*/
var flagAnimate = false;
/*Модуль прокрутки веб-страницы*/
var animateScroll = (function(){
  /*Интервал и период по умолчанию*/
  var intervalDef = 50, periodDef = 20;
  /*Главная функция*/
  function main(event){
    /*Получаем целевой элемент, элемент содержащий атрибут data-scroll*/
    var target = event.target;
    /*Выходим из обработчика если: у элемента нет атрибута data-scroll, установлен флаг flagAnimate*/
    if(!target.hasAttribute('data-scroll') || flagAnimate) return;
    flagAnimate = true;
    /*Получаем массив который включает: 
    [0] id элемента до которого необходимо прокрутить страницу, 
    [1] интервал в px и 
    [2] период в мс*/
    var arrayOption = target.getAttribute('data-scroll').split(' ', 3); 
    var element = document.getElementById(arrayOption[0]);
    var interval = (arrayOption[1])? Math.abs(parseInt(arrayOption[1], 10)): intervalDef;
    var period = (arrayOption[2])? Math.abs(parseInt(arrayOption[2], 10)): periodDef;
    /*Получаем расстояние от верхней границы документа до элемента, id которого указан в атрибуте data-scroll*/     
    var elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    /*Определяем направление прокрутки*/  
    var direction = elementTop > window.pageYOffset? interval: ~interval+1;

    var timer;
    /*В oldOffset храним старое значение прокрутки, для защиты от случая, когда высота страницы не достаточна 
    для того чтобы элемент занял верхнее положение в окне браузера*/
    var oldOffset = ~interval+1;
    /*Если флаг flagArea равен true, то прокрутка в окрестности элемента*/
    var flagArea = false;
    /*Запускаем анимацию прокрутки*/
    (function scroll(){
      /*Текущая прокрутка*/
      var currentOffset = window.pageYOffset;
      var range = elementTop - currentOffset;
      var result = Math.abs(range);
        if(result > 0 && currentOffset !== oldOffset) {
          /*Две первые проверки if нужны в случае когда происходить движение к элементу и пользователь совершил скроллинг*/
          if((range > 0 && direction < 0) || (range < 0 && direction > 0))
            /*Проверяем направление прокрутки, из-за вмешательства пользователя, возможно, требуется изменить направление*/
            direction = ~direction+1;
          if(flagArea){
            /*Находились в окрестности верхней границы элемента, но пользователь прокрутил страницу*/
            flagArea = false;
            direction = (direction > 0)? interval: ~interval+1;
          }         
          if(interval > result){
            /*Находимся около верхней границы элемента, уменьшаем direction, чтобы точно выставить элемент*/
            direction = (direction > 0)? result: ~result+1;
            flagArea = true;
          }
          oldOffset = currentOffset;
          window.scrollBy(0, direction);        
          timer = setTimeout(scroll, period);
        } else {
          clearTimeout(timer);
          /*Анимация завершена, сбрасываем флаг*/
          flagAnimate = false;
        }
    })(); 
  }

  /*Задаём/получаем параметры прокрутки по умолчанию*/
  Object.defineProperty(main, 'option', {
    set: function(obj_data){
      /*В случае задания не цифровых данных возвращаемся к значениям interval = 50, period = 20*/
      'interval' in obj_data && (intervalDef = Math.abs(parseInt(obj_data.interval, 10)) || 50); 
      'period' in obj_data && (periodDef = Math.abs(parseInt(obj_data.period, 10)) || 20);
    },
    get: function(){
      return {
        interval: intervalDef,
        period: periodDef
      };
    }
  });

  return main;
})();

/*Устанавливаем обработчик события 'click' на document*/
document.addEventListener('click', animateScroll);
