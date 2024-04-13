const container = document.getElementById("main-container");
const qrCodeImg = document.getElementById("qr-code");
const textElement = document.getElementById("text-element");
const inputElement = document.getElementById("input-element");
const buttonElement = document.getElementById("generate-button");

let clickHandler;

function generateQrCode(qrCodeInputValue) {
    if (!qrCodeInputValue) return;

    hideElement(textElement);
    hideElement(inputElement);

    setButtonContent(buttonElement, "Gerando código...");

    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;

    qrCodeImg.addEventListener("load", () => {
        container.classList.add("active");
        setButtonContent(buttonElement, "Gerar outro QRCode");
        buttonElement.addEventListener("click", reloadPage);
    });
}

function typeText(text, element, speed, callback) {
    let typedText = "";
    let index = 0;
    let isPipeVisible = true;

    const typingInterval = setInterval(() => {
        if (index <= text.length) {
            typedText = text.substring(0, index);
            if (isPipeVisible) {
                typedText += "|";
            }
            element.textContent = typedText;
            index++;
            isPipeVisible = !isPipeVisible;
        } else {
            clearInterval(typingInterval);
            if (callback && typeof callback === "function") {
                callback();
            }
        }
    }, speed);
}

function expandContainer() {
    container.classList.add("expanded");
}

function hideElement(element) {
    element.style.display = "none";
}

function setButtonContent(button, content) {
    button.innerHTML = content;
}

function reloadPage() {
    location.reload();
}

window.onload = function () {
    setTimeout(() => {
        let buttonEnable = false;
        const text = "I wild trainer appears!";
        const speed = 100;
        typeText(text, textElement, speed, () => {
            clickHandler = () => {
                expandContainer();
                buttonElement.removeEventListener("click", clickHandler);
                typeText("Digite a URL ou texto: ", textElement, speed, () => {
                    inputElement.classList.remove("hidden");
                    buttonElement.addEventListener("click", () => {
                        generateQrCode(inputElement.value);
                    });
                });
            };
            buttonElement.addEventListener("click", clickHandler);
        });
    }, 100);
};

inputElement.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        generateQrCode(inputElement.value);
    }
});
