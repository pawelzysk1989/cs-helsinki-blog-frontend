describe('Blog creation', function () {
  beforeEach(function () {
    cy.resetDB();
    cy.createUser();
  });
  describe('when logged in', function () {
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
        cy.createBlog({
          title: 'first blog',
          author: 'first author',
          url: 'first_url',
        });
        cy.createBlog({
          title: 'second blog',
          author: 'second author',
          url: 'second_url',
        });
        cy.reload();
      });
      it('then user can like a blog', function () {
        cy.contains('second blog by second author')
          .click()
          .parents('.blog-row')
          .as('blogElement');

        cy.get('@blogElement').find('.likes').contains('0');

        cy.get('@blogElement').contains('button', 'like').click();

        cy.get('@blogElement').find('.likes').contains('1');
      });
      it('then user can delete a blog', function () {
        cy.contains('second blog by second author')
          .click()
          .parents('.blog-row')
          .as('blogElement');

        cy.get('@blogElement').contains('button', 'delete').click();
      });
    });
  });
});

export {};
