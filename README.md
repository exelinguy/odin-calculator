# odin-calculator

Calculator project as per The Odin Project instructions:

    1. The calculator is going to contain functions for all of the basic math operators you typically find on calculators, so start by creating functions for the following items and testing them in the browser’s console:
        - add
        - subtract
        - multiply
        - divide
    2.  A calculator operation will consist of a number, an operator, and another number. For example, 3 + 5. Create three variables, one for each part of the operation. You’ll use these variables to update the display later.
    Create a new function operate that takes an operator and two numbers and then calls one of the above functions on the numbers.
    Create a basic HTML calculator with buttons for each digit and operator (including =).
        Don’t worry about making them functional just yet.
        There should also be a display for the calculator. Go ahead and fill it with some dummy numbers so it looks correct.
        Add a “clear” button.
    3. Create the functions that populate the display when you click the digit buttons. You should store the content of the display (the number) in a variable for use in the next step.
    4. Make the calculator work! You’ll need to store the first and second numbers input by the user and then operate() on them when the user presses the = button, according to the operator that was selected between the numbers.
        You should already have the code that can populate the display, so once operate has been called, update the display with the result of the operation.
        This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.
    5. Gotchas: watch out for and fix these bugs if they show up in The code:
        The calculator should not evaluate more than a single pair of numbers at a time. For example, this is how The calculator should function:
            Enter a number (12).
            Enter an operator (+).
            Enter a second number (7).
            Enter a second operator (-). At this point, it should evaluate the initial pair of numbers (12 + 7), then display the result (19).
            Enter another number (1).
            Enter another operator or equals sign (=). At this point, it should use the previous result (19) as the first number, the operator (-), and the new number (1) to calculate the new equation 19 - 1. You should see the result (18) on the display.
            To see what this looks like in action, feel free to input the equation we just explained 12 + 7 - 1 = into this online calculator.

        -  You should round answers with long decimals so that they don’t overflow the display.
        - Pressing = before entering all of the numbers or an operator could cause problems!
        - Pressing “clear” should wipe out any existing data. Make sure the user is really starting fresh after pressing “clear”.
        - Display a snarky error message if the user tries to divide by 0… and don’t let it crash The calculator!
        - Make sure that The calculator only runs an operation when supplied with two numbers and an operator by the user. Example: you enter a number (2), followed by an operator button (+). You press the operator button (+) a second consecutive time. The calculator should not evaluate this as (2 + 2) and should not display the result (4). If consecutive operator buttons are pressed, The calculator should not run any evaluations, it should only take the last operator entered to be used for the next operation.
        - When a result is displayed, pressing a new digit should clear the result and start a new calculation instead of appending the digit to the existing result. Check whether this is the case on The calculator!
