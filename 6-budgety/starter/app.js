// Budget controller module (IIFE that returns an object with public methods)
let budgetController = (function() {
    // Private variables and functions

    // Add new budget entry to data structure

    // Calculate total budget
    
    return {
        // Returning an object with all the public methods

    }
})();

// UI controller module
let UIController = (function() {
    // Private variables and functions

    

    

    // Update UI: new total budget
    
    return {
        // Returning an object with all the public methods

    }
})();

// App controler knows about the other two modules
let appController = (function(budgetCtrl, UICtrl) {
    // Private variables and functions
    
    //
    var ctrlAddEntry = function() {
        // 1. Get from UI: Input values for new budget entry 

        // 2. Add entry to the budget controller

        // 3. Update UI: Add new budget entry

        // 4. Calculate total budget

        // 5. Update UI: New total budget
        console.log('It works');
    }

    // Event handlers for new budget entry submit
    document.querySelector('.add__btn').addEventListener('click', ctrlAddEntry);
    document.addEventListener('keypress', function(e) {
        // Only fire if key is 'return'
        if (e.keyCode === 13 || e.which === 13) { // which to support older browsers 
            ctrlAddEntry();
        }
    });

    return {
        // Returning an object with all the public methods

    }
})(budgetController, UIController);