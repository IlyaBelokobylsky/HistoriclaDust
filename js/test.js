'use strict';
(function() {
    const testElement = document.querySelector('.test'),
        questNameElem = document.querySelector('.question-name'),
        questList = document.querySelector('.test__answers'),
        continueBtn = document.querySelector('.make-answer-btn'),
        rightScoreEl = document.querySelector('.test__right-score'),
        allScoreEl = document.querySelector('.test__all-score');

    let allScore = 0,
        rightScore = 0;
    function closeTest() {
        testElement.classList.remove('test-visible');
        alert(`Поздравляем, вы набрали ${rightScoreEl.innerText} баллов из ${allScoreEl.innerText}. Отличный результат!`);
        document.querySelector('header').classList.remove('with-test');
        document.querySelector('main').classList.remove('with-test');
    }
    document.querySelector('.take-test-btn').addEventListener('click', function(e) {
        testElement.classList.add('test-visible');
        document.querySelector('header').classList.add('with-test');
        document.querySelector('main').classList.add('with-test');
    })
    document.querySelector('.close-test-btn').addEventListener('click', closeTest)



    class Question {
        constructor(title, answer) {
            this.title = title;
            this.answer = answer;
        }
        checkAnswer(mbAnswer) {
            if(mbAnswer == answer) return true;
            else return false;
        }
    };
    class NumberQuestion extends Question {
        constructor(title, answer, type) {
            super(title, parseInt(answer));
            this.takenAnswer = answer;
            this.type = type
        }
        getMaybeAnswer() {
            let mbAnswer;
            Math.random * 100 % 2 == 0 ?
                mbAnswer = this.answer + Math.round(Math.random() * 10) : 
                mbAnswer = this.answer - Math.round(Math.random() * 10);
            mbAnswer += ' ' + this.type;
            return mbAnswer;
        }
    };
    class StringQuestion extends Question {
        constructor(title, answer, mbAnswers) {
            super(title, answer);
            this.takenAnswer = answer;
            this.mbAnswers = mbAnswers;
        }
        getMaybeAnswer() {
            const pos = Math.round(Math.random() * (this.mbAnswers.length - 1));
            let mbAnswer = this.mbAnswers[pos];
            this.mbAnswers.splice(pos, 1);
            return mbAnswer;
        }   
    };

    

    let questions = [
        // strings
        // religions
        new StringQuestion('Как называлась древняя религия, <br> основанная на обожествлении вещей?', 'Фетишизм', ['Анимизм', 'Тотемизм', 'Буддизм']),
        new StringQuestion('Как называлась древняя религия, <br> основанная на вере в духов?', 'Анимизм', ['Фетишизм', 'Тотемизм', 'Буддизм']),
        new StringQuestion('Как называлась древняя религия, <br> основанная на вере в связь с тотемом?', 'Тотемизм', ['Фетишизм ', 'Анимизм', 'Буддизм']),
        
        // ancient
        new StringQuestion('В какой период времени появился <br> человек современного вида?', 'Мезолит', ['Палеолит', 'Неолит', 'Бронзовый век']),
        new StringQuestion('В какой период было изобретено <br> колесо?', 'Бронзовый век', ['Палеолит', 'Неолит', 'Мезолит']),
        new StringQuestion('В какой период был приручен огонь?', 'Палеолит', ['Бронзовый век', 'Неолит', 'Мезолит']),
        new StringQuestion('В какой период времени люди <br> приручили собак?', 'Мезолит', ['Бронзовый век', 'Неолит', 'Палеолит']),
        new StringQuestion('В каком регионе было найдено <br> древнейшее колесо?', 'Европа', ['Африка', 'Азия', 'Америка']),
        new StringQuestion('В каком регионе зародилась <br> цивилизация?', 'Месопотамия', ['Фракия', 'Греция', 'Америка']),
        
        // antiquity
        new StringQuestion('В какой период античности начали <br> формироваться полисные структуры?', '"Темные века"', ['Крито-микенская эпоха', 'Архаическая Греция', 'Классическая Греция']),
        new StringQuestion('В какой период античности начали <br> формироваться идеи гуманизма?', 'Классическая Греция', ['Крито-микенская эпоха', 'Архаическая Греция', '"Темные века"']),
        new StringQuestion('В какой период появилась <br> демократия?', 'Античность', ['Средние века', 'Дрвений мир', 'Новое время']),
        new StringQuestion('Как звали последнего императора <br> Западной Римской империи?', 'Ромул Август', ['Калигула', 'Юлий Цезарь', 'Октавиан Август']),
        new StringQuestion('Где была создана правовая система, <br> на которую мы ориентируемся и сегодня?', 'Древний Рим', ['Дрвеняя Греция', 'Древняя Индия', 'Древний Китай']),

        // middle ages
        new StringQuestion('В какой период средневековья начали <br> формироваться феодальные отношения?', 'Раннее', ['Среднее', 'Развитое', 'Позднее']),
        new StringQuestion('В какой период произошло Великое <br> переселение народов?', 'Средневековье', ['Античность', 'Древний мир', 'Новое время']),

        // other
        new StringQuestion('Какое государство завоевало всю <br> территорию, вокруг Средиземного моря?', 'Римская империя', ['Испанская империя', 'Османская империя', 'Британская империя']),
        
    ];

    function changeTest() {
        let pos = Math.round(Math.random() * (questions.length - 1)),
            question = questions[pos];
        if(!question) {
            closeTest();
        }
        questions.splice(pos, pos);
        rightScoreEl.innerText = rightScore;
        allScoreEl.innerText = allScore;

        const rightAnswerPos = Math.floor(Math.random() * questList.children.length);
        questNameElem.innerHTML = question.title;
        questNameElem.dataset.answer = question.takenAnswer;
        [].forEach.call(questList.children, function(item){
            let lable = item.lastElementChild,
                input = item.firstElementChild;
            if (item == questList.children[rightAnswerPos]) {
                lable.innerText = question.takenAnswer;
            } else {
                lable.innerText = question.getMaybeAnswer();
            }
            input.dataset.answer = lable.innerText;
        })
    }
    changeTest();


    continueBtn.addEventListener('click', function(e) {
        try {
            const checkedElem = questList.querySelector('input[name="test__answer"]:checked');
            const rightAnswer = questNameElem.dataset.answer;
            if (checkedElem.dataset.answer == rightAnswer) {
                rightScore++;
            }
            allScore++;
            function toggleOpacity() {
                questNameElem.classList.toggle('hidden');
                questNameElem.classList.toggle('visible');

                questList.classList.toggle('hidden');
                questList.classList.toggle('visible');
            }
            toggleOpacity();
            setTimeout(function() {
                checkedElem.checked = false;
                changeTest();
            }, 500)
            setTimeout(toggleOpacity, 750)
        }
        catch {
            continueBtn.classList.add('not-answered');
            setTimeout(() => continueBtn.classList.remove('not-answered'), 500)
            return;
        }
        
    });
})();
