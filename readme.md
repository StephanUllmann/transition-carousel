# Transition Carousel

A customizable image carousel web component built with Lit.

## Installation

```bash
npm install @stephanullmann/transition-carousel
```

## Usage

### Import the component in JS

```js
import '@stephanullmann/transition-carousel';
```

### Use in HTML

```html
<transition-carousel style="--height: 25rem;" interval="5000">
  <img src="https://placedog.net/500" />
  <img src="https://placedog.net/400" />
  <img src="https://placedog.net/550" />
  <img src="https://placedog.net/450" />
  <img src="https://placedog.net/300" />
</transition-carousel>
```

### Customize with CSS variables

```css
transition-carousel {
  --max-width: 800px;
  --height: 25rem;
  --border-radius: 1rem;
  --border-radius-sm: 1px; /* for small images */
  --primary-color: blue;
  --border-color: rgba(0, 0, 255, 0.3);
  --scrollbar-color: navy;
}
```

## Properties

| Property         | Attribute | Type   | Default | Description                         |
| ---------------- | --------- | ------ | ------- | ----------------------------------- |
| intervalDuration | interval  | Number | 5000    | Time in ms between auto-transitions |

### License

MIT
