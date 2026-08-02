import { projects } from "../data/projects.js";

export function insertProjects(localeTexts) {
	const container = document.getElementById("card-group");

	if (!container) {
		console.error("Couldn't find the project container");
		return;
	}

	const mergedProjects = getLocalizedProjectsList(localeTexts);

	const sortedProjects = mergedProjects.sort((a, b) => {
		return new Date(b.releaseDate) - new Date(a.releaseDate);
	});

	const cardsHTML = sortedProjects
		.map((project) => {
			const formattedDate = changeDateFormat(
				project.releaseDate,
				project.dateFormat,
			);

			return `
                    <a class="project-card col" href="${project.link}" target="_blank" rel="noopener noreferrer">
                        <div class="card flex-fill">
                            <img
                                src="${project.bannerImage}"
                                class="card-img-top object-fit-cover max-h-25vh"
                                style="max-height: 50vh"
                                alt="${project.bannerAlt || "Project image"}"
                            />
                            <div class="card-body">
                                <h2 class="card-title fs-5 fs-md-4">${project.name}</h2>
                                <p class="text-muted small">
                                    ${project.releaseLabel}: ${formattedDate}
                                </p>
                                <p class="card-text fs-6 fs-md-5">
                                    ${project.description}
                                </p>
                            </div>
                        </div>
                    </a>
                `;
		})
		.join("");

	container.innerHTML = cardsHTML;
}

function getLocalizedProjectsList(localeData) {
	const releaseLabel = localeData.releaseLabel;
	const dateFormat = localeData.dateFormat;
	const translations = localeData.projectsData;

	return Object.keys(projects).map((key) => ({
		id: key,
		...projects[key], // releaseDate, bannerImage, link
		...translations[key], // name, description, bannerAlt
		releaseLabel,
		dateFormat,
	}));
}

function changeDateFormat(date, timeLoc) {
	const formattedDate = new Date(date).toLocaleDateString(timeLoc, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});

	return formattedDate;
}
