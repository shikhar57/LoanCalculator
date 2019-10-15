# Loan Calculator

An app that will calculate your monthly installments and Interest rate based on the input of Total Amount of the loan and the duration that the user wants it for.

Installation : 
    • npm install 
    • npm start

Dependencies/Libraries : 
Material UI, Lodash, React-redux, thunk.

About : 
The project structure is modular with component driven approach. Classes have been used for state manipulation and prop use. Loan API response is stored through redux so that it is available to sidebar as well apart from the data available in localStorage.
OnClick of sidebar after any search resets the values from the sidebar as the Loan amount and Duration; and sends response as per these two.
All the currencies are in dollar($) and time duration in months.

