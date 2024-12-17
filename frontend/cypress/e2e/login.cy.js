describe('Prueba de aceptación - Inicio de sesión', () => {
    it('Debería iniciar sesión y redirigir al home', () => {
      // Navega a la página de login
      cy.visit('/auth'); // Ruta relativa gracias a `baseUrl`
  
      // Verifica que el campo de email es visible y lo completa
      cy.get('#email', { timeout: 20000 })
        .should('be.visible')
        .type('admin@email.com'); // Cambia según tus credenciales
  
      // Verifica que el campo de contraseña es visible y lo completa
      cy.get('input[name="password"]', { timeout: 20000 })
        .should('be.visible')
        .type('admin123'); // Cambia según tus credenciales
  
      // Verifica que el botón de login es visible y hace clic
      cy.get('button[type="submit"]')
        .should('be.visible')
        .click();
  
      // Verifica que se redirige correctamente al home
      cy.url().should('eq', 'http://localhost:5173/'); // Cambia si tu home está en otra ruta
  
      // Verifica que el mensaje de bienvenida está presente
      cy.contains('Bienvenido a la Plataforma de Gestión').should('be.visible');
    });
  });
  