import { Blog } from '../types';

const examinedBlog: Blog = {
  title: 'second blog',
  author: 'second author',
  url: 'second_url',
  likes: 3,
};

const blogs: Blog[] = [
  {
    title: 'first blog',
    author: 'first author',
    url: 'first_url',
    likes: 1,
  },
  examinedBlog,
  {
    title: 'third blog',
    author: 'third author',
    url: 'third_url',
    likes: 2,
  },
];

const expectedBlogTitle = `${examinedBlog.title} by ${examinedBlog.author}`;

describe('Blog creation', function () {
  beforeEach(function () {
    cy.resetDB();
    cy.createUser();
  });
  describe('when user is logged in', function () {
    beforeEach(function () {
      cy.login();
      cy.visit('');
    });

    it('then new blog can be created', function () {
      cy.contains('Create new blog').click();
      cy.findByLabelText('title').type('Blog title');
      cy.findByLabelText('author').type('Blog author');
      cy.findByLabelText('url').type('blog_url');
      cy.get('button[type="submit"]').click();
      cy.contains("A new blog 'Blog title' by Blog author added");
      cy.contains('Blog title by Blog author');
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        blogs.forEach((blog) => {
          cy.createBlog(blog);
        });
        cy.reload();
      });

      it('then blogs are sorted descending by likes', function () {
        let prevLikes = Number.MAX_SAFE_INTEGER;
        cy.get('.accordion__title').each(($title) => {
          cy.wrap($title)
            .click()
            .parents('.blog-row')
            .find('.likes')
            .then(($likes) => {
              const numberOfLikes = Number($likes.text());
              expect(numberOfLikes).to.be.lte(prevLikes);
              prevLikes = numberOfLikes;
            });
        });
      });
      describe('when user opens blog details', function () {
        beforeEach(() => {
          cy.contains(expectedBlogTitle).click().parents('.blog-row').as('blogElement');
        });

        it('then user can like a blog', function () {
          cy.get('@blogElement').contains('button', 'like').click();
          cy.get('@blogElement').find('.likes').contains('4');
        });
        it('then user can delete a blog', function () {
          cy.get('@blogElement').contains('button', 'delete').click();
          cy.contains(expectedBlogTitle).should('not.exist');
        });
      });
    });
  });
});
