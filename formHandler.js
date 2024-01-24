export class FormHandler {
    constructor(formSelector) {
      this.form = document.querySelector(formSelector);
      this.initializeEventListeners();
    }
  
    initializeEventListeners() {
      if (this.form) {
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
        // Add other event listeners if necessary
      }
    }
  
    handleFormSubmit(event) {
      event.preventDefault();
      const formData = this.getFormData();
  
      if (this.validateFormData(formData)) {
        this.submitFormData(formData);
        this.clearFormFields();
        // Any additional actions after form submission
      } else {
        alert('Please correct the form fields.');
      }
    }
  
    getFormData() {
      // Extract and return data from form fields
      // Example:
      return {
        type: this.form.querySelector('.form__input--type').value,
        distance: parseFloat(this.form.querySelector('.form__input--distance').value),
        duration: parseFloat(this.form.querySelector('.form__input--duration').value),
        // Add other form fields as needed
      };
    }
  
    validateFormData(formData) {
      // Implement validation logic
      // Example: Check if all fields are filled and numbers are positive
      return Object.values(formData).every(value => value && !isNaN(value) && value > 0);
    }
  
    submitFormData(formData) {
      // Handle the form data submission logic
      // This might involve calling other functions to process the data
      console.log('Form data submitted:', formData);
      // Example: You can emit an event or call a callback function with the form data
    }
  
    clearFormFields() {
      // Reset the form fields after submission
      this.form.reset();
    }
  
    // Additional methods as needed, for example, for toggling form visibility
    showForm() {
      this.form.classList.remove('hidden');
    }
  
    hideForm() {
      this.form.classList.add('hidden');
    }
  }
  