# Transition Carousel

A customizable image carousel web component built with Lit.

## Installation

```bash
npm install @sullmann/transition-carousel
```

## Usage

### Import the component in JS

```js
import '@sullmann/transition-carousel';
```

### Use in HTML

```html
<transition-carousel interval="5000">
  <img src="path/to/image1.jpg" />
  <img src="path/to/image2.jpg" />
  <img src="path/to/image3.jpg" />
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
