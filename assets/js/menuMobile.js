const menuMobile = document.querySelector('.menu-button-mobile')
const navsubMenuItems = menuMobile.querySelectorAll('.navsub-menu__item')

const items = Array.from(navsubMenuItems).map(navsubMenuItem => {
    const openCloseButton = navsubMenuItem.firstElementChild.querySelector('.btn__open-close')
    const child1Menu = navsubMenuItem.lastElementChild

    return {
        openCloseButton: openCloseButton,
        child1Menu: child1Menu
    }
})

Array.from(navsubMenuItems).forEach(navsubMenuItem => {
    const openCloseButton = navsubMenuItem.firstElementChild.querySelector('.btn__open-close')
    const child1Menu = navsubMenuItem.lastElementChild
    const child1MenuItems = child1Menu.querySelectorAll('.navsub-menu__children-1__item')

    openCloseButton && openCloseButton.addEventListener("click", function() {
        Array.from(items).forEach(({ openCloseButton, child1Menu }) => {
            if (openCloseButton && openCloseButton !== this && openCloseButton.classList.contains('open')) {
                openCloseButton.classList.remove('open')
                child1Menu.style.height = 0
            }
        })
        this.classList.toggle('open')
        if (child1Menu.clientHeight) {
            child1Menu.style.height = 0
        } else {
            child1Menu.style.height = child1Menu.scrollHeight + 'px'
        }
    })

    const childItems = Array.from(child1MenuItems).map(child1MenuItem => {
        const childButton = child1MenuItem.querySelector('.btn__open-close')
        const child2Menu = child1MenuItem.querySelector('.navsub-menu__children-2')
        return {
            childButton: childButton,
            child2Menu: child2Menu
        }
    })

    Array.from(child1MenuItems).forEach(child1MenuItem => {
        const childButton = child1MenuItem.querySelector('.btn__open-close')
        const child2Menu = child1MenuItem.querySelector('.navsub-menu__children-2')
        if (childButton) {
            childButton.addEventListener("click", function() {
                Array.from(childItems).forEach(({ childButton, child2Menu }) => {
                    if (childButton !== this && childButton.classList.contains('open')) {
                        childButton.classList.remove('open')
                        child2Menu.style.height = 0
                    }
                })
                this.classList.toggle('open')
                if (child2Menu.clientHeight) {
                    child2Menu.style.height = 0
                } else {
                    child2Menu.style.height = child2Menu.scrollHeight + 'px'
                    child1Menu.style.height = child1Menu.scrollHeight + child2Menu.style.height
                }
            })
        }
    })
})

const menuButtonMobile = menuMobile.querySelector('.fas.fa-bars')
const menuMobileModal = menuMobile.querySelector('.menu-button-mobile__modal')
menuButtonMobile.addEventListener("click", function() {
    menuMobileModal.classList.toggle('show')
})

menuMobileModal.addEventListener("click", function(e) {
    (e.target === this) && menuMobileModal.classList.toggle('show')
})