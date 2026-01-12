document.addEventListener("DOMContentLoaded", () => {

    const screens = Array.from(document.querySelectorAll(".survey-hero"));
    const progressBar = document.getElementById("progress-bar");

    function showScreen(index) {
        if (index < 0 || index >= screens.length) return;
        screens.forEach((screen, i) => screen.classList.toggle("active", i === index));

        if (progressBar) {
            const percent = ((index + 1) / screens.length) * 100;
            progressBar.style.width = percent + "%";
        }
    }

    // Далі
    document.querySelectorAll("[data-next]").forEach(btn => {
        btn.addEventListener("click", () => {
            const nextId = btn.getAttribute("data-next");
            const nextIndex = screens.findIndex(screen => screen.id === nextId);
            if (nextIndex !== -1) showScreen(nextIndex);
        });
    });

    // Назад
    document.querySelectorAll("[data-prev]").forEach(btn => {
        btn.addEventListener("click", () => {
            const prevId = btn.getAttribute("data-prev");
            const prevIndex = screens.findIndex(screen => screen.id === prevId);
            if (prevIndex !== -1) showScreen(prevIndex);
        });
    });

    // Показати активний або перший екран
    const initialIndex = screens.findIndex(screen => screen.classList.contains("active"));
    showScreen(initialIndex !== -1 ? initialIndex : 0);
});


// ===== ПІДСВІТКА ВИБРАНИХ ОПЦІЙ =====
document.querySelectorAll('.option input').forEach(input => {
    input.addEventListener('change', () => {
        if (input.type === "radio") {
            document.querySelectorAll(`.option input[name="${input.name}"]`)
                .forEach(i => i.parentElement.classList.remove('selected'));
            if (input.checked) input.parentElement.classList.add('selected');
        }

        if (input.type === "checkbox") {
            input.parentElement.classList.toggle('selected', input.checked);
        }
    });
});
