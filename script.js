const content = document.getElementById("content");
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const addImageBtn = document.getElementById("addImageBtn");
const addTerminalBtn = document.getElementById("addTerminalBtn");
const addSectionBtn = document.getElementById("addSectionBtn");
const printBtn = document.getElementById("printBtn");
const imageInput = document.getElementById("imageInput");

// Guardar original
const originalContent = content.innerHTML;

// Activar/desactivar edición
editBtn.addEventListener("click", () => {
    const editing = content.contentEditable === "true";
    content.contentEditable = editing ? "false" : "true";
    editBtn.textContent = editing ? "Activar Edición" : "Editando…";
});

// Guardar cambios
saveBtn.addEventListener("click", () => {
    localStorage.setItem("manualContent", content.innerHTML);
    alert("Contenido guardado.");
});

// Restaurar original
resetBtn.addEventListener("click", () => {
    if (confirm("¿Seguro que deseas restaurar el manual original?")) {
        localStorage.removeItem("manualContent");
        content.innerHTML = originalContent;
    }
});

// Cargar guardado
window.onload = () => {
    const saved = localStorage.getItem("manualContent");
    if (saved) content.innerHTML = saved;
};

// Añadir imagen local
addImageBtn.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result;
        img.style.maxWidth = "100%";
        img.style.borderRadius = "10px";
        img.style.marginTop = "15px";
        content.appendChild(img);
    };
    reader.readAsDataURL(file);
});

// Añadir bloque terminal
addTerminalBtn.addEventListener("click", () => {
    const div = document.createElement("div");
    div.className = "terminal";
    div.innerHTML = "<pre>comando...</pre>";
    content.appendChild(div);
});

// Añadir sección nueva
addSectionBtn.addEventListener("click", () => {
    const sec = document.createElement("section");
    sec.className = "card";
    sec.innerHTML = "<h2>Nueva Sección</h2><p>Escribe aquí…</p>";
    content.appendChild(sec);
});

// Imprimir limpio sin URL/descripción
printBtn.addEventListener("click", () => window.print());