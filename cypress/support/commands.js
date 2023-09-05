Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Beto')
    cy.get('#lastName').type('Sam')

    cy.get('#email').type('jsbsam_lb@hotmail.com')
    cy.get('#phone').type('1198434-1824')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button' ,'Enviar').click()
cy.get('.success').should('be.visible')
})