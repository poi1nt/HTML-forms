import './widget.css';

class ButtonWithPopover {
  constructor() {
    document.addEventListener('DOMContentLoaded', this.initialize.bind(this));
  }

  initialize() {
    const button = document.getElementById('Button_main');
    const popover = document.getElementById('popover');

    button.addEventListener('click', () => {
      if (popover.style.display === 'none' || popover.style.display === '') {
        popover.style.display = 'block';
        const rect = button.getBoundingClientRect();
        const popoverWidth = popover.offsetWidth;
        const popoverHeight = popover.offsetHeight;
        const buttonWidth = button.offsetWidth;
        const left = rect.left + (buttonWidth / 2) - (popoverWidth / 2);
        const top = rect.top - popoverHeight + window.scrollY;
        popover.style.left = `${left}px`;
        popover.style.top = `${top}px`;

      } else {
        popover.style.display = 'none';
      }
    });


    document.addEventListener('click', (event) => {
      if (!button.contains(event.target) && !popover.contains(event.target)) {
        popover.style.display = 'none';
      }
    });
  }
}

export { ButtonWithPopover };
