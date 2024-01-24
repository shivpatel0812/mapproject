export const UIController = {
    // Method to update the visibility of an element
    toggleVisibility(selector, isVisible) {
      const element = document.querySelector(selector);
      if (element) {
        element.style.display = isVisible ? '' : 'none';
      }
    },
  
    // Method to update text content of an element
    updateTextContent(selector, text) {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = text;
      }
    },
  
    // Method to add a class to an element
    addClass(selector, className) {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add(className);
      }
    },
  
    // Method to remove a class from an element
    removeClass(selector, className) {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.remove(className);
      }
    },
  
    // More UI methods as required by your application
  
    // Example: Method to create and show an alert message
    showAlert(message, type = 'info') {
      const alertBox = document.createElement('div');
      alertBox.className = `alert alert-${type}`;
      alertBox.textContent = message;
      document.body.appendChild(alertBox);
  
      // Automatically remove the alert after some time
      setTimeout(() => {
        alertBox.remove();
      }, 3000);
    }
  };
  