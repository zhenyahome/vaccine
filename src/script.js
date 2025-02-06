
const API_URL = '';
const API_TOKEN = '';


let calendarClick = 'no';
let dateBirthCheck = 'no';

const row = document.querySelector(".row"); //родительский контейнер

const buttonKZ = document.querySelector(".button-KZ");
const buttonExt = document.querySelector(".button-ext");
const notCalendarBlock = document.querySelector('.not-calendar-block');

const buttonShow = document.querySelector('.button-show');
const birthInput = document.querySelector('.calculator-input');

const blockWarning = document.querySelector('.block-warning');
const pWarning = document.querySelector('.p-warning');

const getRecom = document.querySelector('.getRecom');
const resultDiv = document.querySelector('#result');

const dateNow = new Date();
console.log(dateNow);

//СБОР ДАННЫХ
//проверка ввода даты рождения (ДОБАВИТЬ ПРОВЕРКУ ДНЕЙ И МЕСЯЦЕВ) и что один из календарей выбран

birthInput.addEventListener('change', () => {
    const birthValue = birthInput.value;
    const dateOfBirth = new Date(birthValue);
    console.log(dateOfBirth);
    // Проверяем, подходит ли формат под дату (dd.mm.yyyy)
    // const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
    // if (datePattern.test(birthInput.value)) { //если валидация даты - ок
    //     //проверяем что дата не из будущего и возраст не более 100 лет
    //     blockWarning.style.display = 'none'; //убираем предупреждение о неверной дате
    //     console.log(dateNow - dateOfBirth);
    //     console.log(calendarClick);
    //     //console.log(dateNow);
    console.log((dateNow - dateOfBirth) < 3155760000000);
    console.log(dateOfBirth <= dateNow);
    console.log(((dateOfBirth <= dateNow) && ((dateNow - dateOfBirth) < 3155760000000)));


        if ((dateOfBirth <= dateNow) && ((dateNow - dateOfBirth) < 3155760000000)) { //если все проверки по дате прошли
            dateBirthCheck = 'yes';
            fullCheck();
            return;
        } else if (dateOfBirth > dateNow) {
            blockWarning.style.display = 'block';
            pWarning.textContent = 'Год рождения не может быть больше текущего';
            return;
        } else if ((dateNow - dateOfBirth) > 3155760000000) {
            blockWarning.style.display = 'block';
            pWarning.textContent = 'Проверьте год рождения';
            return;
        }
    // } else {
    //     blockWarning.style.display = 'block';
    //     pWarning.textContent = 'Введите дату в формате ДД.ММ.ГГГГ';
    //     //появляется предупреждение о неверном формате даты
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
    if (calendarClick === 'yes' && dateBirthCheck === 'yes') {
        buttonShow.disabled = false; // Разблокируем кнопку
        buttonShow.style.background = '#528beb'; //меняем цвет кнопки
        console.log(birthInput.value);
    } else {
        buttonShow.disabled = true; // Отключаем кнопку
        buttonShow.style.background = '#cdcdcd'; 
    }
}



// После нажатия кнопки Показать, выбираем какие вакцины вывести в список в соответствии с возрастом человека
document.querySelector('.button-show').addEventListener('click', async () => {
    document.querySelector('.mark').classList.replace('d-none', 'd-block');

    const day = birthInput.value.slice(0,2);
    const month = birthInput.value.slice(3,5);
    const year = birthInput.value.slice(6,10);
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

    if (days >= 1 || months >= 1 || years >= 1) {
        document.querySelector('.birth').classList.replace('d-none', 'd-flex');
        document.querySelector('.bcj1').classList.replace('d-none', 'd-flex');
    }

    if (days >= 2 || months >= 1 || years >= 1) {
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

    let vaccineDone = []; // переделать на объект
    //при отметке вакцины появляется инпут для ввода даты вакцинации
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const parent = checkbox.closest('.vac'); //родительский элемент
        
        if (checkbox.checked) {
            const checkboxDataset = parent.dataset.name;
            console.log(checkboxDataset); 
            const vaccineDateInput = document.createElement('input');
            vaccineDateInput.type = 'date';
            vaccineDateInput.classList.add('date-input');
            parent.append(vaccineDateInput); 
            let vaccineDateCheck = 'no';
            const birthValue = birthInput.value;
            const dateOfBirth = new Date(birthValue.split('.').reverse().join('-'));

            vaccineDateInput.addEventListener('change', () => {
                console.log(vaccineDateInput.value);
                const dateOfVaccine = new Date(vaccineDateInput.value);
                console.log(dateOfBirth);
                console.log(dateOfVaccine);
                console.log(dateOfVaccine >= dateOfBirth);
                console.log(dateOfVaccine < dateNow);


                if (dateOfVaccine <= dateOfBirth || dateOfVaccine > dateNow) { //проверка даты когда ставили прививку
                    vaccineDateInput.classList.add("error"); 
                } else {
                    vaccineDateCheck = 'yes';
                    vaccineDateInput.classList.remove("error"); 
                }
            })

            vaccineDateInput.addEventListener('blur', () => {
                if (vaccineDateCheck === 'yes') {
                    //setRequest();
                }
            })


            // Если чекбокс отмечен, добавляем его value в массив
        } else {
            // Если чекбокс снят, удаляем его value из массива
            vaccineDone = vaccineDone.filter(value => value !== checkbox.value);
            const dateOfBirth = parent.querySelector('.date-input');
            if (dateOfBirth) {
                dateOfBirth.remove(); // Убираем инпут, если чекбокс снят
            }
        }
        })
    });

    function setRequest() {
    console.log(birthInput.value);
    console.log(vaccineDone);
    let prompt = `Человек родился ${birthInput.value}. У него сделаны следующие прививки: ${vaccineDone.toString()}.
    На основе казахстанского календаря вакцинации, какие вакцины он должен сделать? Составь подробную схему.`;

    if (!buttonKZ.disabled) prompt =`Человек родился ${birthInput.value}. У него сделаны следующие прививки: ${vaccineDone.toString()}.
    // На основе казахстанского календаря вакцинации и, учитывая рекомендованные дополнительные прививки, какие вакцины он должен сделать? Составь подробную схему.`;
    console.log('Формируемый prompt:', prompt);

    getRecom.addEventListener('click', function () {
        console.log("Отправка запроса к ИИ...");
    
        fetch('https://jsonplaceholder.typicode.com/posts/1') 
            .then(response => response.json())
            .then(data => {
                console.log("Ответ ИИ:", data.body); 
            })
            .catch(error => {
                console.error("Ошибка запроса:", error);
            });
    })
};
});




