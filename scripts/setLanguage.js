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

  let selectedLang = "ptBR";

  //? Initial Sync: save default state from HTML dropdown
  selectedLang = languageSelect.value;
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

    updatePageContent(translations[selectedLang], pageName, selectedLang);
  });
}

function updatePageContent(texts, currentPage, lang) {
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
			updateProjectsPage(texts.projects, lang);
			break;
		default:
			console.error(`The page ${currentPage} does not exist in the project`);
	}
}

function updateHeader(headerTexts) {
	const siteIcon = document.getElementById("site-icon");
	const linkedinIcon = document.getElementById("linkedin");
	const emailIcon = document.getElementById("email");

	if (siteIcon) siteIcon.alt = headerTexts.logoAlt;

	if (linkedinIcon) linkedinIcon.setAttribute("aria-label", headerTexts.linkedinAriaLabel);

	if (emailIcon) {
		emailIcon.setAttribute("aria-label", headerTexts.emailAriaLabel);

		const subject = encodeURIComponent(headerTexts.emailSubject);
		const body = encodeURIComponent(headerTexts.emailBody);
		emailIcon.href = `https://mail.google.com/mail/?view=cm&to=lyamoesp@gmail.com&su=${subject}&body=${body}`;
	}
}

function updateIndexPage(indexTexts) {
	const introText = document.getElementById("intro-title");
	const subtitleText = document.getElementById("subtitle");

	if (introText) introText.innerText = indexTexts.title;
	if (subtitleText) subtitleText.innerText = indexTexts.subtitle;
}

function updateAboutPage(aboutTexts) {
	const titleText = document.getElementById("about-me");
	const aboutText = document.getElementById("self-description");
    const pfpImage = document.getElementById("profile-picture");
	const bannerImage = document.getElementById("banner-about");

	if (titleText) titleText.innerText = aboutTexts.title;
	if (aboutText) aboutText.innerText = aboutTexts.descText;
    if (pfpImage) pfpImage.setAttribute("alt", aboutTexts.pfpAlt);
    if (bannerImage) bannerImage.setAttribute("alt", aboutTexts.bannerAlt);
}

function updateProjectsPage(projectTexts, lang) {
	const titleText = document.getElementById("title");

	if (titleText) titleText.innerText = projectTexts.title;
	insertProjects(lang); //* update the language and add them
}

function updateFooter(footerTexts) {
	const copyrightText = document.getElementById("copyright");
    const ctcText = document.getElementById("call-to-contact");

	if (copyrightText) copyrightText.innerText = footerTexts.copyright;
    if (ctcText) ctcText.innerText = footerTexts.contactCall;
}

function updateButtons(buttonTexts) {
    const indexBtn = document.getElementById("index-btn");
    const aboutBtn = document.getElementById("about-btn");
    const projectsBtn = document.getElementById("projects-btn");

    if (indexBtn) indexBtn.innerText = buttonTexts.index;
    if (aboutBtn) aboutBtn.innerText = buttonTexts.about;
    if (projectsBtn) projectsBtn.innerText = buttonTexts.projects;
}