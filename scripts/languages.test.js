import { ptBR } from "../data/locales/pt-BR";
import { en } from "../data/locales/en";
import { projects } from "../data/projects";

//* ==============================
//* FUNCTIONS
//* ==============================

function getKeys(obj, prefix = "") {
    const keys = [];

    for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value === "object" && !Array.isArray(value)) {
            keys.push(...getKeys(value, path));
        } else {
            keys.push(path);
        }
    }

    return keys.sort();
}

//* ==============================
//* CONSTS AND LETS
//* ==============================

const langFiles = { ptBR, en };

const langKeys = Object.fromEntries(
    Object.entries(langFiles).map(([code, file]) => [code, getKeys(file)])
);

//* ==============================
//* TESTS
//* ==============================

describe("Check languages", () => {
    test.each(Object.keys(langFiles))(
        "%s locale should have identical structure to ptBR",
        (langCode) => {
            expect(langKeys[langCode]).toEqual(langKeys.ptBR);
        }
    );

    test.each(Object.entries(langFiles))(
        "All projects in projects.js must exist in %s locale",
        (langCode, langData) => {
            const projectIds = Object.keys(projects);
            const localizedProjectKeys = Object.keys(langData.projects.projectsData);

            projectIds.forEach((projectId) => {
                expect(localizedProjectKeys).toContain(projectId);
            });
        }
    );
});
