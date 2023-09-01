import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Form />);
    waitFor(()=>{
      const formContainer = document.querySelector(".FormContainer");
      expect(formContainer).toBeInTheDocument(); 
      expect(formContainer.children.length).toBeGreaterThan(1);
      const name=formContainer.findByText("Nom");
      expect(name).toBeInTheDocument();
      const firstName = formContainer.findByText("Prénom");
      expect(firstName).toBeInTheDocument();
      const email = formContainer.findByText("Email");
      expect(email).toBeInTheDocument();
    })
  });
});

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      const onSuccess = jest.fn();
    const onError = jest.fn();
    const onSubmit = jest.fn();
    const openSuccessModal = jest.fn();
    const { container } = render(<Form onSubmit={onSubmit} onSuccess={onSuccess} onError={onError} />);
    waitFor(() => {
      const submitButton = container.querySelector('button[type="submit"]');
      expect(submitButton).toBeInTheDocument();
      submitButton.innerTextContent = "Envoyer";
      onSubmit.mockImplementation(()=> {
        submitButton.innerTextContent = "En cours";
        submitButton.disabled = true;
        onSuccess();
        expect(submitButton.innerTextContent).toBe("En cours");
        openSuccessModal("Message envoyé avec succès");
        submitButton.innerTextContent = "Envoyer";
        expect(submitButton.innerTextContent).toBe("envoyer");
      });
      
      fireEvent.click(submitButton);
      expect(onSubmit).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
      expect(screen.findByText("En cours")).toBeInTheDocument();
      expect(onError).not.toHaveBeenCalled();
      expect(openSuccessModal).toHaveBeenCalledWith("Message envoyé avec succès");

    });
  });

});
