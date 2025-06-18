const defaultPosts = [
  {
    img: "https://placedog.net/1000?id=51",
    title: "Bull Dog",
    caption: "Juguetón de nacimiento"
  },
  {
    img: "https://placedog.net/1000?id=18",
    title: "Husky",
    caption: "El rey de la nieve"
  },
  {
    img: "https://placedog.net/800/600?id=3",
    title: "Golden Retriever",
    caption: "Leal y cariñoso"
  },
  {
    img: "https://placedog.net/1000?id=95",
    title: "Shiba Inu",
    caption: "Autista"
  },
  {
    img: "https://placedog.net/1000?id=191",
    title: "Chihuahua",
    caption: "Malas pulgas, pequeño pero matón"
  },
  {
    img: "https://placedog.net/1000?id=135",
    title: "Dalmata",
    caption: "Mi piel es un cuadro"
  }
];

function loadPosts() {
  return JSON.parse(localStorage.getItem("posts")) || defaultPosts;
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}


function renderPosts(posts) {
  const grid = document.getElementById("grid-view");
  const feed = document.getElementById("feed-view");
  grid.innerHTML = "";
  feed.innerHTML = "";

  posts.forEach(post => {

    const gridHtml = `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between">
            <span class="fw-bold">${post.title}</span>
            <span class="text-muted small">${new Date().toLocaleDateString()}</span>
          </div>
          <img src="${post.img}" class="post-img" alt="Post image" />
          <div class="card-body">
            <p class="text-muted mb-0">${post.caption}</p>
          </div>
        </div>
      </div>`;

  
    const feedHtml = `
      <div class="col-12">
        <div class="card shadow-sm">
          <img src="${post.img}" class="post-img" alt="Post image" />
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <span class="fw-bold">${post.title}</span>
              <small class="text-muted">${new Date().toLocaleDateString()}</small>
            </div>
            <p class="text-muted mb-0">${post.caption}</p>
          </div>
        </div>
      </div>`;

    grid.insertAdjacentHTML("beforeend", gridHtml);
    feed.insertAdjacentHTML("beforeend", feedHtml);
  });
}


document.getElementById('newPostBtn').addEventListener('click', () => {
  new bootstrap.Modal(document.getElementById('newPostModal')).show();
});

// Guardar nuevo post y renderizar
document.getElementById('newPostForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('postTitle').value.trim();
  const image = document.getElementById('postImage').value.trim();
  const caption = document.getElementById('postCaption').value.trim();

  if (title && image && caption) {
    const posts = loadPosts();
    posts.push({ title, img: image, caption });
    savePosts(posts);
    renderPosts(posts);
    bootstrap.Modal.getInstance(document.getElementById('newPostModal')).hide();
    e.target.reset();
  }
});

// Renderizar posts iniciales
renderPosts(loadPosts());
