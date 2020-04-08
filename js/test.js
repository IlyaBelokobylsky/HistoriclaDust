'use strict';
(function() {
    const testElement = document.querySelector('.test'),
        testDisplay = document.querySelector('.test_display'),
        chooseTestDisplay = document.querySelector('.choose-test_display'),
        questNameElem = document.querySelector('.question-name'),
        questList = document.querySelector('.test__answers'),
        continueBtn = document.querySelector('.make-answer-btn'),
        rightScoreEl = document.querySelector('.test__right-score'),
        allScoreEl = document.querySelector('.test__all-score'),
        backBtn = document.querySelector('.back-to-choose-btn');

    
    class Question {
        constructor(title, answer) {
            this.title = title;
            this.answer = answer;
        }
    };
    class NumberQuestion extends Question {
        constructor(title, answer, type) {
            super(title, parseInt(answer));
            this.type = type;
            this.takenAnswer = parseInt(answer) + ' ' + this.type;
            this.mbAnswers = [answer];
            this.range = 20;
        }
        _setMaybeAnswer() {
            const thisObj = this;
            let mbAnswer = this._getRandomNum();
            if(mbAnswer <= 0) {
                mbAnswer = this.answer + Math.round(Math.random() * this.range);
            }
            this.mbAnswers.forEach(function(item) {
                if(item === mbAnswer) {
                    mbAnswer = thisObj._setMaybeAnswer();
                }
                else {
                    thisObj.mbAnswers.push(mbAnswer);
                }
            });
            return mbAnswer;
        }
        getMaybeAnswer() {
            return `${this._setMaybeAnswer()} ${this.type}`;
        }
        _getRandomNum() {
            return Math.random() * 100 % 5 > 2 ?
                    this.answer + Math.round(Math.random() * (Math.random() * this.range)) : 
                    this.answer - Math.round(Math.random() * (Math.random() * this.range));
        }
        reuseMbAnswers() {
            return;
        } 
    };
    class CenturyQuestion extends NumberQuestion {
        constructor(title, answer, type) {
            super(title, answer, type);
            this.range = 5;
        }
    }
    class StringQuestion extends Question {
        constructor(title, answer, mbAnswers) {
            super(title, answer);
            this.takenAnswer = answer;
            this.mbAnswers = [...mbAnswers];
            this.reusableAnswers = [...mbAnswers];
        }
        getMaybeAnswer() {
            const pos = Math.round(Math.random() * (this.mbAnswers.length - 1));
            let mbAnswer = this.mbAnswers[pos];
            this.mbAnswers.splice(pos, 1);
            return mbAnswer;
        }
        reuseMbAnswers() {
            this.mbAnswers = [...this.reusableAnswers];
        }   
    };
    

    function takeTest() {
        let difficult,
            allScore = 0,
            rightScore = 0,
            questions = [
            // easy
            [
                // strings
                new StringQuestion('В какой период было изобретено <br> колесо?', 'Бронзовый век', ['Палеолит', 'Неолит', 'Мезолит']),
                new StringQuestion('В какой период был приручен огонь?', 'Палеолит', ['Бронзовый век', 'Неолит', 'Мезолит']),
                new StringQuestion('В каком регионе зародилась <br> цивилизация?', 'Месопотамия', ['Фракия', 'Греция', 'Америка']),
                new StringQuestion('В какой период появилась <br> демократия?', 'Античность', ['Средние века', 'Дрвений мир', 'Новое время']),
                new StringQuestion('Что называли словом "феод" в <br> средневековье?', 'Земельный надел', ['Короля', 'Военный лагерь', 'Рыцаря']),
                new StringQuestion('Где была создана правовая система, <br> на которую мы ориентируемся и сегодня?', 'Древний Рим', ['Дрвеняя Греция', 'Древняя Индия', 'Древний Китай']),
                new StringQuestion('Какая империя завоевало всю <br> территорию, вокруг Средиземного моря?', 'Римская', ['Испанская', 'Османская', 'Британская']),
                new StringQuestion('В какой стране зародился Реннесанс?', 'Италия', ['Греция', 'Франция', 'Испания']),
                new StringQuestion('В какой период истории зародился <br> Протетсантизм?', 'Новое время', ['Современность', 'Средневековье', 'Античность']),
                new StringQuestion('Между какими странами проходила <br> "холодная война" в XX веке?', 'США и СССР', ['СССР и Китай', 'США и Китай', 'Китай и Япония']),
                new StringQuestion('Какая страна первой использовала <br> ядерную боеголовку в военных целях?', 'США', ['СССР', 'Китай', 'Великобритания']),
                new StringQuestion('Какая империя обладала <br> наибольшей площадью за всю историю?', 'Британская', ['Российская', 'Испанская', 'Монгольнская']),
                new StringQuestion('Убийство наследнийка какой страны <br> привело к Первой мировой войне?', 'Австро-Венгрия', ['Германия', 'Франция', 'Великобритания']),
                new StringQuestion('Назовите имя последнего русского царя.', 'Николай', ['Александр', 'Петр', 'Павел']),
                new StringQuestion('Назовите имя первого человка <br> совершившего полет в космос.', 'Ю. Гагарин', ['Н. Аомстронг', 'Г. Титов', 'В. Терешкова']),
                new StringQuestion('Как звали создателя большевистской <br> партии в СССР?', 'В. И. Ленин', ['И. В. Сталин', 'Н. С. Хрущев', 'Л. И. Брежнев']),
            
                // numbers
                new NumberQuestion('Назовите дату первого полета <br> человека в космос.', 1961, 'год'),
                new NumberQuestion('Назовите дату распада СССР.', 1991, 'год'),
                new CenturyQuestion('Назовите дату появления Реннесанса.', 14, 'век'),
                new NumberQuestion('Назовите дату образования СССР.', 1922, 'год'),
                new NumberQuestion('Назовите дату начала Первой <br> мировой войны.', 1914, 'год'),
                new NumberQuestion('Назовите дату начала Великой <br> французской революции.', 1789, 'год'),
                new NumberQuestion('Назовите дату начала войны <br> за независимость США.', 1775, 'год'),
                new CenturyQuestion('Назовите дату падения <br> Западной Римской империи', 5, 'век н.э.'),
                new NumberQuestion('Назовите дату крещения <br> Руси', 988, 'год'),
                new NumberQuestion('Назовите дату распада <br> Российской империи', 1917, 'год'),
            ],
            


            // middle
            [
                // strings
                new StringQuestion('Как называлась религия, основанная <br> на обожествлении вещей?', 'Фетишизм', ['Анимизм', 'Тотемизм', 'Буддизм']),
                new StringQuestion('Как называлась религия, основанная <br> на вере в духов?', 'Анимизм', ['Фетишизм', 'Тотемизм', 'Буддизм']),
                new StringQuestion('Как называлась религия, основанная <br> на вере в связь с тотемом?', 'Тотемизм', ['Фетишизм ', 'Анимизм', 'Буддизм']),
                new StringQuestion('В какой период времени появился <br> человек современного вида?', 'Мезолит', ['Палеолит', 'Неолит', 'Бронзовый век']),
                new StringQuestion('В какой период времени люди <br> приручили собак?', 'Мезолит', ['Бронзовый век', 'Неолит', 'Палеолит']),
                new StringQuestion('В каком регионе было найдено <br> древнейшее колесо?', 'Европа', ['Африка', 'Азия', 'Америка']),
                new StringQuestion('В какой период начали формироваться <br> полисные структуры?', '"Темные века"', ['Крито-микенский', 'Архаический', 'Классический']),
                new StringQuestion('В какой период античности начали <br> формироваться идеи гуманизма?', 'Классический', ['Крито-микенский', 'Архаический', '"Темные века"']),
                new StringQuestion('В какой период средневековья <br> произошла вторая пандемия чумы?', 'Позднее', ['Среднее', 'Развитое', 'Раннее']),
                new StringQuestion('В какой период произошло Великое <br> переселение народов?', 'Средневековье', ['Античность', 'Древний мир', 'Новое время']),
                new StringQuestion('В какой период окончилась <br> промышленная революция?', '"Долгий XIX век"', ['Просвещение', 'Раннее новое время', 'Реннесанс']),
                new StringQuestion('Как звали первого русского царя?', 'Иван Грозный', ['Владимир Мономах', 'Борис Годунов', 'Михаил Романов']),
                new StringQuestion('Как звали первого американского <br> президента?', 'Джордж Вашингтон', ['Авраам Линкольн', 'Джон Адамс', 'Томас Джефферсон']),
                new StringQuestion('Как назывался период наиболее <br> массовых сталинских репрессий?', 'Большой террор', ['Коллективизация', 'Продразверстка', 'Период "застоя"']),
                new StringQuestion('Как звали князя - крестителя <br> Руси?', 'Владимир', ['Рюрик', 'Святослав', 'Ярослав']),
                new StringQuestion('Какой корабль первым совершил <br> посадку на Луну?', 'Апполон-11', ['Апполон-12', 'Апполон-10', 'Восток-1']),
                
                // numbers
                new NumberQuestion('Назовите дату падения <br> Берлинской стены.', 1989, 'год'),
                new NumberQuestion('Назовите дату окончания <br> гражданской войны в России.', 1922, 'год'),
                new NumberQuestion('Назовите дату открытия <br> Нового Света Колумбом.', 1492, 'год'),
                new NumberQuestion('Назовите дату первого использования <br> ядерного оружия в военных целях.', 1945, 'год'),
                new NumberQuestion('Назовите дату подписания <br> крестьянской реформы.', 1861, 'год'),
                new NumberQuestion('Назовите дату основания <br> Санкт-Петербурга.', 1703, 'год'),
                new NumberQuestion('Назовите дату основания <br> Речи Посполитой.', 1569, 'год'),
                new NumberQuestion('Назовите дату крушения <br> монархии во Франции.', 1792, 'год'),
                new NumberQuestion('Назовите дату Аншлюса <br> Австрии.', 1938, 'год'),
                new NumberQuestion('Назовите дату начала гражданской <br> войны в США.', 1861, 'год'),
                new NumberQuestion('Назовите продолжительность <br> столетней войны', 116, 'лет'),
            ],
    


            // hard
            [
                // strings
                new StringQuestion('Как звали последнего императора <br> Западной Римской империи?', 'Ромул Август', ['Калигула', 'Юлий Цезарь', 'Октавиан Август']),
                new StringQuestion('Назовите серию вооруженных конфликтов <br> между британскими династиями.', 'Война роз', ['Война пик', 'Война тюльпанов', 'Война справедливости']),
                new StringQuestion('Как назывался пакт о разделе сфер <br> влияния между СССР и Германией?', 'Молотова-Риббентропа', ['Гитлера-Сталина', 'Антикоминтерновский', 'Бриана-Келлога']),
                new StringQuestion('Как звали человека, который был <br> капитаном Апполон-11?', 'Нил Армстронг', ['Майкл Коллинз', 'Базз Олдрин', 'Юрий Гагарин']),
                new StringQuestion('Какому фараону была построена <br> наибольшая пирамида?', 'Хеопсу', ['Хефрену', 'Джосеру', 'Клеопатре']),
                new StringQuestion('Кто доказал, что Х. Колумб открыл <br> Новый Свет?', 'Америго Веспуччи', ['Джеймс Кук', 'Фернан Магеллан', 'Фрэнсис Дрейк']),
                new StringQuestion('Назовите имя человека, <br> открывшего Австралию.', 'Джеймс Кук', ['Христофор Колумб', 'Фернан Магеллан', 'Фрэнсис Дрейк']),
                new StringQuestion('В честь какого полководца немцы <br> назвали план нападения на СССР в 1941?', 'Барбароссы', ['Тамерлана', 'Ганибала', 'Наполеона']),
                new StringQuestion('Где состоялось крупнейшее танковое <br> сражение?', 'Под Прохоровкой', ['Под Сталинградом', 'Под Берлином', 'Под Москвой']),
                new StringQuestion('Как звали инициатора <br> реформации церкви?', 'Мартин Лютер', ['Ганс Таусен', 'Жан Кальвин', 'Ульрих Цвингли']),
                new StringQuestion('Кто первым достиг южного полюса <br> Земли?', 'Руаль Амундсен', ['Роберт Пири', 'Ермак', 'Фридерик Кук']),
                new StringQuestion('Кто первым достиг северного полюса <br> Земли?', 'Роберт Пири', ['Руаль Амундсен', 'Ермак', 'Фернан Магеллан']),
                new StringQuestion('Назовите страну ставшую инициатором <br> Движения Неприсоединения.', 'Индия', ['Вьетнам', 'Египет', 'Южная Африка']),
                new StringQuestion('При каком русском императоре Аляска <br> была продана США?', 'Александр II', ['Петр I', 'Александр III', 'Николай I']),
                new StringQuestion('Кем была создана огромная держава <br> монголов?', 'Чингизханом', ['Тамерланом', 'Батыем', 'Толуем']),
                new StringQuestion('Назовите страну, в которой зародилась <br> промышленная революция?', 'Великобритания', ['Франция', 'Италия', 'Германия']),
                new StringQuestion('Как звали человека, объединившего <br> Германию?', 'Отто фон Бисмарк', ['Карл V', 'Фридрих I', 'Вильгельм II']),
            
                // numbers
                new NumberQuestion('Назовите дату объединения <br> Германии.', 1871, 'год'),
                new NumberQuestion('Назовите дату атаки на <br> Перл Харбор.', 1941, 'год'),
                new NumberQuestion('Назовите дату подписания <br> Тройственного пакта.', 1940, 'год'),
                new NumberQuestion('Назовите дату завершения <br> Реконкисты.', 1492, 'год'),
                new NumberQuestion('Назовите дату распада <br> Франкского государства.', 486, 'год н.э.'),
                new NumberQuestion('Назовите дату начала <br> Реформации в Германии.', 1517, 'год'),
                new NumberQuestion('Назовите дату провозглашения <br> Наполеона императором.', 1804, 'год'),
                new NumberQuestion('Назовите дату утверждения <br> Лиги Наций.', 1919, 'год'),
                new NumberQuestion('Назовите дату образования <br> НАТО.', 1949, 'год'),
                new NumberQuestion('Назовите дату образования <br> КНР.', 1949, 'год'),
                new NumberQuestion('Назовите дату "Бостонского чаепития".', 1773, 'год'),
            ],
    


            // extra-hard
            [
                // strings
                new StringQuestion('Как звали первого главу возрожденного <br> Польского государства?', 'Ю. Пилсудский', ['А. Дуда', 'С. Бандера', 'И. Дашиньский']),
                new StringQuestion('Как называлась блокадная политика <br> Наполеона  против Великобритании?', 'Континентальная', ['Морская', 'Французская', 'Европейская']),
                new StringQuestion('Во время президентсва какого человека <br> был совершен терракт 9/11?', 'Джордж Буш', ['Барак Обама', 'Гарри Трумэн', 'Рональд Рэйган']),
                new StringQuestion('Во время президентсва какого человека <br> было совершено чудо на реке Ханган?', 'Пак Чон Хи', ['Мун Чжэ Ин', 'Ким Ир Сен', 'Ким Чен Ир']),
                new StringQuestion('Назовите столицу Древнего Египта.', 'Мемфис', ['Каир', 'Александрия', 'Вавилон']),
                new StringQuestion('Назовите имя человека, убившего <br> Франца Фердинанда?', 'Гаврила Принцип', ['Михайло Принцип', 'Владислав Йович', 'Тихомир Йович']),
                new StringQuestion('В какой стране началась Великая <br> Депрессия?', 'США', ['Германия', 'Франция', 'Великобритания']),
                new StringQuestion('Мятеж какого генерала стал поводом <br> гачала гражданской войны в Испании?', 'Франко', ['Максимилиано', 'Маурицио', 'Базилио']),
                new StringQuestion('Назовите внутреннюю полититку <br> РСФСР на время гражданской войны.', 'Военный коммунизм', ['Продналог', 'Большой террор', 'Продразверстка']),
                new StringQuestion('Как звали первого императора <br> Римской империи?', 'Октавиан Август', ['Калигула', 'Юлий Цезарь', 'Ромул Август']),
                new StringQuestion('Как звали первого императора <br> Китая?', 'Цинь Шихуанди', ['Гоминьдан', 'Пу И', 'Сы ман']),
                new StringQuestion('Как звали последнего императора <br> Китая?', 'Пу И', ['Гоминьдан', 'Цинь Шихуанди', 'Сы ман']),
                new StringQuestion('Как звали первого императора <br> Священной Римской империи?', 'Карл I', ['Людовик I', 'Ламберт', 'Беренгар I']),
                new StringQuestion('Назовите перемены в идеологии СССР, <br> которые привели к его распаду?', 'Перестройка', ['Гласность', 'Большой террор', 'Продразверстка']),
                new StringQuestion('Где возник ервый очаг новой мировой <br> войны в 1931 году?', 'Маньчжурия', ['Польша', 'Чехословакия', 'Австрия']),
                new StringQuestion('Как звали первого президента <br> Веймарской республики?', 'Ф. Эберт', ['П. Гинденбург', 'А. Гитлер', 'К. Шлейхер']),
            
                // numbers
                new NumberQuestion('Назовите дату принятия Петром I <br> императорского титула.', 1721, 'год'),
                new NumberQuestion('Назовите дату начала правления <br> Александра Македонского.', 336, 'год до н.э.'),
                new NumberQuestion('Назовите дату убийства <br> Юлия Цезаря.', 44, 'год до н.э.'),
                new NumberQuestion('Назовите дату взятия Рима <br> вестготами.', 410, 'год'),
                new NumberQuestion('Назовите дату начала первого <br> крестового похода.', 1096, 'год'),
                new NumberQuestion('Назовите дату образования <br> британского парламента.', 1265, 'год'),
                new NumberQuestion('Назовите дату взятия Константинополя <br> османами.', 1453, 'год'),
                new NumberQuestion('Назовите дату революции <br> Мэйдзи в Японии.', 1868, 'год'),
                new NumberQuestion('Назовите дату окончания <br> Крымской войны.', 1856, 'год'),
                new NumberQuestion('Назовите дату завершения <br> Рисорджименто.', 1870, 'год'),
                new NumberQuestion('Назовите дату открытия <br> Суэцкого канала.', 1869, 'год'),
            ]
        ];
        function _changeQuestion(question) {
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

        function _toggleDisplay(dNone, dBlock) {
            dNone.classList.remove('visible');
            dNone.classList.add('hidden');
            setTimeout(() => {
                dNone.classList.add('display-none');
                dBlock.classList.add('visible');
                dBlock.classList.remove('hidden');
            }, 250);
            
            dBlock.classList.remove('display-none');
        }

        function backToChoose() {
            if(testDisplay.classList.contains('display-none')) {
                backBtn.firstElementChild.classList.add('errored');
                
                setTimeout(() => backBtn.firstElementChild.classList.remove('errored'), 500);
                return;
            }
            _toggleDisplay(testDisplay, chooseTestDisplay);
            alert(`Поздравляем, вы набрали ${rightScoreEl.innerText} баллов из ${allScoreEl.innerText}. Отличный результат!`);
        }

        function getDifficult(event) {
            if(!event.target.closest('.difficult__btn')) return;
            let btn = event.target.closest('.difficult__btn');
            difficult = +btn.dataset.difficult;
            let canChange = changeTest();
            if(canChange) {
                _toggleDisplay(chooseTestDisplay, testDisplay)
            }
        }

        let necessQuestions; // closure for reusable launch
        function changeTest() {
            if(!necessQuestions) necessQuestions = [...questions[difficult]];
            let pos = Math.round(Math.random() * (necessQuestions.length - 1)),
                question = necessQuestions[pos];
            if(!question) {
                rightScoreEl.innerText = rightScore;
                allScoreEl.innerText = allScore;
                backToChoose();
                allScore = 0;
                rightScore = 0;
                rightScoreEl.innerText = 0;
                allScoreEl.innerText = 0;
                questions[difficult].forEach(item => item.reuseMbAnswers());
                necessQuestions = null;
                return false;
            }
            necessQuestions.splice(pos, 1);
            _changeQuestion(question);
            return true;
        }

        function continueTest() {
            try {
                const checkedElem = questList.querySelector('input[name="test__answer"]:checked');
                const rightAnswer = questNameElem.dataset.answer;
                if (checkedElem.dataset.answer == rightAnswer) {
                    rightScore++;
                }
                allScore++;
                function toggleOpacity() {
                    testDisplay.classList.toggle('hidden');
                    testDisplay.classList.toggle('visible');
                }
                toggleOpacity();
                setTimeout(function() {
                    checkedElem.checked = false;
                    test.change();
                }, 500)
                setTimeout(toggleOpacity, 500)
            }
            catch(err) {
                continueBtn.classList.add('errored');
                setTimeout(() => continueBtn.classList.remove('errored'), 500)
                return;
            }
        }

        function closeTest() {
            testElement.classList.remove('test-visible');
            alert(`Поздравляем, вы набрали ${rightScoreEl.innerText} баллов из ${allScoreEl.innerText}. Отличный результат!`);
            document.querySelector('header').classList.remove('with-test');
            document.querySelector('main').classList.remove('with-test');
        }

        return {
            getDifficult: getDifficult,
            change: changeTest,
            continue: continueTest,
            close: closeTest,
            backToChoose: backToChoose
        }
    }


    let test = takeTest();
    

    document.querySelector('.take-test-btn').addEventListener('click', function(e) {
        testElement.classList.add('test-visible');
        document.querySelector('header').classList.add('with-test');
        document.querySelector('main').classList.add('with-test');
    })
    document.querySelector('.close-test-btn').addEventListener('click', test.close);

    backBtn.addEventListener('click', test.backToChoose);
    
    document.querySelector('.difficult').addEventListener('click', test.getDifficult);

    continueBtn.addEventListener('click', test.continue);
})();
