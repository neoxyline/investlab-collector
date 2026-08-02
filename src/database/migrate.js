import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import postgres from "./postgres.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationDir = path.join(__dirname, "migrations");

async function createMigrationTable() {
    await postgres.query(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
            id SERIAL PRIMARY KEY,
            filename VARCHAR(255) UNIQUE NOT NULL,
            executed_at TIMESTAMP DEFAULT NOW()
        );
    `);
}

async function migrationExecuted(filename) {

    const result = await postgres.query(
        `
        SELECT id
        FROM schema_migrations
        WHERE filename = $1
        LIMIT 1
        `,
        [filename]
    );

    return result.rows.length > 0;
}

async function saveMigration(filename) {

    await postgres.query(
        `
        INSERT INTO schema_migrations(filename)
        VALUES($1)
        `,
        [filename]
    );

}

async function migrate() {

    console.log("======================================");
    console.log(" InvestLab Database Migration");
    console.log("======================================\n");

    try {

        await createMigrationTable();

        const files = fs
            .readdirSync(migrationDir)
            .filter(file => file.endsWith(".sql"))
            .sort();

        let total = 0;

        for (const file of files) {

            const executed = await migrationExecuted(file);

            if (executed) {

                console.log(`⏭  Skip ${file}`);

                continue;

            }

            console.log(`▶ Running ${file}`);

            const sql = fs.readFileSync(
                path.join(migrationDir, file),
                "utf8"
            );

            await postgres.query("BEGIN");

            try {

                await postgres.query(sql);

                await saveMigration(file);

                await postgres.query("COMMIT");

                console.log(`✅ ${file} completed\n`);

                total++;

            } catch (err) {

                await postgres.query("ROLLBACK");

                throw err;

            }

        }

        console.log("--------------------------------------");
        console.log(`${total} migration(s) executed`);
        console.log("Database is up to date.");
        console.log("--------------------------------------");

    } catch (err) {

        console.error("\n❌ Migration Failed\n");

        console.error(err);

        process.exit(1);

    } finally {

        await postgres.end();

    }

}

migrate();