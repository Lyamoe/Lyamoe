import { en } from "../data/locales/en";
import { ptBR } from "../data/locales/pt-BR";

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

const ptKeys = getKeys(ptBR);
const enKeys = getKeys(en);

describe("getKeys", () => {
	test("All keys must be equal between language files", () => {
		expect(enKeys).toEqual(ptKeys);
	});
});
