const getIframeDocument = () => {
  return cy.get('.h-captcha > iframe')
  // Cypress yields jQuery element, which has the real
  // DOM element under property "0".
  // From the real DOM iframe element we can get
  // the "document" element, it is stored in "contentDocument" property
  // Cypress "its" command can access deep properties using dot notation
  // https://on.cypress.io/its
  .its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
  // get the document
  return getIframeDocument()
  // automatically retries until body is loaded
  .its('body').should('not.be.undefined')
  // wraps "body" DOM element to allow
  // chaining more Cypress commands, like ".find(...)"
  .then(cy.wrap)
}


describe('Visit Demo Page', () => {
  it('Submit Message and Solve Captcha',async () => {
    cy.visit('http://demo.captcha.com:3333/demo');
    cy.wait(1000)  
    cy.get('input[name="message"]').type('type your new value', { force: true });
    getIframeBody().find('#checkbox').click({force:true})
    cy.wait(5000)
    cy.get('form').submit()
  })
})