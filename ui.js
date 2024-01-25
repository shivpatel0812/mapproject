export const UIController = {
 
    toggleVisibility(selector, isVisible) {
      const element = document.querySelector(selector);
      if (element) {
        element.style.display = isVisible ? '' : 'none';
      }
    },
  
  
    updateTextContent(selector, text) {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = text;
      }
    },
  
 
    addClass(selector, className) {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add(className);
      }
    },

    removeClass(selector, className) {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.remove(className);
      }
    },
    


    showAlert(message, type = 'info') {
      const alertBox = document.createElement('div');
      alertBox.className = `alert alert-${type}`;
      alertBox.textContent = message;
      document.body.appendChild(alertBox);
  
      setTimeout(() => {
        alertBox.remove();
      }, 3000);
    }
  };
  