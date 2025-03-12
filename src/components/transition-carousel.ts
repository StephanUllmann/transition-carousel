import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, query, queryAssignedElements, state, property } from 'lit/decorators.js';

@customElement('transition-carousel')
export class TransitionCarousel extends LitElement {
  @queryAssignedElements({ selector: 'img' })
  images!: Array<HTMLImageElement>;

  @query('#featured')
  _featured!: HTMLDivElement;

  @state()
  featuredImg: HTMLImageElement | null = null;

  @property({ type: Number, reflect: true, attribute: 'interval' })
  intervalDuration = 5000;

  intervalId: ReturnType<typeof setInterval> | null = null;

  static styles: CSSResultGroup = css`
    :host {
      --primary-color: hsl(241, 80%, 61%);

      max-width: var(--max-width, max(50%, 20rem));
      view-transition-name: transition-carousel-image;
      overflow: clip;
      border-radius: var(--border-radius, 2rem);
      border: 2px solid var(--border-color, var(--primary-color));
      padding: 4px;
      outline: 2px solid var(--border-color, var(--primary-color));
      outline-offset: -5px;
      height: var(--height, 25rem);

      *,
      ::slotted(*) {
        box-sizing: border-box;

        ::selection {
          background-color: transparent;
        }
      }
    }

    ::-moz-scrollbar-button,
    ::-webkit-scrollbar-button {
      width: 0px;
    }

    ::slotted(img) {
      width: 100%;
      border-radius: var(--border-radius-sm, 0.5rem);
      cursor: pointer;
    }

    .carousel {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 80% 20%;
      gap: min(1rem, 1cqw);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }

    .image-box {
      margin-inline-end: 10%;
      scrollbar-gutter: stable;
      grid-column: 2 / 3;
      grid-row: 1 / 2;

      display: grid;
      grid-template-rows: 1.5rem 21rem 1.5rem;
      overflow-y: clip;
      container: image-box inline-size;
    }

    .images {
      grid-row: 2 / 3;
      overflow-x: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--scrollbar-color, var(--primary-color)) transparent;
      display: flex;
      flex-direction: column;
      gap: 3cqh;
    }

    #featured {
      height: 100%;
      grid-column: 1/2;
      grid-row: 1/2;
      border-right: 2px solid var(--border-color, var(--primary-color));
    }

    ::slotted(.active) {
      border: 2px solid var(--border-color, var(--primary-color));
      outline: 2px solid var(--border-color, var(--primary-color));
      outline-offset: -4px;
      pointer-events: none;
      cursor: default;
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.images.forEach((img) => img.setAttribute('draggable', 'false'));
    const first = this.images[0];
    this.featuredImg = first.cloneNode(true) as HTMLImageElement;
    first.classList.add('active');
    this.setCarouselInterval();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.intervalId!);
  }

  protected setCarouselInterval() {
    clearInterval(this.intervalId!);
    this.intervalId = setInterval(() => {
      this.findNextImage();
    }, this.intervalDuration);
  }

  protected findNextImage() {
    let currActive = this.images.findIndex((img) => img.classList.contains('active'));
    let nextActive = 0;
    if (currActive !== this.images.length - 1) nextActive = currActive + 1;
    this.handleNextImage(this.images[nextActive]);
  }

  protected handleClick(e: PointerEvent): void {
    const target = e.target as HTMLImageElement;
    if (!target?.matches('img')) return;
    this.handleNextImage(target);
    this.setCarouselInterval();
  }

  protected handleNextImage(target: HTMLImageElement): void {
    this.images.forEach((el) => el.classList.remove('active'));
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        this.featuredImg = target.cloneNode(true) as HTMLImageElement;
      });
    } else {
      this.featuredImg = target.cloneNode(true) as HTMLImageElement;
    }
    target.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  render() {
    return html`<div class="carousel" draggable="false">
      <div id="featured">${this.featuredImg}</div>
      <div class="image-box">
        <div class="images" @click=${this.handleClick}>
          <slot></slot>
        </div>
      </div>
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'transition-carousel': TransitionCarousel;
  }
}
