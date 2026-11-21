const emailTujuan = "alifptrp458@gmal.com";

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Menu navigasi untuk tampilan HP.
menuBtn.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Tampilkan inisial jika foto belum ditambahkan atau nama file salah.
document.querySelectorAll(".photo-wrap").forEach((wrap) => {
  const photo = wrap.querySelector(".photo");
  const fallback = wrap.querySelector(".photo-fallback");

  const showPhoto = () => fallback.classList.add("hide");
  const showFallback = () => fallback.classList.remove("hide");

  photo.addEventListener("load", showPhoto);
  photo.addEventListener("error", showFallback);

  if (photo.complete && photo.naturalWidth > 0) showPhoto();
  else if (photo.complete) showFallback();
});

// Animasi elemen ketika masuk ke layar.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("show"));
}

// Tahun footer otomatis mengikuti tahun saat ini.
document.getElementById("year").textContent = new Date().getFullYear();

// Formulir akan membuka aplikasi email pengguna.
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (emailTujuan === "alifptrp458@gmail.com") {
    return;
  }

  const nama = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const pesan = document.getElementById("message").value.trim();

  const subjek = encodeURIComponent(`Pesan portofolio dari ${nama}`);
  const isi = encodeURIComponent(`Nama: ${nama}\nEmail: ${email}\n\nPesan:\n${pesan}`);
  window.location.href = `mailto:${emailTujuan}?subject=${subjek}&body=${isi}`;
});


// Latar partikel yang bergerak halus di belakang seluruh konten.
(() => {
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let particles = [];
  let frameId = null;

  const makeParticle = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.45,
    speedX: (Math.random() - 0.5) * 0.28,
    speedY: (Math.random() - 0.5) * 0.28,
    alpha: Math.random() * 0.5 + 0.2
  });

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const amount = Math.min(105, Math.max(38, Math.floor((width * height) / 15000)));
    particles = Array.from({ length: amount }, makeParticle);
    draw();
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      if (!reduceMotion) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < -5) particle.x = width + 5;
        if (particle.x > width + 5) particle.x = -5;
        if (particle.y < -5) particle.y = height + 5;
        if (particle.y > height + 5) particle.y = -5;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190, 180, 255, ${particle.alpha})`;
      ctx.fill();

      for (let next = index + 1; next < particles.length; next += 1) {
        const other = particles[next];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 112) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(137, 123, 225, ${(1 - distance / 112) * 0.15})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    });

    if (!reduceMotion) frameId = window.requestAnimationFrame(draw);
  };

  window.addEventListener("resize", () => {
    if (frameId) window.cancelAnimationFrame(frameId);
    resize();
  });

  resize();
})();
