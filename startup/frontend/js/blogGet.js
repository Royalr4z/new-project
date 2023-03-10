

const params = new URLSearchParams(window.location.search);

const title = params.get('title');
const content = params.get('content');
const img = params.get('imageUrl').toString();

if (title && content && img){
    const contentBlog = document.getElementById('content-blog');
    const titleBlog = document.getElementById('title-blog');
    const imgBlog = document.getElementById('img-blog');

    titleBlog.classList.remove('display-1');
    titleBlog.classList.remove('text-danger');
    
    if (img == false) {
        img = 'img/blog-2.jpg'
    }
    imgBlog.src = img
    titleBlog.innerHTML = title
    contentBlog.innerHTML = content
} else {
    window.location.href = './blog.html';
}

fetch(`http://localhost:4000/blogs/orderby`)
    .then(response => response.json())
    .then(blogs => {
        for (let i in blogs.blog) {
            if (blogs.blog[i].imageUrl == false) {
                blogs.blog[i].imageUrl = 'img/blog-2.jpg'
            }
            const recentPostItens = document.getElementById('recent-post-itens');

            let recentPost = `
                    <div class="d-flex rounded overflow-hidden mb-3 bg-light border border-primary" style="border-radius: 200px;">
                        <img class="img-fluid" src="${blogs.blog[i].imageUrl}" style="width: 100px; height: 100px; object-fit: cover;" alt="">
                            <a href="detail.html?title=${blogs.blog[i].title}&imageUrl=${blogs.blog[i].imageUrl}&content=${blogs.blog[i].content}" 
                            class="h5 fw-semi-bold d-flex align-items-center px-3 mb-0 text-dark">${blogs.blog[i].title}
                        </a>
                    </div>`
            recentPostItens.innerHTML += recentPost;
        }
    })
    .catch(err => console.log(err))