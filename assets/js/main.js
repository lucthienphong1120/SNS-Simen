const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const bulletList = document.getElementsByClassName('bullet')
const bulletListAr = Array.from(bulletList)
const bullets = $('.bullets')
const imageList = $('.image__list')

let currentIndex = 0
bulletList[currentIndex].classList.add('selected');

const changeImageAnimate = (index) => {
    destroyImage(index)
    const imageItem = document.getElementsByClassName(`image__item${index}`)
    imageList.insertAdjacentHTML("beforeend", `<div class='image__item${index}'></div>`)
    const w = imageItem[0].offsetWidth
    for (let i = 1; i < 5; i++) {
        imageList.insertAdjacentHTML("beforeend", `<div class='image__item${index}'></div>`)
        imageItem[i].style.backgroundPosition = `-${w * i}px 0`
        imageItem[i].style.left = `${(w - 1) * i}px`
        imageItem[i].style.animationDelay = `${i * 0.1}s`
    }
    Array.from(imageItem).forEach(el => el.style.zIndex = '2')
}

const destroyImage = (index) => {
    const ImageItem = document.getElementsByClassName(`image__item${index}`)
    ImageItem.length && Array.from(ImageItem).forEach(el => el.remove())
}

const hiddenImage = (index) => {
    const imageItem = document.getElementsByClassName(`image__item${index}`)
    Array.from(imageItem).forEach(el => {
        el.style.zIndex = '1'
    })
}
changeImageAnimate(currentIndex)

const inactivityTime = function() {
    var time;
    window.onload = resetTimer;
    // Change selected when click
    bullets.onclick = (event) => {
        resetTimer
        if (bulletListAr.find(bullet => bullet === event.target)) {
            bulletList[currentIndex].classList.remove('selected')
            event.target.classList.add('selected');
            const bulletSeleted = $('.bullet.selected')
            if (bulletListAr.indexOf(bulletSeleted) !== currentIndex) {
                hiddenImage(currentIndex)
                const nextIndex = bulletListAr.indexOf(bulletSeleted)
                currentIndex = nextIndex
                changeImageAnimate(currentIndex)
            }
        }
    }

    function logout() {
        bulletList[currentIndex].classList.remove('selected')
        hiddenImage(currentIndex)
        currentIndex++;
        if (currentIndex >= bulletList.length) { currentIndex = 0 }
        bulletList[currentIndex].classList.add('selected')
        changeImageAnimate(currentIndex)
    }

    function resetTimer() {
        clearInterval(time)
        time = setInterval(logout, 5000)
    }
};
inactivityTime()

// Hover icon of product
const boxInnerItems = document.getElementsByClassName('box-inner__item')

function getParent(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

Array.from(boxInnerItems).forEach(item => {
    item.onmouseover = function() {
        const productImgInfo = getParent(this, '.product-img-info')
        productImgInfo.style.overflow = 'initial'
        this.onmouseout = () => productImgInfo.style.overflow = 'hidden'
    }
})

// Scroll horizontal next and prew Button
function scrollHorizontal($menu, $items, timer = 0) {
    const $nextButton = $menu.querySelector('.next-button')
    const $prewButton = $menu.querySelector('.prew-button')
    let menuWidth = $menu.clientWidth
    let itemWidth = $items[0].clientWidth
    let wrapWidth = $items.length * itemWidth

    let scrollSpeed = 0
    let oldScrollY = 0
    let scrollY = 0
    let y = 0

    const lerp = (v0, v1, t) => {
        return v0 * (1 - t) + v1 * t
    }


    const dispose = (scroll) => {
        gsap.set($items, {
            x: (i) => {
                return i * itemWidth + scroll
            },
            modifiers: {
                x: (x, target) => {
                    const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x))
                    return `${s}px`
                }
            }
        })
    }
    dispose(0)

    const handleMouseWheel = (e) => {
        scrollY -= e.deltaY * 0.9
    }

    let touchStart = 0
    let touchX = 0
    let isDragging = false
    const handleTouchStart = (e) => {
        touchStart = e.clientX || e.touches[0].clientX
        isDragging = true
        $menu.classList.add('is-dragging')
    }
    const handleTouchMove = (e) => {
        if (!isDragging) return
        touchX = e.clientX || e.touches[0].clientX
        scrollY += (touchX - touchStart) * 2.5
        touchStart = touchX
    }

    const handleTouchEnd = () => {
        isDragging = false
        scrollY -= scrollY % itemWidth
        $menu.classList.remove('is-dragging')
    }

    // $menu.addEventListener('mousewheel', handleMouseWheel)

    $menu.addEventListener('touchstart', handleTouchStart)
    $menu.addEventListener('touchmove', handleTouchMove)
    $menu.addEventListener('touchend', handleTouchEnd)

    $menu.addEventListener('mousedown', handleTouchStart)
    $menu.addEventListener('mousemove', handleTouchMove)
    $menu.addEventListener('mouseleave', handleTouchEnd)
    $menu.addEventListener('mouseup', handleTouchEnd)

    $menu.addEventListener('selectstart', () => { return false })

    window.addEventListener('resize', () => {
        menuWidth = $menu.clientWidth
        itemWidth = $items[0].clientWidth
        wrapWidth = $items.length * itemWidth
    })

    const nextSlider = () => scrollY -= itemWidth
    if (timer) setInterval(nextSlider, timer)

    if ($nextButton) $nextButton.onclick = nextSlider
    if ($prewButton) $prewButton.onclick = () => scrollY += itemWidth

    const render = () => {
        requestAnimationFrame(render)
        y = lerp(y, scrollY, .1)
        dispose(y)

        scrollSpeed = y - oldScrollY
        oldScrollY = y

        gsap.to($items, {
            skewX: -scrollSpeed * .2,
            rotate: scrollSpeed * .01,
            scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
        })
    }
    render()

}


const sliderScrollHorizontal = [{
        menu: document.querySelector('.products__most-viewed__container'),
        items: document.querySelectorAll('.products__most-viewed__col'),
        timer: 0
    },
    {
        menu: document.querySelector('.products__lastest-posts__container'),
        items: document.querySelectorAll('.products__lastest-posts__item'),
        timer: 0
    },
    {
        menu: document.querySelector('.donor-logo__container'),
        items: document.querySelectorAll('.donor-logo__item'),
        timer: 3000
    }
]
sliderScrollHorizontal.forEach(el => {
    scrollHorizontal(el.menu, el.items, el.timer)
})