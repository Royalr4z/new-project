
const itensPerPage = 4;
let currentPage = 1;

let counter = 1
let counterVld = 1
let validation = true

let counterRecentPost = 1

function load() {

    fetch(`http://localhost:4000/blogs?page=${currentPage}&limit=${itensPerPage}`)
        .then(response => response.json())
        .then(blogs => {
        
            if (blogs.pagination.totalCount / itensPerPage <= counterVld) {
                validation = false
            } else {
                validation = true
            }

            for (let i in blogs.blog) {
                const blogItens = document.getElementById('blog-itens');


                if (blogs.blog[i].imageUrl == false) {
                    blogs.blog[i].imageUrl = 'img/blog-2.jpg'
                }

                let itemBlog = `
                <div class="col-md-6 wow slideInUp mb-4" data-wow-delay="0.1s" id="item-${counter}">
                    <div class="blog-item bg-light rounded overflow-hidden">
                        <div class="blog-img position-relative overflow-hidden">
                            <img class="img-fluid" src="${blogs.blog[i].imageUrl}" alt="" 
                                style="height: 200px; width: 100%;">
                            <a class="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4" href="">${blogs.blog[i].tag}</a>
                        </div>
                        <div class="p-4">
                            <div class="d-flex mb-3">
                                <small class="me-3"><i class="far fa-user text-primary me-2"></i>${blogs.blog[i].name}</small>
                                <small><i class="far fa-calendar-alt text-primary me-2"></i>${blogs.blog[i].date}</small>
                            </div>
                            <h4 class="mb-3">${blogs.blog[i].title}</h4>
                            <p>${blogs.blog[i].subtitle}</p>
                            <a class="text-uppercase" 
                            href="detail.html?title=${blogs.blog[i].title}&imageUrl=${blogs.blog[i].imageUrl}&content=${blogs.blog[i].content}">
                            Leia Mais <i class="bi bi-arrow-right"></i></a>
                        </div>
                    </div>
                </div>`

                if (counter === itensPerPage) {
                    counter = 1
                } else {
                    counter++
                }


                blogItens.innerHTML += itemBlog;
            }
        })
        .catch(err => console.log(err))
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
                

function Next() {
    if (validation === true) {
        for (let i = 1; i <= itensPerPage; i++) {
            let id = String(i);
            let items = `item-${id}`
            let element = document.getElementById(items);
            if (element) {
                element.remove();
            }
        }      

        currentPage++
        counterVld++
        load()
    }

}

function Previous() {
    
    if (currentPage === 1) {

    } else {
        for (let i = 1; i <= itensPerPage; i++) {
            let id = String(i);
            let items = `item-${id}`
            let element = document.getElementById(items);
            if (element) {
                element.remove();
            }
        }
        currentPage--
        counterVld--

        load()
    }
}

load()