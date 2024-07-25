export class PopUpWindow {
    constructor({ title, fields = [], onSubmit = () => { } }) {
        this.title = title;
        this.fields = fields;
        this.onSubmit = onSubmit;

        this.createWindow();
    }

    createWindow() {
        this.popupWindow = document.createElement('div');
        this.popupWindow.className = "popup-window";

        const windowTop = document.createElement('div');
        windowTop.className = "popup-window-top";

        const windowHeader = document.createElement('h2');
        windowHeader.textContent = this.title;

        const closeButton = document.createElement('button');
        closeButton.textContent = "X";
        closeButton.addEventListener('click', () => {
            this.closeWindow();
        });

        windowTop.appendChild(windowHeader);
        windowTop.appendChild(closeButton);
        this.popupWindow.appendChild(windowTop);


        const form = document.createElement('form');
        const formList = document.createElement('ul');
        //each field will be passed in in array of object literals
        this.fields.forEach(field => {
            const listItem = document.createElement('li');

            const label = document.createElement('label');
            label.setAttribute('for', field.name);
            label.textContent = field.label;
            const input = document.createElement('input');
            input.setAttribute('type', field.type || 'text');
            input.setAttribute('name', field.name);
            input.setAttribute('id', field.name);
            listItem.appendChild(label);
            listItem.appendChild(input);
            formList.appendChild(listItem);
        });
        form.appendChild(formList);
        this.popupWindow.appendChild(form);

        const submitButton = document.createElement('button');
        submitButton.textContent = "Submit";
        this.popupWindow.appendChild(submitButton);
        const mainContent = document.querySelector('.main');
        mainContent.classList.add('blur');

        document.body.appendChild(this.popupWindow);
    }


    closeWindow() {
        document.body.removeChild(this.popupWindow);
        const mainContent = document.querySelector('.main');
        mainContent.classList.remove('blur');
    }
}
