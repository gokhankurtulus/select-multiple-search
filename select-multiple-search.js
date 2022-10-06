document.addEventListener("click", function (e) {
    close__select_lists();
})

function selectMultipleSearch(select_id) {
    let selectElement = document.getElementById(select_id);
    let selectElementIndex = Array.from(selectElement.parentElement.children).indexOf(selectElement);
    //create container
    let select__multiple__search__container = document.createElement("div");
    select__multiple__search__container.classList.add("select__multiple__search__container");

    //create selected part
    let selected__part = document.createElement("ul");
    selected__part.classList.add("select__selected__part");

    //create search part
    let select__search__part = document.createElement("div");
    select__search__part.classList.add("select__search__part");
    let select__search__input = document.createElement("input");
    select__search__input.classList.add("select__multiple__search");

    //create list
    let select__list = document.createElement("ul");
    select__list.setAttribute("id", select_id + "__select__list")
    select__list.classList.add("select__list");

    //placing items in container
    selectElement.parentElement.insertBefore(select__multiple__search__container, selectElement.parentElement.children[selectElementIndex]);
    select__multiple__search__container.append(selected__part);
    select__multiple__search__container.append(select__search__part);
    select__multiple__search__container.append(selectElement);
    select__search__part.append(select__search__input);
    select__search__part.append(select__list);

    close__select_lists();

    if (selectElement) {
        //checking optgroup and creating items from options
        let opt = selectElement.querySelectorAll("optgroup");
        if (opt.length) {
            opt.forEach(function (optItem) {
                select__list.innerHTML += [optItem].map(({label}) => SelectListOptgroupTemplate(label)).join('');
                select__list.innerHTML += [...optItem.children].map(({value, innerText}) => SelectListItemTemplate(value, innerText)).join('');
            });
        } else
            select__list.innerHTML = [...selectElement.options].map(({value, innerText}) => SelectListItemTemplate(value, innerText)).join('');

        //creating selected items from template
        Change__Selected__Part(selectElement, selected__part, select__list);

        //may browser allow to reach select element so selected part affects when clicking on select > options
        selectElement.addEventListener("change", function () {
            Change__Selected__Part(selectElement, selected__part, select__list);
        });

        //shows created items from options when click on search input
        select__search__input.addEventListener("click", function (e) {
            //close other lists
            close__select_lists();
            e.stopPropagation();
            let inputParent = this.parentNode;
            let selectList = inputParent.querySelector(".select__list");
            selectList.style.display = "flex";
        });
        //searching word on items
        select__search__input.addEventListener("input", function (e) {
            search__on__select__list(this, select__list);
        });
        //selecting items
        let select__list__items = select__list.querySelectorAll(".select__list__item");
        select__list__items.forEach(function (selectedListItem) {
            selectedListItem.addEventListener("click", function (e) {
                e.stopPropagation();
                if (this.dataset.value) {
                    //finding matched option on select element by given data-value
                    let matchedOption = [...selectElement.options].filter(option => option.value == this.dataset.value);
                    if (matchedOption[0]) {
                        //selecting matched option
                        selectElement.options[matchedOption[0].index].selected = true;
                        Change__Selected__Part(selectElement, selected__part, select__list);
                    }
                }
            })
        });
        //don't do anything when clicking on optgroup title
        let select__list__item__titles = select__list.querySelectorAll(".select__list__item__title");
        select__list__item__titles.forEach(function (selectedListItemTitle) {
            selectedListItemTitle.addEventListener("click", function (e) {
                e.stopPropagation();
            })
        });
    }
}

//changing selected items
function Change__Selected__Part(selectElement, selected__part, select__list) {
    //adding items based on selected options
    selected__part.innerHTML = [...selectElement.selectedOptions].map(({value, innerText}) => SelectedItemTemplate(value, innerText)).join('');
    let select__selected__removes = selected__part.querySelectorAll(".select__selected__remove");
    //when click on remove items deselect option
    select__selected__removes.forEach(function (removeItem) {
        removeItem.addEventListener("click", function (e) {
            e.stopPropagation();
            //finding matched option on select element by given data-value
            let matchedOption = [...selectElement.options].filter(option => option.value == this.dataset.value);
            //deselect matched option
            if (matchedOption[0] && selectElement.hasAttribute('multiple'))
                selectElement.options[matchedOption[0].index].selected = false
            else
                selectElement.value = "";
            //we deselect item so run the function again and create new selected items
            Change__Selected__Part(selectElement, selected__part, select__list);
        })
    })
    //highlighting selected items
    highlight__selected__items(selectElement, select__list)
}


const SelectedItemTemplate = (value, name) => `
    <li class="select__selected">
        <span class="select__selected__remove" data-value="${value}">&#10005;</span>
        <span class="select__selected__seperator"></span>
        <span>${name}</span>
    </li>
`;
const SelectListOptgroupTemplate = (name) => `
    <li class="select__list__item__title" style="display: flex;">${name}</li>
`;
const SelectListItemTemplate = (value, name) => `
    <li class="select__list__item" data-value="${value}" style="display: flex;">${name}</li>
`;

//highlighting selected items
function highlight__selected__items(selectElement, select__list) {
    let select__list__items = select__list.querySelectorAll(".select__list__item");
    select__list__items.forEach(function (selectedListItem) {
        //finding matched option on select element by given data-value
        let matchedOption = [...selectElement.selectedOptions].filter(option => option.value == selectedListItem.dataset.value);
        //highlight matched option
        if (matchedOption[0]) {
            selectedListItem.classList.add("select__item__highlighted");
        } else {
            selectedListItem.classList.remove("select__item__highlighted");
        }
    });
}

function search__on__select__list(elem, select__list) {
    //get input value
    let searchText = elem.value;
    let elements = select__list.querySelectorAll(".select__list__item");
    //converting each words to lowercase will be better for usability
    searchText = searchText.toLowerCase();
    elements.forEach(function (selectedListItem) {
        if (!selectedListItem.innerText.toLowerCase().includes(searchText)) {
            selectedListItem.style.display = "none";
        } else {
            selectedListItem.style.display = "flex";
        }
    })
}

function close__select_lists() {
    let selectLists = document.querySelectorAll(".select__list");
    if (selectLists.length) {
        selectLists.forEach(function (item) {
            item.style.display = "none"
        });
    }
}