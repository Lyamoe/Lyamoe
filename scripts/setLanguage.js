import { ptBR } from "../data/locales/pt-BR.js";
import { en } from "../data/locales/en.js";
import { insertProjects } from "./insertProjects.js";

const translations = {
	ptBR,
	en,
};

export function initLanguageController(pageName) {
	const languageSelect = document.getElementById("language-switcher");

	if (!languageSelect) {
		console.warn("Language switcher element not found in DOM.");
		return;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const langParam = urlParams.get("lang");
	let selectedLang = langParam ? langParam : "ptBR";

	languageSelect.value = selectedLang;

	//? Initial Sync: save default state from HTML dropdown
	const initialTranslations = translations[selectedLang] || translations.ptBR;
	updatePageContent(initialTranslations, pageName, selectedLang);

	//? Change Event: update state when dropdown changes
	languageSelect.addEventListener("change", (event) => {
		const newLang = event.target.value;

		if (!translations[newLang]) {
			console.error(`Selected language key "${newLang}" was not found.`);
			return;
		}

		selectedLang = newLang;

		urlParams.set("lang", newLang);
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		window.history.replaceState(null, "", newUrl);

		updatePageContent(translations[selectedLang], pageName, selectedLang);
	});
}

function updatePageContent(texts, currentPage, lang) {
	updateHead(texts.head);
	updateHeader(texts.header);
	updateButtons(texts.pageButtons);
	updateFooter(texts.footer);

	switch (currentPage) {
		case "index":
			updateIndexPage(texts.index);
			break;
		case "about":
			updateAboutPage(texts.about);
			break;
		case "projects":
			updateProjectsPage(texts.projects);
			break;
		default:
			console.error(`The page ${currentPage} does not exist in the project`);
	}

	updateNavigationLinks(lang);
}

function updateHead(texts) {
	document.title = texts.title;
	setMetaTag("description", texts.metaDescription);
	setMetaTag("og:title", texts.title);
	setMetaTag("og:description", texts.metaDescription);
}

function updateHeader(texts) {
	const siteIcon = document.getElementById("site-icon");
	const linkedinIcon = document.getElementById("linkedin");
	const emailIcon = document.getElementById("email");

	if (siteIcon) siteIcon.alt = texts.logoAlt;

	if (linkedinIcon)
		linkedinIcon.setAttribute("aria-label", texts.linkedinAriaLabel);

	if (emailIcon) {
		emailIcon.setAttribute("aria-label", texts.emailAriaLabel);

		const subject = encodeURIComponent(texts.emailSubject);
		const body = encodeURIComponent(texts.emailBody);
		emailIcon.href = `https://mail.google.com/mail/?view=cm&to=lyamoesp@gmail.com&su=${subject}&body=${body}`;
	}
}

function updateIndexPage(texts) {
	const introText = document.getElementById("intro-title");
	const subtitleText = document.getElementById("subtitle");

	if (introText) introText.innerText = texts.title;
	if (subtitleText) subtitleText.innerText = texts.subtitle;
}

function updateAboutPage(texts) {
	const titleText = document.getElementById("about-me");
	const aboutText = document.getElementById("self-description");
	const pfpImage = document.getElementById("profile-picture");
	const bannerImage = document.getElementById("banner-about");

	if (titleText) titleText.innerText = texts.title;
	if (aboutText) aboutText.innerText = texts.descText;
	if (pfpImage) pfpImage.setAttribute("alt", texts.pfpAlt);
	if (bannerImage) bannerImage.setAttribute("alt", texts.bannerAlt);
}

function updateProjectsPage(texts) {
	const titleText = document.getElementById("title");

	if (titleText) titleText.innerText = texts.title;
	insertProjects(texts); //* update the language and add them
}

function updateFooter(texts) {
	const copyrightText = document.getElementById("copyright");
	const ctcText = document.getElementById("call-to-contact");

	if (copyrightText) copyrightText.innerText = texts.copyright;
	if (ctcText) ctcText.innerText = texts.contactCall;
}

function updateButtons(texts) {
	const indexBtn = document.getElementById("index-btn");
	const aboutBtn = document.getElementById("about-btn");
	const projectsBtn = document.getElementById("projects-btn");

	if (indexBtn) indexBtn.innerText = texts.index;
	if (aboutBtn) aboutBtn.innerText = texts.about;
	if (projectsBtn) projectsBtn.innerText = texts.projects;
}

function updateNavigationLinks(currLang) {
	const links = document.querySelectorAll("a.page-control");

	links.forEach((link) => {
		const url = new URL(link.getAttribute("href"), window.location.href);

		url.searchParams.set("lang", currLang);

		// Update the href attribute with relative pathname + new search params
		link.setAttribute("href", `${url.pathname}${url.search}`);
	});
}

function setMetaTag(property, content) {
	if (!content) return;

	// Look for an existing tag
	let element = document.querySelector(`meta[property="${property}"]`);

	// If it doesn't exist, create one and append it to <head>
	if (!element) {
		element = document.createElement("meta");
		element.setAttribute("property", property);
		document.head.appendChild(element);
	}

	element.setAttribute("content", content);
}
