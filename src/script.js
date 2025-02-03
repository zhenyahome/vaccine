
const API_URL = '';
const API_TOKEN = '';


let calendarClick = 'no';
let dateCheck = 'no';

const row = document.querySelector(".row"); //родительский контейнер

const buttonKZ = document.querySelector(".button-KZ");
const buttonExt = document.querySelector(".button-ext");
const notCalendarBlock = document.querySelector('.not-calendar-block');

const buttonShow = document.querySelector('.button-show');
const birthDateInput = document.querySelector('.calculator-input');

const blockWarning = document.querySelector('.block-warning');
const pWarning = document.querySelector('.p-warning');

const getRecom = document.querySelector('.getRecom');
const resultDiv = document.querySelector('#result');

let birthDate;

//СБОР ДАННЫХ
//проверка ввода даты рождения (ДОБАВИТЬ ПРОВЕРКУ ДНЕЙ И МЕСЯЦЕВ) и что один из календарей выбран

birthDateInput.addEventListener('input', () => {
    // Проверяем, подходит ли формат под дату (dd.mm.yyyy)
    const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (datePattern.test(birthDateInput.value)) { //если валидация даты - ок
        //проверяем что дата не из будущего и возраст не более 100 лет
        const dateInput = new Date(birthDateInput.value.split('.').reverse().join('-'));
        const dateNow = new Date();
        blockWarning.style.display = 'none'; //убираем предупреждение о неверной дате
        console.log(dateNow - dateInput);
        console.log(calendarClick);
        //console.log(dateNow);

        if ((dateInput <= dateNow) && ((dateNow - dateInput) < 3155760000000)) { //если все проверки по дате прошли
            dateCheck = 'yes';
            fullCheck();
            return;
        } else if (dateInput > dateNow) {
            blockWarning.style.display = 'block';
            pWarning.textContent = 'Год рождения не может быть больше текущего';
            return;
        } else if ((dateNow - dateInput) > 3155760000000) {
            blockWarning.style.display = 'block';
            pWarning.textContent = 'Проверьте год рождения';
            return;
        }
    } else {
        blockWarning.style.display = 'block';
        pWarning.textContent = 'Введите дату в формате ДД.ММ.ГГГГ';
        //появляется предупреждение о неверном формате даты
    }
});

//проверка что один из календарей выбран
//при нажатии одного из календарей второй окрашивается в серый

function calendarCheck (button) {
    calendarClick = 'yes';
    notCalendarBlock.style.display = 'none';

    buttonKZ.style.background = '#528beb'; 
    buttonExt.style.background = '#fff';
    if (button === 'ext') {
        buttonKZ.style.background = '#fff';
        buttonExt.style.background = '#528beb';
    }
    fullCheck();
}

buttonKZ.addEventListener('click', () => {
    calendarCheck('kz');
});

buttonExt.addEventListener('click', () => {
    calendarCheck('ext');
});

//БЛОК выбора графика - по календарю или нагоняющий

//полная проверка перед тем как включить кнопку "Показать"

function fullCheck () {
    birthDate = birthDateInput.value;
    if (calendarClick === 'yes' && dateCheck === 'yes') {
        buttonShow.disabled = false; // Разблокируем кнопку
        buttonShow.style.background = '#528beb'; //меняем цвет кнопки
        console.log(birthDate);
    } else {
        buttonShow.disabled = true; // Отключаем кнопку
        buttonShow.style.background = '#cdcdcd'; 
    }
}



