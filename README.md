# Instruments de musique

Lien vers github du projet : https://github.com/WebDevCF2m/instruments_de_musique


## Installation sous WSL2 de Windows 11 du projet instruments de musique :

Ouvrir Powershell et l'ouvrir (ou l'installer) ou n'importe quelle console

    wsl --install (puis prendre Ubuntu par défaut, rentrer un login et un mot de passe)

    wsl

    sudo apt update

    # PHP 8.3
    sudo apt install php8.3-common php8.3-{bcmath,bz2,curl,gd,gmp,intl,mbstring,opcache,readline,xml,zip}

    # node.js 22.22
    sudo apt install nodejs

    wget https://get.symfony.com/cli/installer -O - | bash
    # puis
    mv /home/VOTRE_LOGIN/.symfony5/bin/symfony /usr/local/bin/symfony

    npm install -g --allow-scripts=@anthropic-ai/claude-code @anthropic-ai/claude-code

    cd /home/VOTRE_LOGIN/

    symfony check:requirement

    # Modifier si nécessaire

    symfony new instruments_de_musique --version=lts --webapp
    # ou cloner le répertoire

    cd instruments_de_musique

## Etape 2 Initialisation de claude 

    claude update
    claude

Suivre le serveur, puis dans Claude

    /init

## Etape 3 Chemins de travail

Racine du projet : `/home/VOTRE_LOGIN/instruments_de_musique` (dans WSL, pas sur le disque Windows).

| Chemin | Rôle |
|---|---|
| `src/` | Code PHP (`Controller/`, `Entity/`, `Repository/`) |
| `templates/` | Vues Twig |
| `assets/` | JS (Stimulus, `app.js`) et CSS (AssetMapper, sans Node) |
| `config/` | Configuration Symfony (`packages/doctrine.yaml`, `routes/`, `services.yaml`) |
| `migrations/` | Migrations Doctrine |
| `translations/` | Fichiers de traduction |
| `tests/` | Tests PHPUnit |
| `public/` | Racine web (`index.php`) |
| `compose.yaml`, `compose.override.yaml` | Docker : PHP, Nginx, MariaDB 11.4, Mailpit, phpMyAdmin |
| `Dockerfile`, `docker/` | Image PHP (cibles `dev`/`prod`), config Nginx |
| `.env` (versionné), `.env.local` (secrets, non versionné) | Variables d'environnement |
| `docs/` | Documentation technique (`devops/`, `architecture/`) |
| `documentation-dev/` | Fiches de suivi du développement |
| `.claude/`, `CLAUDE.md` | Agents et instructions Claude Code |

Les commandes s'exécutent dans les conteneurs depuis la racine :

    docker compose up -d --build
    docker compose exec php php bin/console <commande>

Adresses locales : application http://localhost:8080, phpMyAdmin http://localhost:8081, worker Messenger (service `worker`, sans port ; logs : `docker compose logs worker`, à redémarrer après modification du code PHP : `docker compose restart worker`), Mailpit (e-mails interceptés) http://localhost:8025 (SMTP 1025), base MariaDB `127.0.0.1:3307`.
