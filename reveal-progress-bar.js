const reveal_progress_bar = {
    initialize: (options = {}) => {
        if (!options.agenda) { return; }

        const agenda = options.agenda;
        let insertionElement = options.insertionElement;

        if (!insertionElement && options.insertionSelector) {
            insertionElement = document.querySelector(options.insertionSelector);
        } else {
            insertionElement = document.querySelector('.reveal .slides');
        }

        if (!insertionElement) { return; }

        const progressDiv = document.createElement('div');
        progressDiv.classList.add('progress-bar');

        if (!options.insertToPosition) {
            insertionElement.prepend(progressDiv);
        } else {
            insertionElement.children[options.insertToPosition - 1].insertAdjacentElement("afterEnd", progressDiv);
        }

        const divMap = agenda.reduce(
            (map, {id, title, noBar, subsections}, idx) => {
                if (noBar) { return map; }

                const div = document.createElement('div');
                div.classList.add('progress-bar-entry');
                div.classList.add(`progress-bar-entry-${idx}`);
                div.innerHTML = title;
                progressDiv.appendChild(div);

                map.set(id, div)
                return map;
            },
            new Map()
        );

        let currentId = agenda[0].id;
        const slideMetas  = Array.from(document.querySelectorAll('.slides > section'))
            .reduce(
                (map, slide, idx) => {
                    let id = slide.getAttribute('data-progress-bar-id');
                    if (!id) { id = currentId }
                    currentId = id;

                    const meta = {
                        div: divMap.get(id),
                        showBar: slide.getAttribute('data-progress-bar-show') !== 'false',
                    }

                    map.set(slide, meta)
                    return map;
                },
                new Map()
            );

        const currentSlide = Reveal.getCurrentSlide();
        const slideMeta = slideMetas.get(currentSlide);
        const currentDiv = slideMeta.div;
        if (currentDiv) { currentDiv.classList.add('progress-bar-entry-active'); }

        if (slideMeta.showBar) {
            progressDiv.classList.remove('progress-bar-hide')
        } else {
            progressDiv.classList.add('progress-bar-hide')
        }

        Reveal.addEventListener('slidechanged', event => {
            const previousMeta = slideMetas.get(event.previousSlide);
            const currentMeta = slideMetas.get(event.currentSlide);

            const previousDiv = previousMeta.div;
            const currentDiv = currentMeta.div;

            previousDiv.classList.remove('progress-bar-entry-active');
            currentDiv.classList.add('progress-bar-entry-active');

            if (currentMeta.showBar) {
                progressDiv.classList.remove('progress-bar-hide')
            } else {
                progressDiv.classList.add('progress-bar-hide')
            }
        });
    }
}
