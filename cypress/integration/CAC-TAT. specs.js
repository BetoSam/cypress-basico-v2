
///  <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() 
{this.beforeEach(function(){
    cy.visit('./src/index.html')
})
    it('verifica o título da aplicação', function() {
 
 cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

    })
it('preenche os campos os campos obrigatórios e envia o formulario', function(){
    const longText ='vfhhfvhfhfhvdhuvfdshuvhvcgvcgjvzxgjvcxgvcxghvcxghcxvghxchcxvgxhcxghcxghghxzgzxhcxghcxzghczxghghxzzxghcghcghghxzzxghcghcghzxghzxcgzxhcghzcghzcxghzghxzcghcghcghczxghzxcghzxghxzzghxcgccvjdjbbhfhfghdvhuvsuhvfuvfusvuvsuvuvuvyusvfyuvsyuvyusvyusvyusvyuvyu'
    cy.get('#firstName').type('Beto')
    cy.get('#lastName').type('Sam')

    cy.get('#email').type('jsbsam_lb@hotmail.com')
    cy.get('#phone').type('1198434-1824')
    cy.get('#open-text-area').type(longText , { delay : 0 })
cy.contains('button' ,'Enviar').click()
cy.get('.success').should('be.visible')
})
it(' exibir mensagem de erro com email de formatação invalidas ', function(){
    cy.get('#firstName').type('Beto')
    cy.get('#lastName').type('Sam')

    cy.get('#email').type('jsbsam_lb@hotmail,com')
    cy.get('#phone').type('1198434-1824')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button' ,'Enviar').click()
cy.get('.error').should('be.visible')
})
it(' campo telefone continua vazio com preencher dados não numericos  ', function(){
    cy.get('#phone')
    .type('hfvhfhusfhuf')
  .should('have.value' ,"")
  })
  it(' mensagem de erro com telefone  de formatação invalidas ', function(){
    cy.get('#firstName').type('Beto')
    cy.get('#lastName').type('Sam')

    cy.get('#email').type('jsbsam_lb@hotmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button' ,'Enviar').click()
cy.get('.error').should('be.visible')
})
it('preenche e limpa os campos nome , sobrenome , email e telefone ', function(){
    cy.get('#firstName').type('Beto')
    .should('have.value' ,"Beto")
    .clear()
    .should('have.value' ,"")
    cy.get('#lastName').type('Sam')
    .clear()
    .should('have.value' ,"")
    cy.get('#phone')
    .type('11984341824')
    .should('have.value' ,"11984341824")
    .clear()
    .should('have.value' ,"")

})
it('exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios ' , function(){
    cy.contains('button' ,'Enviar').click()
    cy.get('.error ').should('be.visible')
})
it('envie um formulario com sucesso usando um comando costumizados  ' , function(){
   cy.fillMandatoryFieldsAndSubmit()
   cy.get('.success').should('be.visible')
})
it('selecione um produto( Yotube ) por texto ' , function(){
    cy.get('#product').select('YouTube')
    .should('have.value' ,'youtube')
})
it('selecione um produto(Mentoria) por texto ' , function(){
    cy.get('#product').select('mentoria')
    .should('have.value' ,'mentoria')
})
it('selecione um produto(blog) por seu indicie ' , function(){
    cy.get('#product').select(1)
    .should('have.value' ,'blog')
})
it('marca  o campo de atendimento "Feedback' , function(){
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value' ,'feedback')
})
it('marca cada tipo e atendimento ' , function(){
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
cy.wrap($radio).check()
cy.wrap($radio).should('be.checked')
    })
    
})
it('marca ambos checkbox , depois desmarca o útimo ', function(){
cy.get('input[type="checkbox"]')
.check()
.last()
.uncheck()
.should('not.be.checked')
})
it('selecione um arquivo da pasta fixtures ' ,function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input){
        console.log($input)
expect($input[0].files[0].name).to.equal('example.json')

    })
})
it('selecione um arquivo simulando drag-and-drop' ,function(){

    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json' , {action: 'drag-drop'})
    .should(function($input){
        console.log($input)
expect($input[0].files[0].name).to.equal('example.json')
})

})
it('seleciona um arquivo utlizando uma fixture para qual dada um alias' , function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')  
    })
})
it('verifica que a politica de privacidade abre em outra aba  sem nescessidade de um clique ' , function(){
cy.get('#privacy a').should('have.attr','target','_blank')
})
it('acessa a página da politica de privacidade removendo o target e então clicar ' , function(){
    cy.get('#privacy a')
    .invoke('removeAttr','target')
    .click()
    cy.contains('Talking About Testing').should('be.visible')
})
})