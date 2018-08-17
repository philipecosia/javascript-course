// Budget controller module (IIFE that returns an object with public methods)
let budgetController = (function() {
    // Private variables and functions

    // Data structure for income and expense (objects) & function contructors
    let Expense = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };

    let Income = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };

    let data = {
        allEntries: {
            expense: [],
            income: [],
        },
        totals: {
            expense: 0,
            income: 0,
        },
    };
    // Add new budget entry to data structure

    // Calculate total budget
    
    return {
        // Returning an object with all the public methods

        // Add budget entry
        addEntry: function(type, desc, value) {
            let newEntry, ID;

            // Retrieve last id and create new one by adding 1
            if (data.allEntries[type].length > 0 ) {
                // TODO understand how we select the object here!
                ID = data.allEntries[type][data.allEntries[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new object based in type
            if (type === 'expense') {
                newEntry = new Expense(ID, desc, value);
            } else if (type === 'income') {
                newEntry = new Expense(ID, desc, value);
            } else {}

            // Push into data structure and return new element
            data.allEntries[type].push(newEntry);
            return newEntry;
        },
    };
})();

// UI controller module
let UIController = (function() {
    // Private
    let DOMstrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
    };

    // Update UI: new total budget
    
    return {
        // Public
        // Get from UI: Input values for new budget entry 
        getInput: function() {
            return { // return an anonymous public object with 3 user input values
                type: document.querySelector(DOMstrings.inputType).value, // +income or -expense
                desc: document.querySelector(DOMstrings.inputDesc).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        },
        
        addListItem: function(obj, type) {
            let html, htmlData, element;
            
            // Create HTML string with placeholders
            if (type === 'income') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'; 
            } else if (type === 'expense') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete">´<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace placeholders with data
            htmlData = html.replace('%id%', obj.id);
            htmlData = htmlData.replace('%desc%', obj.desc);
            htmlData = htmlData.replace('%value%', obj.value);

            // Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', htmlData);

        },

        clearInputFields: function() {
            //document.querySelector(DOMstrings.inputType).value = '';
            document.querySelector(DOMstrings.inputDesc).value = '';
            document.querySelector(DOMstrings.inputValue).value = '';

            document.querySelector(DOMstrings.inputDesc).focus();
        },
    };
})();

// App controler knows about the other two modules and tells them what to do then gets result back
let appController = (function(budgetController, UIController) {
    // Private variables and functions

    let ctrlAddEntry = function() {
        let input, newEntry;

        // Get from UI: Input values for new budget entry 
        input = UIController.getInput();

        // Clear input fields
        UIController.clearInputFields();

        // Add entry in budget controller
        newEntry = budgetController.addEntry(input.type, input.desc, input.value);

        // Update UI: Add new budget entry
        UIController.addListItem(newEntry, input.type);

        // Calculate total budget

        // Update UI: New total budget
    };

    let setupEventListeners = function() {
        let DOMstrings = UIController.getDOMstrings();
        // New budget entry submit
        document.querySelector(DOMstrings.inputBtn).addEventListener('click', ctrlAddEntry);
        document.addEventListener('keypress', function(e) {
            // Only fire if key is 'return'
            if (e.keyCode === 13 || e.which === 13) { // which to support older browsers 
                ctrlAddEntry();
            }
        });
    };
    
    return {
        // Returning an object with all the public methods
        init: function() {
            console.log('Application has started');
            setupEventListeners();
        }
    };
})(budgetController, UIController);

// Initialize application
appController.init();