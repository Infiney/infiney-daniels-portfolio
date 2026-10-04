const category = document.body.dataset.category;
const storageKey = `portfolio-video-posts-${category}`;
const form = document.querySelector("#video-form");
const fileInput = document.querySelector("#video-file");
const posts = document.querySelector("#posts");

function renderPosts() {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  posts.innerHTML = saved.length ? "" : '<p class="post-empty">Your video journal is ready for its first post. Share a walkthrough, lesson, or project update above.</p>';
  saved.forEach((post, index) => {
    const card = document.createElement("article");
    card.className = "post-card";
    card.innerHTML = `<video controls src="${post.url}" aria-label="${post.title}"></video><h3>${post.title}</h3><p>${post.description || "No description added."}</p><button class="remove-post" type="button" data-index="${index}">Remove post</button>`;
    posts.appendChild(card);
  });
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const file = fileInput.files[0];
  if (!file) return;
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  saved.unshift({
    title: document.querySelector("#video-title").value.trim() || file.name,
    description: document.querySelector("#video-description").value.trim(),
    url: URL.createObjectURL(file)
  });
  localStorage.setItem(storageKey, JSON.stringify(saved));
  form.reset();
  renderPosts();
});

posts?.addEventListener("click", (event) => {
  if (!event.target.matches(".remove-post")) return;
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  saved.splice(Number(event.target.dataset.index), 1);
  localStorage.setItem(storageKey, JSON.stringify(saved));
  renderPosts();
});

renderPosts();
