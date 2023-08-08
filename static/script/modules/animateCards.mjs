export default function animateCard(target) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            entry.target.classList.toggle('show', entry.isIntersecting);    // if the entry.isIntersecting === true, add 'show' class else remove 'show' class...

            if (entry.isIntersecting) observer.unobserve(target);
        })
    }, {
        threshold: 0.8
    });
    observer.observe(target);
}