let currentLang = localStorage.getItem("portfolio-lang") || "en";

function setLanguage(lang) {
    // Hide all language elements
    document
        .querySelectorAll(".lang-en, .lang-pt-br")
        .forEach((el) => (el.style.display = "none"));
        
    document
        .querySelectorAll(".lang-" + lang)
        .forEach((el) => {
            // If you use Bootstrap, '' lets the browser revert to its default layout style.
            el.style.display = el.tagName === "SPAN" ? "inline" : "block"; 
        });

    const switcher = document.getElementById("language-switcher");
    if (switcher) {
        switcher.value = lang;
    }
}

// 2. Handle dropdown changes
document.addEventListener("DOMContentLoaded", () => {
    const switcher = document.getElementById("language-switcher");
    
    if (switcher) {
        switcher.addEventListener("change", function () {
            currentLang = this.value;
            localStorage.setItem("portfolio-lang", currentLang);
            setLanguage(currentLang);
        });
    }

    setLanguage(currentLang);
});