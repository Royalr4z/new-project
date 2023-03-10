module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const Blogs = {
            id: req.body.id,
            date: req.body.date,
            title: req.body.title,
            subtitle: req.body.subtitle,
            imageUrl: req.body.imageUrl,
            content: req.body.content,
            tag: req.body.tag,
            userId: req.body.userId
        }
        try {
            
            existsOrError(Blogs.title, 'Informe o Título!')
            existsOrError(Blogs.subtitle, 'Informe o Descrição!')
            existsOrError(Blogs.content, 'Coloque o Conteúdo!')
            existsOrError(Blogs.userId, 'Informe o Usuário!')
            existsOrError(Blogs.tag, 'Informe a Categoria!')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        app.db('blogs')
                .insert(Blogs)
                .then(_ => res.status(204).send(_))
                .catch(err => res.status(500).send(err))
    }

    const get = async (req, res) => {
        const { page, limit } = req.query;
        const offset = (page - 1) * limit;
        const [countResult] = await app.db('blogs').count();
        const totalCount = countResult.count;
        const totalPages = Math.ceil(totalCount / limit);

        app.db('blogs')
            .join('users', 'users.id', 'blogs.userId')
            .select('blogs.id', 'blogs.date', 'blogs.tag', 'blogs.title',
             'blogs.subtitle', 'blogs.imageUrl', 'blogs.content', 'blogs.userId', 'users.name')
            .offset(offset)
            .limit(limit)
            .then(blog => res.json({
                blog,
                pagination: {
                    page,
                    limit,
                    totalCount,
                    totalPages,
                },
            }))
            .catch(err => res.status(500).send(err))
    }

    const getOrderBy = async (req, res) => {
        const { page, limit } = req.query;
        const [countResult] = await app.db('blogs').count();
        const totalCount = countResult.count;

        app.db('blogs')
            .join('users', 'users.id', 'blogs.userId')
            .select('blogs.id','blogs.title', 'blogs.imageUrl')
            .limit(6)
            .orderBy('blogs.id', 'desc')
            .then(blog => res.json({
                blog,
                pagination: {
                    page,
                    limit,
                    totalCount,
                },
            }))
            .catch(err => res.status(500).send(err))
    }


    const getById = (req, res) => {
        app.db('blogs')
            .join('users', 'users.id', 'blogs.userId')
            .select('blogs.id', 'blogs.date', 'blogs.tag', 'blogs.title',
             'blogs.subtitle', 'blogs.imageUrl', 'blogs.content', 'blogs.userId', 'users.name')
            .where({ id: req.params.id })
            .first()
            .then(blog => res.json(blog))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da não informado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getOrderBy, getById, remove }
}