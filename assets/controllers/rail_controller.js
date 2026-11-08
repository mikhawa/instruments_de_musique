import { Controller } from '@hotwired/stimulus';

/*
 * Rail de navigation : sur bureau (>= 48rem) le <details> est toujours ouvert
 * et son bouton « Menu » est masqué (attribut data-rail-bureau, voir app.css).
 * Sur mobile il se replie ; l'utilisateur peut l'ouvrir lui-même.
 * Sans JavaScript, le <details> reste repliable : le menu reste accessible.
 */
export default class extends Controller {
    connect() {
        this.requete = window.matchMedia('(min-width: 48rem)');
        this.surChangement = () => this.ajuster();
        this.requete.addEventListener('change', this.surChangement);
        this.ajuster();
    }

    disconnect() {
        this.requete.removeEventListener('change', this.surChangement);
        this.element.removeAttribute('data-rail-bureau');
    }

    ajuster() {
        if (this.requete.matches) {
            this.element.open = true;
            this.element.setAttribute('data-rail-bureau', '');
        } else {
            this.element.removeAttribute('data-rail-bureau');
            this.element.open = false;
        }
    }
}
