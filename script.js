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

const SEND_URL = 'https://script.google.com/macros/s/AKfycbw-Nocnb3IPOrS8EsZAVk2pJumGWP66JGkQm6ib5M1Qa2W1TeZyDF7JtcWq6JBnrgee/exec';

document.querySelector('.send-btn').addEventListener('click', () => {

  const getRadio = name =>
    document.querySelector(`input[name="${name}"]:checked`)?.value || '';

  const getCheckboxes = name =>
    [...document.querySelectorAll(`input[name="${name}"]:checked`)]
      .map(el => el.value);

  const data = {
    name: document.querySelector('#screen-2 input').value,

    camp2026: getRadio('camp2026'),
    roles: getCheckboxes('role'),
    duration: getRadio('duration'),
    dates: getCheckboxes('dates'),
    prep: getRadio('prep'),
    spirit: getRadio('spirit'),
    spirit_importance: getCheckboxes('spirit_importance'),
    spirit_prep: getRadio('spirit_prep'),
    prayer: document.querySelector('#screen-11 textarea').value,
    word: document.querySelector('#screen-12 textarea').value
  };

  fetch(SEND_URL, {
  method: 'POST',
  mode: 'no-cors',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(() => {
  allert("Send");
})
.catch(err => {
  alert('Помилка відправки 😢');
  console.error(err);
});
});