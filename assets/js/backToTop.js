function handleBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top')
    window.addEventListener("scroll", scrollFunction)

    function scrollFunction() {
        window.scrollY > 300 ? backToTopButton.classList.add('show') : backToTopButton.classList.remove('show')
    }

    backToTopButton.addEventListener("click", smoothScrollBackToTop)

    function smoothScrollBackToTop() {
        const targetPosition = 0
        const startPosotion = window.scrollY
        const distance = targetPosition - startPosotion
        const duration = 750
        let start = null

        window.requestAnimationFrame(step)

        function step(timestamp) {
            if (!start) start = timestamp
            const progress = timestamp - start
            window.scrollTo(0, easeInOutCubic(progress, startPosotion, distance, duration))
            if (progress < duration) window.requestAnimationFrame(step)
        }
    }
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t * t + b
    t -= 2
    return c / 2 * (t * t * t + 2) + b
}
handleBackToTopButton()