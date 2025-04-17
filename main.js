const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h2", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".steps__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".explore__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".job__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".offer__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
});


async function fetchJobs() {
  try {
    const response = await fetch('/api/jobs'); // Changed URL
    const jobs = await response.json();
    const jobGrid = document.querySelector('.job__grid');
    jobGrid.innerHTML = '';

    jobs.forEach(job => {
      const jobCard = document.createElement('div');
      jobCard.classList.add('job__card');
      jobCard.innerHTML = `
        <div class="job__card__header">
          <div>
            <h5><span class="math-inline">\{job\.company\}</h5\>
<h6>{job.location}</h6>
</div>
</div>
<h4>job.title</h4><p>{job.description.substring(0, 150)}...</p>
<div class="job__card__footer">
<span>job.type</span><span>{job.salary ? $${job.salary}/Year : 'Negotiable'}</span>
<span>Posted: ${new Date(job.postedDate).toLocaleDateString()}</span>
</div>
`;
jobGrid.appendChild(jobCard);
});
} catch (error) {
console.error('Error fetching jobs:', error);
}
}
