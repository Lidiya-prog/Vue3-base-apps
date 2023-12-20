#!/usr/bin/env node
const puppeteer = require('puppeteer');

describe('Button Test', () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			logLevel: 'silent',
		});
		page = await browser.newPage();
		await page.goto('http://localhost:5174/'); // Замените URL на адрес вашего приложения Vue

		// Выполняем запрос к API и дожидаемся загрузки данных
		await page.evaluate(async () => {
			const tasks = await fetch(
				'https://jsonplaceholder.typicode.com/todos'
			).then((res) => res.json());
			window.vm.taskList = tasks.map((task) => ({
				id: task.id,
				completed: false,
				title: task.title,
			}));
		});
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Check if Buttons are Clickable and Measure Time', async () => {
		await page.waitForFunction(() => window.vm.taskList !== null);

		await page.waitForSelector('.check-circle');

		const buttonSelectors = '.check-circle'; // Селектор для всех кнопок
		const buttons = await page.$$(buttonSelectors); // Получаем все кнопки

		const result = [];

		if (buttons.length) {
			await page.evaluate(async () => {
				console.log(window.vm.taskList);
				console.log('hello4');
			});
			// Проходим по каждой кнопке и выполним необходимые действия
			for (let i = 0; i < buttons.length; i++) {
				const button = buttons[i];

				// Засекаем начальное время
				const startTime = performance.now();
				await button.click();

				await page.evaluate(async (index) => {
					window.vm.taskList[index].completed = true;
				}, i);

				// Засекаем конечное время
				const endTime = performance.now();

				// Вычисляем время выполнения операции в миллисекундах
				const executionTime = endTime - startTime;

				await page.evaluate(
					async (time, index) => {
						console.log(`Execution Time for Button ${index + 1}: ${time} ms`);
					},
					executionTime,
					i
				);

				result.push([i + 1, executionTime]);
				// Добавьте проверки, которые соответствуют вашим ожиданиям после клика на каждую кнопку
				// В данном случае, мы ожидаем, что состояние элемента массива будет равно true
				const isTaskCompleted = await page.evaluate((index) => {
					// Здесь index - это индекс текущей кнопки в массиве
					return window.vm.taskList[index].completed;
				}, i);

				expect(isTaskCompleted).toBe(true);
			}

			await page.evaluate(async (res) => {
				console.log(res);
			}, result);
		}
	});
});
