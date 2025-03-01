// Check and apply theme before page loads
if (localStorage.getItem("color-theme") === "dark") {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}
