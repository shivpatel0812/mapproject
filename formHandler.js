export class FormHandler {
    constructor(formSelector) {
      this.form = document.querySelector(formSelector);
      this.initializeEventListeners();
    }
  
    initializeEventListeners() {
      if (this.form) {
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
  
      }
    }
  
    handleFormSubmit(event) {
      event.preventDefault();
      const formData = this.getFormData();
  
      if (this.validateFormData(formData)) {
        this.submitFormData(formData);
        this.clearFormFields();
   
      } else {
        alert('Please correct the form fields.');
      }
    }
  
    getFormData() {
     
      return {
        type: this.form.querySelector('.form__input--type').value,
        distance: parseFloat(this.form.querySelector('.form__input--distance').value),
        duration: parseFloat(this.form.querySelector('.form__input--duration').value),
    
      };
    }
  
    validateFormData(formData) {
      
      return Object.values(formData).every(value => value && !isNaN(value) && value > 0);
    }
  
    submitFormData(formData) {

      console.log('Form data submitted:', formData);
  
    }
  
    clearFormFields() {
   
      this.form.reset();
    }
  
   
    showForm() {
      this.form.classList.remove('hidden');
    }
  
    hideForm() {
      this.form.classList.add('hidden');
    }
  }
  