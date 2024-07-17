import { ButtonWithPopover } from './widget.js';

document.body.innerHTML = `
  <button id="Button_main" class="button_main">Click me</button>
  <div id="popover" class="popover" style="display: none">
    <div class="popover-header">Popover Header</div>
    <div class="popover-body">Popover Body</div>
  </div>
`;

describe('ButtonWithPopover', () => {
  let button;
  let popover;
  const widget = new ButtonWithPopover();
  widget.initialize()
  button = document.getElementById('Button_main');
  popover = document.getElementById('popover');
  

  test('поповер должен быть скрыт изначально', () => {
    const displayStyle = window.getComputedStyle(popover).display;
    expect(displayStyle).toBe('none');
  });

  test('поповер должен появляться при клике на кнопку', () => {
    button.click();
    const displayStyle = window.getComputedStyle(popover).display;
    expect(displayStyle).toBe('block');
  });

  test('поповер должен правильно позиционироваться относительно кнопки', () => {
    button.click();
    const rect = button.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const expectedLeft = rect.left + (button.offsetWidth / 2) - (popoverRect.width / 2);
    const expectedTop = rect.top - popoverRect.height + window.scrollY;
    expect(popoverRect.left).toBeCloseTo(expectedLeft, 1);
    expect(popoverRect.top).toBeCloseTo(expectedTop, 1);
  });

  test('поповер должен скрываться при втором клике на кнопку', () => {
    button.click(); // Показать поповер
    button.click(); // Скрыть поповер
    const displayStyle = window.getComputedStyle(popover).display;
    expect(displayStyle).toBe('none');
  });

  test('поповер должен скрываться при клике вне его области', () => {
    button.click(); // Показать поповер
    document.body.click(); // Клик вне поповера
    const displayStyle = window.getComputedStyle(popover).display;
    expect(displayStyle).toBe('none');
  });

  test('поповер не должен скрываться при клике внутри него', () => {
    button.click(); // Показать поповер
    popover.click(); // Клик внутри поповера
    const displayStyle = window.getComputedStyle(popover).display;
    expect(displayStyle).toBe('block');
  });
});