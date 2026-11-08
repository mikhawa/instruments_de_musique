import { Controller } from '@hotwired/stimulus';

/*
 * Lecteur audio à « trous de doigté » : les trous se bouchent au fil de la lecture.
 * Les animations sont gérées uniquement par le CSS (prefers-reduced-motion respecté).
 */
export default class extends Controller {
    static targets = ['audio', 'bouton', 'trou'];

    connect() {
        // Texte d'origine du bouton, mémorisé pour pouvoir le restaurer
        this.texteOrigine = this.hasBoutonTarget ? this.boutonTarget.textContent.trim() : '';
        this.titreOrigine = this.hasBoutonTarget ? this.boutonTarget.getAttribute('title') : null;

        // Fonctions liées conservées pour pouvoir retirer les écouteurs
        this.surProgression = this.mettreAJourTrous.bind(this);
        this.surFin = this.reinitialiser.bind(this);
        this.surErreur = this.gererErreur.bind(this);
        this.surPause = this.afficherPause.bind(this);

        if (!this.hasAudioTarget) {
            return;
        }
        this.audioTarget.addEventListener('timeupdate', this.surProgression);
        this.audioTarget.addEventListener('ended', this.surFin);
        this.audioTarget.addEventListener('error', this.surErreur);
        this.audioTarget.addEventListener('pause', this.surPause);
    }

    disconnect() {
        if (!this.hasAudioTarget) {
            return;
        }
        this.audioTarget.pause();
        this.audioTarget.removeEventListener('timeupdate', this.surProgression);
        this.audioTarget.removeEventListener('ended', this.surFin);
        this.audioTarget.removeEventListener('error', this.surErreur);
        this.audioTarget.removeEventListener('pause', this.surPause);
    }

    // Lecture / pause
    basculer() {
        const audio = this.audioTarget;

        if (!audio.paused) {
            audio.pause();
            return;
        }

        this.afficherLecture();
        try {
            const promesse = audio.play();
            if (promesse && typeof promesse.catch === 'function') {
                // Autoplay bloqué ou erreur de lecture : retour à l'état pause
                promesse.catch(() => this.afficherPause());
            }
        } catch (e) {
            this.afficherPause();
        }
    }

    afficherLecture() {
        this.element.classList.add('est-en-lecture');
        if (this.hasBoutonTarget) {
            this.boutonTarget.setAttribute('aria-pressed', 'true');
            this.boutonTarget.textContent = 'Mettre en pause';
        }
    }

    afficherPause() {
        this.element.classList.remove('est-en-lecture');
        if (this.hasBoutonTarget) {
            this.boutonTarget.setAttribute('aria-pressed', 'false');
            this.boutonTarget.textContent = this.texteOrigine;
        }
    }

    // Bouche les N premiers trous selon la progression
    mettreAJourTrous() {
        const { currentTime, duration } = this.audioTarget;
        const total = this.trouTargets.length;
        if (!duration || !isFinite(duration) || total === 0) {
            return;
        }
        const nombre = Math.ceil((currentTime / duration) * total);
        this.trouTargets.forEach((trou, i) => {
            trou.classList.toggle('est-bouche', i < nombre);
        });
    }

    // Fin de lecture : tout remettre à zéro
    reinitialiser() {
        this.trouTargets.forEach((trou) => trou.classList.remove('est-bouche'));
        this.afficherPause();
    }

    // Erreur de chargement/lecture : désactivation propre
    gererErreur() {
        this.afficherPause();
        if (this.hasBoutonTarget) {
            this.boutonTarget.disabled = true;
            this.boutonTarget.title = "Le son n'a pas pu être chargé.";
        }
    }
}
