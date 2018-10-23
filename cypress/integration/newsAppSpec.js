describe('News click behaviour', () => {
  it('Make fourth news active after click on it', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.c-news-item')
      .as('news')
      .should('have.length', 10);

    cy.get('@news')
      .eq(4)
      .click()
      .should('have.class', 'active');
  });
});

describe('Load more behaviour', () => {
  it('Shows 10 news after loading', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.c-news-item')
      .should('have.length', 10);
  });

  it('Load 10 more news after click load more button', () => {
    cy.get('.load-more-button')
      .click();

    cy.get('.c-news-item')
      .should('have.length', 20);
  });
});

describe('Update search field and search behaviour', () => {
  it('New news list will be showed when update search field', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.c-news-item')
      .should('have.length', 10);

    cy.get('.c-news-item .item-title')
      .then($news => {
        const text = $news.text();

        cy.get('.search-input')
          .clear()
          .type('moscow{enter}');

        cy.wait(2000) // wait for the new news list request finishing
          .then(() => {
            cy.get('.c-news-item .item-title')
              .invoke('text')
              .should('not.equal', text);
          });
      });
  });
});