import { projects } from "../data/projects.js";

export function insertProjects(currLang) {
	const container = document.getElementById("card-group");

	if (!container) {
		console.error("Couldn't find the project container");
		return;
	}

	const sortedProjects = projects.sort((a, b) => {
		return new Date(b.releaseDate) - new Date(a.releaseDate);
	});

	const cardsHTML = sortedProjects
		.map((project) => {
			const [description, altText, releaseLabel] = matchTextCurrentLang(
				currLang,
				project,
			);

            const formattedDate = changeDateFormat(project.releaseDate, currLang)

			return `
                    <a class="project-card col" href="${project.link}" target="_blank" rel="noopener noreferrer">
                        <div class="card flex-fill">
                            <img
                                src="${project.bannerImage}"
                                class="card-img-top object-fit-cover max-h-25vh"
                                style="max-height: 50vh"
                                alt="${altText || "Project image"}"
                            />
                            <div class="card-body">
                                <h2 class="card-title fs-5 fs-md-4">${project.name}</h2>
                                <p class="text-muted small">
                                    ${releaseLabel}: ${formattedDate}
                                </p>
                                <p class="card-text fs-6 fs-md-5">
                                    ${description}
                                </p>
                            </div>
                        </div>
                    </a>
                `;
		})
		.join("");

	container.innerHTML = cardsHTML;
}

function matchTextCurrentLang(lang, project) {
	let desc;
	let altText;
	let releaseLabel;

	switch (lang) {
		case "ptBR":
			desc = project.descriptionPtBr;
			altText = project.bannerImageAltPtBr;
			releaseLabel = "Lançamento";
			break;
		case "en":
			desc = project.descriptionEn;
			altText = project.bannerImageAltEn;
			releaseLabel = "Released";
			break;
		default:
			console.warn(`Language ${lang} was not found`);
			break;
	}

	return [desc, altText, releaseLabel];
}

function changeDateFormat(date, lang) {
    let timeLoc;

    switch (lang) {
		case "ptBR":
			timeLoc = "pt-BR";
			break;
		case "en":
			timeLoc = "en-US";
			break;
		default:
			console.warn(`Language ${lang} was not found`);
			break;
	}

	const formattedDate = new Date(date).toLocaleDateString(
		timeLoc,
		{
			year: "numeric",
			month: "short",
			day: "numeric",
            timeZone: "UTC"
		},
	);

    return formattedDate;
}
