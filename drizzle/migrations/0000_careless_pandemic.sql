DO $$ BEGIN
 CREATE TYPE "pix_key_type" AS ENUM('CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "receiver_status" AS ENUM('RASCUNHO', 'VALIDADO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receivers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"register_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"pix_key" varchar(255) NOT NULL,
	"pix_key_type" "pix_key_type" NOT NULL,
	"status" "receiver_status" NOT NULL
);
