export default () => {
  class AccentTypographyBuild {
    constructor(elementSelector,
        timer,
        classForActivate,
        property) {
      this._TIME_SPACE = 100;

      this._elementSelector = elementSelector;
      this._timer = timer;
      this._classForActivate = classForActivate;
      this._property = property;
      this._element = document.querySelector(this._elementSelector);
      this._timeOffset = Math.round(Math.random() * 800);

      this.prepareText();
    }

    createElement(letter) {
      const span = document.createElement(`span`);
      span.textContent = letter;
      span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
      this._timeOffset = Math.round(Math.random() * 800);
      return span;
    }

    prepareText() {
      if (!this._element) {
        return;
      }
      const text = this._element.textContent.trim().split(` `).filter((letter) => letter !== ``);

      const content = text.reduce((fragmentParent, word) => {
        const wordElement = Array.from(word).reduce((fragment, letter) => {
          fragment.appendChild(this.createElement(letter));
          return fragment;
        }, document.createDocumentFragment());
        const wordContainer = document.createElement(`span`);
        wordContainer.classList.add(`accent-typo__word`);
        wordContainer.appendChild(wordElement);
        fragmentParent.appendChild(wordContainer);
        return fragmentParent;
      }, document.createDocumentFragment());

      this._element.innerHTML = ``;
      this._element.appendChild(content);
    }

    runAnimation() {
      if (!this._element) {
        return;
      }
      this._element.classList.add(this._classForActivate);
    }

    destroyAnimation() {
      this._element.classList.remove(this._classForActivate);
    }
  }

  const animationTopScreenTextLine = new AccentTypographyBuild(`.intro__title`, 500, `active`, `transform`);
  const animationTopScreenDate = new AccentTypographyBuild(`.intro__date`, 500, `active`, `transform`);
  setTimeout(() => {
    animationTopScreenTextLine.runAnimation();
  }, 500);
  setTimeout(() => {
    animationTopScreenDate.runAnimation();
  }, 1000);
};
