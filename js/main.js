/* ===== DATA ===== */
const reviews = [
  { author: "Ankita S. – Wakad", text: "Dr. Sneha Joshi, the gynecologist at Pulse, was incredibly supportive during my high-risk pregnancy. Her calm approach and expertise made all the difference." },
  { author: "Ramesh T. – Ravet",  text: "I had a knee replacement done by Dr. Pravin Deshmukh from the orthopedics department. The recovery was smooth and faster than expected. Highly recommend Pulse!" },
  { author: "Meena R. – Hinjewadi", text: "Thanks to Dr. Sameer Kulkarni, our father recovered fully after a stroke. The ICU care was excellent and the nursing team was attentive 24x7." },
  { author: "Kunal P. – Tathawade", text: "Dr. Rutuja Mehta from dermatology explained my condition in simple terms and helped me get visible results within weeks. I’m so grateful." },
];


/* ===== INJECT CARDS ===== */
const container = document.getElementById("scrollableCards");
reviews.forEach((r) => {
  container.insertAdjacentHTML(
    "beforeend",
    `
    <article class="review-card">
      <div class="review-header">
        <div class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
        <span class="review-author">${r.author}</span>
      </div>
      <p class="review-text">${r.text}</p>
    </article>
  `
  );
});


/* ===== GSAP SCROLL REVEAL (ONLY CARDS) ===== */
gsap.registerPlugin(ScrollTrigger);
const cards = document.querySelectorAll(".review-card");
cards.forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: .7,
    ease: "power2.out",
    delay: i * .12,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});





// faq 

/* ===== GSAP SCROLL REVEAL ===== */
gsap.registerPlugin(ScrollTrigger);
const items = document.querySelectorAll(".faq-accordion .accordion-item");
items.forEach((it, i) => {
  gsap.to(it, {
    opacity: 1,
    y: 0,
    duration: .7,
    ease: "power2.out",
    delay: i * .12,
    scrollTrigger: {
      trigger: it,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

/* ===== THREE.JS BACKDROP ===== */
const canvas = document.getElementById("threeCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, .1, 100);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

/* lights */
scene.add(new THREE.AmbientLight(0xffffff, .4));
const dir = new THREE.DirectionalLight(0xffffff, .8);
dir.position.set(5, 5, 5); scene.add(dir);

/* soft particles */
const geom = new THREE.SphereGeometry(.06, 16, 16);
const mat = new THREE.MeshStandardMaterial({ color: 0x9bc9ff, transparent: true, opacity: .6 });
for (let i = 0; i < 80; i++) {
  const m = new THREE.Mesh(geom, mat);
  m.position.set((Math.random() - .5) * 20, (Math.random() - .5) * 15, (Math.random() - .5) * 10);
  scene.add(m);
}

/* parallax mouse move */
let mx = 0, my = 0;
window.addEventListener("mousemove", e => {
  mx = (e.clientX / window.innerWidth) * 2 - 1;
  my = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);
  camera.position.x += (mx * 3 - camera.position.x) * .03;
  camera.position.y += (my * 2 - camera.position.y) * .03;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
animate();

/* resize */
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});


// doctor