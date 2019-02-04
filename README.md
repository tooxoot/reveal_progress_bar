# reveal_progress_bar

This repository contains a [reveal.js](https://revealjs.com/) plugin.
The plugin generates a progress bar containing the presentation's agenda, which is displayed at the top of each slide.

### Initialization

```javascript
{
    src: 'plugin/reveal-progress-bar/reveal-progress-bar.js',
    async: true,
    callback: function() { reveal_progress_bar.initialize(options); }
}
```

The options object has the following form:

```typescript
interface options {
    required agenda: [AgendaSection];
    optional insertionSelector: string = '.slides > section';
    optional insertToPosition: number = 0;
}

interface AgendaSection {
    required id: string;
    required title: string;
    optional subsections: AgendaSubSection;
}

interface AgendaSection {
    required id: string;
    required title: string;
}
```

## Section attributes
The reveal-section's can have the following attributes:

`data-progress-bar-show` : If set to `false` the progress bar will be hidden.

`data-progress-bar-id` : Links this section to one of the agenda's sections.

## Classes

`progress-bar-hide` : Is added to progress bar if the section specifies `data-progress-bar-show` as `false`

`progress-bar-entry-active` : Is added to the currently active sections in the progress bar.