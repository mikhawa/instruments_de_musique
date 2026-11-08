<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Création de la table technique `messenger_messages` (transport Messenger Doctrine).
 *
 * En dev, la table est créée automatiquement (auto_setup=1) ; en production
 * (auto_setup=0) elle doit exister via cette migration.
 */
final class Version20261108174951 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Création de la table messenger_messages pour le transport Messenger Doctrine';
    }

    public function up(Schema $schema): void
    {
        // Table des messages en attente du transport Messenger Doctrine
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0E3BD61CE16BA31DBBF396750 (queue_name, available_at, delivered_at, id), PRIMARY KEY (id))');
    }

    public function down(Schema $schema): void
    {
        // Suppression de la table des messages Messenger
        $this->addSql('DROP TABLE messenger_messages');
    }
}