// После нажатия кнопки Показать, выбираем какие вакцины вывести в список в соответствии с возрастом человека
document.querySelector('.button-show').addEventListener('click', async () => {
    document.querySelector('.mark').classList.replace('d-none', 'd-block');

    const dateOfBirth = document.querySelector('.calculator-input').value;
    const day = dateOfBirth.slice(0,2);
    const month = dateOfBirth.slice(3,5);
    const year = dateOfBirth.slice(6,10);
    const date1 = new Date(`${year}-${month}-${day}`);

    const date2 = new Date();

    function calculateYearsAndMonths(date1, date2) {
        let years = date2.getFullYear() - date1.getFullYear();
        let months = date2.getMonth() - date1.getMonth();
        let days = date2.getDate() - date1.getDate();
    
        // Если дни отрицательные, нужно "заимствовать" месяц
        if (days < 0) {
            months -= 1;
            // Количество дней в предыдущем месяце
            const prevMonth = new Date(date2.getFullYear(), date2.getMonth(), 0);
            days += prevMonth.getDate();
        }
    
        // Если месяцы отрицательные, нужно "заимствовать" год
        if (months < 0) {
            years -= 1;
            months += 12;
        }
    
        return { years, months, days };
    };
    
    let { years, months, days } = calculateYearsAndMonths(date1, date2);
    
    console.log(`${years} лет, ${months} месяцев и ${days} дней.`);

    if (years >= 1) {
        months = years * 12 + months;
    }

    if (days >= 1) {
        document.querySelector('.birth').classList.replace('d-none', 'd-flex');
        document.querySelector('.bcj1').classList.replace('d-none', 'd-flex');
    }

    if (days >= 2) {
        document.querySelector('.vgv1').classList.replace('d-none', 'd-flex');
    }

    if ((months >= 2)) {
        document.querySelector('.month2').classList.replace('d-none', 'd-flex');
        document.querySelector('.comb6-2').classList.replace('d-none', 'd-block');
        document.querySelector('.pnevmo2').classList.replace('d-none', 'd-block');
    }

    if ((months >= 3)) {
        document.querySelector('.month3').classList.replace('d-none', 'd-flex');
        document.querySelector('.comb5-3').classList.replace('d-none', 'd-block');
    }

    if ((months >= 4)) {
        document.querySelector('.month4').classList.replace('d-none', 'd-flex');
        document.querySelector('.comb6-4').classList.replace('d-none', 'd-block');
        document.querySelector('.pnevmo4').classList.replace('d-none', 'd-block');
    }

    if ((months >= 12)) {
        document.querySelector('.month12').classList.replace('d-none', 'd-flex');
        document.querySelector('.kkp12').classList.replace('d-none', 'd-block');
        document.querySelector('.pnevmo12').classList.replace('d-none', 'd-block');
    }

    if ((months >= 18)) {
        document.querySelector('.month18').classList.replace('d-none', 'd-flex');
        document.querySelector('.comb5-18').classList.replace('d-none', 'd-block');
    }

    if ((months >= 72)) {
        document.querySelector('.years6').classList.replace('d-none', 'd-flex');
        document.querySelector('.bcj6years').classList.replace('d-none', 'd-block');
        document.querySelector('.kkp6years').classList.replace('d-none', 'd-block');
        document.querySelector('.abkds6years').classList.replace('d-none', 'd-block');
    }

    if ((months >= 192)) {
        document.querySelector('.years16').classList.replace('d-none', 'd-flex');
        document.querySelector('.adsm16years').classList.replace('d-none', 'd-block');
    }

    getRecom.classList.replace('d-none', 'd-block');

    let vaccineDone = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const parent = checkbox.closest('.bcj1'); // Найдем родительский элемент
        
        if (checkbox.checked) {
            const date = document.createElement('input');
            date.type = 'date';
            date.classList.add('date-input');
            parent.append(date); // Добавляем инпут в родительский элемент
            // Если чекбокс отмечен, добавляем его value в массив
            vaccineDone.push(checkbox.value);
        } else {
            // Если чекбокс снят, удаляем его value из массива
            vaccineDone = vaccineDone.filter(value => value !== checkbox.value);
            const dateInput = parent.querySelector('.date-input');
            if (dateInput) {
                dateInput.remove(); // Убираем инпут, если чекбокс снят
            }
        }
            setRequest();
        })
    });

    function setRequest() {
    console.log(birthDate);
    console.log(vaccineDone);
    prompt = `Человек родился ${birthDate}. У него сделаны следующие прививки: ${vaccineDone.toString()}.
    На основе казахстанского календаря вакцинации, какие вакцины он должен сделать? Составь подробную схему.`;

    if (!buttonKZ.disabled) prompt =`Человек родился ${birthDate}. У него сделаны следующие прививки: ${vaccineDone.toString()}.
    // На основе казахстанского календаря вакцинации и, учитывая рекомендованные дополнительные прививки, какие вакцины он должен сделать? Составь подробную схему.`;
    console.log('Формируемый prompt:', prompt);
    }
    
});

let prompt;

    getRecom.addEventListener('click', async () => {
        const headers = {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        };

        const body = {
            inputs: prompt
            // parameters: { max_length: 300, temperature: 0.7 }
        };

        console.log('Отправляемый запрос:', body);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });
        
            if (!response.ok) {
                console.error(`Ошибка сервера: ${response.statusText} (${response.status})`);
                resultDiv.textContent = `Ошибка API: ${response.statusText} (${response.status})`;
                return;
            }
        
            const data = await response.json();
            console.log('Ответ API:', data);
        
            if (data?.[0]?.generated_text) {
                resultDiv.textContent = data[0].generated_text;
            } else {
                console.warn('Данные пусты или отсутствуют в ожидаемом формате:', data);
                resultDiv.textContent = 'Не удалось получить результат.';
            }
        } catch (error) {
            console.error('Ошибка выполнения запроса:', error.message);
            resultDiv.textContent = `Ошибка: ${error.message}`;
        }
    });
