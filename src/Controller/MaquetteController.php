<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Sert la maquette statique de design (disponible uniquement en environnement dev).
 */
#[Route('/maquette', name: 'maquette_', env: 'dev')]
final class MaquetteController extends AbstractController
{
    /** Page d'accueil de la maquette. */
    #[Route('', name: 'accueil', methods: ['GET'])]
    public function accueil(): Response
    {
        return $this->render('maquette/accueil.html.twig');
    }

    /** Page d'instrument de la maquette (exemple : la clarinette). */
    #[Route('/clarinette', name: 'instrument', methods: ['GET'])]
    public function instrument(): Response
    {
        return $this->render('maquette/instrument.html.twig');
    }
}
