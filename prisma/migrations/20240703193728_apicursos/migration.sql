-- CreateTable
CREATE TABLE `aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,
    `telefone` VARCHAR(60) NOT NULL,
    `cursoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `aluno_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `tipo` VARCHAR(60) NOT NULL,
    `valor` VARCHAR(60) NOT NULL,
    `nomeProfessor` VARCHAR(60) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(60) NOT NULL,
    `complemento` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `alunoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log` ADD CONSTRAINT `log_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
