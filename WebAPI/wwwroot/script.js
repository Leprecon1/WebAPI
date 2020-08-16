
        // Получение всех карт
    async function GetCards() {
            // отправляет запрос и получаем ответ
            const response = await fetch("/api/cards", {
        method: "GET",
                headers: {"Accept": "application/json" }
            });
            // если запрос прошел нормально
            if (response.ok === true) {
                // получаем данные
                const cards = await response.json();
                let rows = document.querySelector("tbody");
                cards.forEach(card => {
        // добавляем полученные элементы в таблицу
        rows.append(row(card));
                });
            }
        }
        // Получение одной карты
        async function GetCard(id) {
            const response = await fetch("/api/cards/" + id, {
        method: "GET",
                headers: {"Accept": "application/json" }
            });
            if (response.ok === true) {
                const card = await response.json();
                const form = document.forms["cardForm"];
                form.elements["id"].value = card.id;
                form.elements["owner"].value = card.owner;
                form.elements["number"].value = card.number;
                form.elements["term"].value = card.term;
                form.elements["cvv"].value = card.cvv;
            }
        }
        // Добавление карты
        async function CreateCard(cardName, cardAge, cardTerm, cardCvv) {

            const response = await fetch("api/cards", {
        method: "POST",
                headers: {"Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    owner: cardName,
                    number: cardAge,
                    term: cardTerm,
                    cvv: cardCvv
                })
            });
            if (response.ok === true) {
                const card = await response.json();
                document.querySelector("tbody").append(row(card));
                reset();

            }
            else {
                const errorData = await response.json();
                console.log("errors", errorData);
                if (errorData) {
                    // ошибки вследствие валидации по атрибутам
                    if (errorData.errors) {
                        if (errorData.errors["Owner"]) {
                            addError(errorData.errors["Owner"]);
                        }
                        if (errorData.errors["Number"]) {
                            addError(errorData.errors["Number"]);
                        }
                        if (errorData.errors["Term"]) {
                            addError(errorData.errors["Term"]);
                        }
                        if (errorData.errors["CVV"]) {
                            addError(errorData.errors["CVV"]);
                        }                  
                    }
                    // кастомные ошибки, определенные в контроллере
                    // добавляем ошибки свойства Name
                    if (errorData["Owner"]) {
                        addError(errorData["Owner"]);
                    }

                    // добавляем ошибки свойства Number
                    if (errorData["Number"]) {
                        addError(errorData["Number"]);
                    }

                    if (errorData["Term"]) {
                        addError(errorData["Term"]);
                    }

                    if (errorData["CVV"]) {
                        addError(errorData["CVV"]);
                    }
                }

                document.getElementById("errors").style.display = "block";
            }
        }
        // Изменение карты
            async function EditCard(cardId, cardName, cardAge, cardTerm, cardCvv ) {
            const response = await fetch("api/cards", {
        method: "PUT",
                headers: {"Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
        id: parseInt(cardId, 10),
                    owner: cardName,
                    number: cardAge,
                    term: cardTerm,
                    cvv: cardCvv
                })
            });
            if (response.ok === true) {
                const card = await response.json();
                document.querySelector("tr[data-rowid='" + card.id + "']").replaceWith(row(card));
                reset();


            }
        }
        // Удаление карты
        async function DeleteCard(id) {
            const response = await fetch("/api/cards/" + id, {
        method: "DELETE",
                headers: {"Accept": "application/json" }
            });
            if (response.ok === true) {
                const card = await response.json();
                document.querySelector("tr[data-rowid='" + card.id + "']").remove();
            }
        }

        // сброс формы
        function reset() {
            const form = document.forms["cardForm"];
            form.reset();
            form.elements["id"].value = 0;
        }

        function addError(errors) {
            errors.forEach(error => {
                const p = document.createElement("p");
                p.append(error);
                document.getElementById("errors").append(p);
            });
        }

        // создание строки для таблицы
        function row(card) {

            const tr = document.createElement("tr");
            tr.setAttribute("data-rowid", card.id);

            const idTd = document.createElement("td");
            idTd.append(card.id);
            tr.append(idTd);

            const ownerTd = document.createElement("td");
            ownerTd.append(card.owner);
            tr.append(ownerTd);

            const numberTd = document.createElement("td");
            numberTd.append(card.number);
            tr.append(numberTd);

            const termTd = document.createElement("td");
            termTd.append(card.term);
            tr.append(termTd);

            const cvvTd = document.createElement("td");
            cvvTd.append(card.cvv);
            tr.append(cvvTd);

            const linksTd = document.createElement("td");

            const editLink = document.createElement("a");
            editLink.setAttribute("data-id", card.id);
            editLink.setAttribute("style", "cursor:pointer;padding:15px;");
            editLink.append("Изменить");
            editLink.addEventListener("click", e => {

               e.preventDefault();
                GetCard(card.id);
            });
            linksTd.append(editLink);

            const removeLink = document.createElement("a");
            removeLink.setAttribute("data-id", card.id);
            removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
            removeLink.append("Удалить");
            removeLink.addEventListener("click", e => {

        e.preventDefault();
                DeleteCard(card.id);
            });

            linksTd.append(removeLink);
            tr.appendChild(linksTd);

            return tr;
}



        // отправка формы
        document.forms["cardForm"].addEventListener("submit", e => {
            e.preventDefault();
            document.getElementById("errors").innerHTML = "";
            document.getElementById("errors").style.display = "none";

            const form = document.forms["cardForm"];
            const id = form.elements["id"].value;
            const owner = form.elements["owner"].value;
            const number = form.elements["number"].value;
            const term = form.elements["term"].value;
            const cvv = form.elements["cvv"].value;
            if (id == 0)
                CreateCard(owner, number, term, cvv);
            else
                EditCard(id, owner, number, term, cvv);
        });

        // загрузка всех банковских карт
        GetCards();
