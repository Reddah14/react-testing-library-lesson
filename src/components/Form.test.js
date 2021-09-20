import { render, screen } from '@testing-library/react'; // importins screen object
import Form from './Form';
import userEvent from '@testing-library/user-event';

/*
 * Code Along - explore some queries (getBy..) and assertions (expect()....)
 */
it("should render the basic fields", () => {
    // Arrange
    render(<Form />) // simulating the rendering of the component

    // Act                  //{ name: /name/i }-> this will grab the name in between the tags and make it case insensitive(this will act like and includes, so as long as 'includes' this name will get the role)
    const nameInput = screen.getByRole("textbox", { name: /name/i }); // we get the input from Form and store it in a var (input has the "role" of textbox)
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    // Assert
    expect(nameInput).toBeInTheDocument(); // checking if the element is been rendered
    expect(emailInput).toBeInTheDocument();
});

/*
 * Code Along - Check the screen shows a 'Something went wrong' message
 */
 it ("should not submit the form with invalid credentials and show warnings", () => {
        // act
        render(<Form />);

        // arrange
        const nameInput = screen.getByRole("textbox", { name: /name/i });
        userEvent.type(nameInput, ""); // simulating that user is entering an empty string as name input

        const emailInput = screen.getByRole("textbox", { name: /email/i });
        userEvent.type(emailInput, "notvalidemail");

                    // run a click on sign in button
        userEvent.click(screen.getByRole("button", { name: /Sign In/i }));

        // assert
        const alert = screen.getByText("Sorry something went wrong");
        expect(alert).toBeTruthy();
                // use queryByText when we check for something that will not be on the page (otherwise will throw an error!)
        const success = screen.queryByText("Thank you for submitting! We'll be in touch");
        expect(success).toBeFalsy();
 });

/*
 * CHALLENGE: Check the screen shows "Thank you for submitting" when valid credentials are input
 */

 // .. Write your code here..


