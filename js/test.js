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
        constructor(title, answer, difficult) {
            this.title = title;
            this.answer = answer;
            this.difficult = difficult;
        }
        checkAnswer(mbAnswer) {
            if(mbAnswer == answer) return true;
            else return false;
        }
    };
    class NumberQuestion extends Question {
        constructor(title, answer, type, difficult) {
            super(title, parseInt(answer), difficult);
            this.type = type;
            this.takenAnswer = parseInt(answer) + ' ' + this.type;
            this.mbAnswers = []
        }
        getMaybeAnswer() {
            let mbAnswer = 0;
            Math.random * 100 % 2 == 0 ?
                mbAnswer = this.answer + Math.round(Math.random() * (Math.random() * 20)) : 
                mbAnswer = this.answer - Math.round(Math.random() * (Math.random() * 20));
            if(mbAnswer <= 0) {
                mbAnswer = this.answer + Math.round(Math.random() * 20);
            }
            for(let key of this.mbAnswers) {
                if(mbAnswer == key) {
                    mbAnswer = parseFloat(this.getMaybeAnswer());
                    this.mbAnswers.splice(this.mbAnswers.indexOf(key, 0), 1) 
                }
            }
            if(mbAnswer == this.answer){
                mbAnswer = parseFloat(this.getMaybeAnswer());
            }
            this.mbAnswers.push(mbAnswer);
            return `${mbAnswer} ${this.type}`;
        }
    };
    class StringQuestion extends Question {
        constructor(title, answer, mbAnswers, difficult) {
            super(title, answer, difficult);
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
    

    function takeTest() {
        let difficult,
            allScore = 0,
            rightScore = 0,
            questions = [
            // easy
            [
                // strings
                new StringQuestion('В какой период было изобретено <br> колесо?', 'Бронзовый век', ['Палеолит', 'Неолит', 'Мезолит'], 0),
                new StringQuestion('В какой период был приручен огонь?', 'Палеолит', ['Бронзовый век', 'Неолит', 'Мезолит'], 0),
                new StringQuestion('В каком регионе зародилась <br> цивилизация?', 'Месопотамия', ['Фракия', 'Греция', 'Америка'], 0),
                new StringQuestion('В какой период появилась <br> демократия?', 'Античность', ['Средние века', 'Дрвений мир', 'Новое время'], 0),
                new StringQuestion('Что называли словом "феод" в <br> средневековье?', 'Земельный надел', ['Короля', 'Военный лагерь', 'Рыцаря'], 'easy'),
                new StringQuestion('В какой период средневековья начали <br> формироваться феодальные отношения?', 'Раннее', ['Среднее', 'Развитое', 'Позднее'], 0),
                new StringQuestion('Где была создана правовая система, <br> на которую мы ориентируемся и сегодня?', 'Древний Рим', ['Дрвеняя Греция', 'Древняя Индия', 'Древний Китай'], 0),
                new StringQuestion('Какое государство завоевало всю <br> территорию, вокруг Средиземного моря?', 'Римская империя', ['Испанская империя', 'Османская империя', 'Британская империя'], 0),
                new StringQuestion('В какой стране зародился Реннесанс?', 'Италия', ['Греция', 'Франция', 'Испания'], 0),
                new StringQuestion('В какой период истории зародился <br> Протетсантизм?', 'Новое время', ['Современность', 'Средневековье', 'Античность'], 0),
                new StringQuestion('Между какими странами проходила <br> "холодная война" в XX веке?', 'США и СССР', ['СССР и Китай', 'США и Китай', 'Китай и Великобритания'], 0),
                new StringQuestion('Какая страна первой использовала <br> ядерную боеголовку в военных целях?', 'США', ['СССР', 'Китай', 'Великобритания'], 0),
                new StringQuestion('Какое государство обладало <br> наибольшей площадью за всю историю?', 'Британская империя', ['Российская империя', 'Испанская империя', 'Монгольнская империя'], 0),
                new StringQuestion('Убийство наследнийка какой страны <br> привело к Первой мировой войне?', 'Австро-Венгрия', ['Германия', 'Франция', 'Великобритания'], 0),
                new StringQuestion('Назовите имя последнего русского царя.', 'Николай', ['Александр', 'Петр', 'Павел'], 0),
                new StringQuestion('Как звали создателя большевистской <br> партии в СССР?', 'В. И. Ленин (Ульянов)', ['И. В. Сталин (Джугашвили)', 'Н. С. Хрущев', 'Л. И. Брежнев'], 0),
            
                // numbers
                new NumberQuestion('Назовите дату первого полета <br> человека в космос.', 1961, 'год'),
                new NumberQuestion('Назовите дату распада СССР.', 1991, 'год'),
                new NumberQuestion('Назовите дату появления Реннесанса.', 14, 'век'),
                new NumberQuestion('Назовите дату образования СССР.', 1922, 'год'),
                new NumberQuestion('Назовите дату начала Первой <br> мировой войны.', 1914, 'год'),
                new NumberQuestion('Назовите дату начала Великой <br> французской революции.', 1789, 'год'),
                new NumberQuestion('Назовите дату начала войны <br> за независимость США.', 1775, 'год'),
                new NumberQuestion('Назовите дату падения <br> Западной Римской империи', 5, 'век н.э.'),
                new NumberQuestion('Назовите дату крещения <br> Руси', 988, 'год'),
                new NumberQuestion('Назовите дату распада <br> Российской империи', 1917, 'год'),
                new NumberQuestion('Назовите дату возникновения <br> Руси', 8, 'век н.э.'),
            ],
            


            // middle
            [
                // strings
                new StringQuestion('Как называлась религия, основанная <br> на обожествлении вещей?', 'Фетишизм', ['Анимизм', 'Тотемизм', 'Буддизм'], 1),
                new StringQuestion('Как называлась религия, основанная <br> на вере в духов?', 'Анимизм', ['Фетишизм', 'Тотемизм', 'Буддизм'], 1),
                new StringQuestion('Как называлась религия, основанная <br> на вере в связь с тотемом?', 'Тотемизм', ['Фетишизм ', 'Анимизм', 'Буддизм'], 1),
                new StringQuestion('В какой период времени появился <br> человек современного вида?', 'Мезолит', ['Палеолит', 'Неолит', 'Бронзовый век'], 1),
                new StringQuestion('В какой период времени люди <br> приручили собак?', 'Мезолит', ['Бронзовый век', 'Неолит', 'Палеолит'], 1),
                new StringQuestion('В каком регионе было найдено <br> древнейшее колесо?', 'Европа', ['Африка', 'Азия', 'Америка'], 1),
                new StringQuestion('В какой период начали формироваться <br> полисные структуры?', '"Темные века"', ['Крито-микенский', 'Архаический', 'Классический'], 1),
                new StringQuestion('В какой период античности начали <br> формироваться идеи гуманизма?', 'Классический', ['Крито-микенский', 'Архаический', '"Темные века"'], 1),
                new StringQuestion('В какой период средневековья произошла <br> вторая пандемия чумы?', 'Позднее', ['Среднее', 'Развитое', 'Раннее'], 1),
                new StringQuestion('В какой период произошло Великое <br> переселение народов?', 'Средневековье', ['Античность', 'Древний мир', 'Новое время'], 1),
                new StringQuestion('В какой период окончилась <br> промышленная революция?', '"Долгий XIX век"', ['Просвещение', 'Раннее новое время', 'Реннесанс'], 1),
                new StringQuestion('Как звали первого русского царя?', 'Иван Грозный', ['Владимир Мономах', 'Борис Годунов', 'Михаил Романов'], 1),
                new StringQuestion('Как звали первого американского <br> президента?', 'Джордж Вашингтон', ['Авраам Линкольн', 'Джон Адамс', 'Томас Джефферсон'], 1),
                new StringQuestion('Как назывался период наиболее <br> массовых сталинских репрессий?', 'Большой террор', ['Коллективизация', 'Продразверстка', 'Период "застоя"'], 1),
                new StringQuestion('Как звали князя - крестителя <br> Руси?', 'Владимир', ['Рюрик', 'Святослав', 'Ярослав'], 1),
                new StringQuestion('Какой корабль первым совершил <br> посадку на Луну?', 'Апполон-11', ['Апполон-12', 'Апполон-10', 'Восток-1'], 1),
                
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
                new NumberQuestion('Назовите продолжительность столетней войны', 116, 'лет'),
            ],
    


            // hard
            [
                // strings
                new StringQuestion('Как звали последнего императора <br> Западной Римской империи?', 'Ромул Август', ['Калигула', 'Юлий Цезарь', 'Октавиан Август'], 2),
                new StringQuestion('Назовите серию вооруженных конфликтов <br> между британскими династиями.', 'Война роз', ['Война пик', 'Война тюльпанов', 'Война справедливости'], 2),
                new StringQuestion('Как назывался пакт о разделе сфер <br> влияния между СССР и Германией?', 'Молотова-Риббентропа', ['Гитлера-Сталина', 'Антикоминтерновский', 'Бриана-Келлога'], 2),
                new StringQuestion('Как звали человека, который был <br> капитаном Апполон-11?', 'Нил Армстронг', ['Майкл Коллинз', 'Базз Олдрин', 'Юрий Гагарин'], 2),
                new StringQuestion('Какому фараону была построена <br> наибольшая пирамида?', 'Хеопсу', ['Хефрену', 'Джосеру', 'Клеопатре'], 2),
                new StringQuestion('Кто доказал, что Х. Колумб открыл <br> Новый Свет?', 'Америго Веспуччи', ['Джеймс Кук', 'Фернан Магеллан', 'Фрэнсис Дрейк'], 2),
                new StringQuestion('Назовите имя человека, <br> открывшего Австралию.', 'Джеймс Кук', ['Христофор Колумб', 'Фернан Магеллан', 'Фрэнсис Дрейк'], 2),
                new StringQuestion('В честь какого полководца немцы <br> назвали план нападения на СССР в 1941?', 'Барбароссы', ['Тамерлана', 'Ганибала', 'Наполеона'], 2),
                new StringQuestion('Где состоялось крупнейшее танковое <br> сражение?', 'Под Прохоровкой', ['Под Сталинградом', 'Под Берлином', 'Под Москвой'], 2),
                new StringQuestion('Как звали инициатора <br> реформации церкви?', 'Мартин Лютер', ['Ганс Таусен', 'Жан Кальвин', 'Ульрих Цвингли'], 2),
                new StringQuestion('Кто первым достиг южного полюса <br> Земли?', 'Руаль Амундсен', ['Роберт Пири', 'Ермак', 'Фридерик Кук'], 2),
                new StringQuestion('Кто первым достиг северного полюса <br> Земли?', 'Роберт Пири', ['Руаль Амундсен', 'Ермак', 'Фернан Магеллан'], 2),
                new StringQuestion('Назовите страну ставшую инициатором <br> Движения Неприсоединения.', 'Индия', ['Вьетнам', 'Египет', 'Южная Африка'], 2),
                new StringQuestion('При каком русском императоре Аляска <br> была продана США?', 'Александр II', ['Петр I', 'Александр III', 'Николай I'], 2),
                new StringQuestion('Кем была создана огромная держава <br> монголов?', 'Чиегизхан', ['Тамерланом', 'Батыем', 'Толуем'], 2),
                new StringQuestion('Назовите страну, в которой зародилась <br> промышленная революция?', 'Великобритания', ['Франция', 'Италия', 'Германия'], 2),
                new StringQuestion('Как звали человека, объединившего <br> Германию?', 'Отто фон Бисмарк', ['Карл V', 'Фридрих I', 'Вильгельм II'], 2),
            
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
                new StringQuestion('Как звали первого главу возрожденного <br> Польского государства?', 'Ю. Пилсудский', ['А. Дуда', 'С. Бандера', 'И. Дашиньский'], 2),
                new StringQuestion('Как называлась политика Наполеона <br> против Великобритании?', 'Континентальная блокада', ['Морская блокада', 'Французская блокада', 'Европейская блокада'], 2),
                new StringQuestion('Во время президентсва какого человека <br> был совершен терракт 9/11?', 'Джордж Буш', ['Барак Обама', 'Гарри Трумэн', 'Рональд Рэйган'], 2),
                new StringQuestion('Во время президентсва какого человека <br> было совершено чудо на реке Ханган?', 'Пак Чон Хи', ['Мун Чжэ Ин', 'Ким Ир Сен', 'Ким Чен Ир'], 2),
                new StringQuestion('Назовите столицу Древнего Египта.', 'Мемфис', ['Каир', 'Александрия', 'Вавилон'], 2),
                new StringQuestion('Назовите имя человека, убившего <br> Франца Фердинанда?', 'Гаврила Принцип', ['Михайло Принцип', 'Владислав Йович', 'Тихомир Йович'], 2),
                new StringQuestion('В какой стране началась Великая <br> Депрессия?', 'США', ['Германия', 'Франция', 'Великобритания'], 2),
                new StringQuestion('Мятеж какого генерала стал поводом <br> гачала гражданской войны в Испании?', 'Франко', ['Максимилиано', 'Маурицио', 'Базилио'], 2),
                new StringQuestion('Назовите внутреннюю полититку <br> РСФСР на время гражданской войны.', 'Военный коммунизм', ['Продналог', 'Большой террор', 'Продразверстка'], 2),
                new StringQuestion('Как звали первого императора <br> Римской империи?', 'Октавиан Август', ['Калигула', 'Юлий Цезарь', 'Ромул Август'], 2),
                new StringQuestion('Как звали первого императора <br> Китая?', 'Цинь Шихуанди', ['Гоминьдан', 'Пу И', 'Сы ман'], 2),
                new StringQuestion('Как звали последнего императора <br> Китая?', 'Пу И', ['Гоминьдан', 'Цинь Шихуанди', 'Сы ман'], 2),
                new StringQuestion('Как звали первого императора <br> Священной Римской империи?', 'Карл I', ['Людовик I', 'Ламберт', 'Беренгар I'], 2),
                new StringQuestion('Назовите перемены в идеологии СССР, <br> которые привели к его распаду?', 'Перестройка', ['Гласность', 'Большой террор', 'Продразверстка'], 2),
                new StringQuestion('Где возник ервый очаг новой мировой <br> войны в 1931 году?', 'Маньчжурия', ['Польша', 'Чехословакия', 'Австрия'], 2),
                new StringQuestion('Как звали первого президента <br> Веймарской республики?', 'Ф. Эберт', ['П. Гинденбург', 'А. Гитлер', 'К. Шлейхер'], 2),
            
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
                changeTest()
                _toggleDisplay(chooseTestDisplay, testDisplay)
            }
        }

        function changeTest() {
            const necessQuestions = questions[difficult];
            let pos = Math.round(Math.random() * (necessQuestions.length - 1)),
                question = necessQuestions[pos];
            if(!question) {
                alert('Поздравляем, вы оветили на все вопросы!');
                closeTest();
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
