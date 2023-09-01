import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
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

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      const onSuccess = jest.fn();
    const onError = jest.fn();
    const onSubmit = jest.fn();
    const openSuccessModal = jest.fn();
    const { container } = render(<Home onSubmit={onSubmit} onSuccess={onSuccess} onError={onError} />);
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
        
      });
      
      fireEvent.click(submitButton);
      expect(onSubmit).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
      expect(screen.findByText("En cours")).toBeInTheDocument();
      expect(onError).not.toHaveBeenCalled();
      expect(openSuccessModal).toHaveBeenCalledWith("Message envoyé avec succès");
      expect(submitButton.innerTextContent).toBe("Envoyer");
    });
  });

});


describe('When a page is created', () => {

  
  it('a list of events is displayed', () => {
    const { container } = render(<Home />);
    const eventsDiv = container.querySelector("#events")
    waitFor(() => {
      const galleryDiv = eventsDiv.querySelector('.EventCard');
      expect(galleryDiv).toBeInTheDocument();
      
      const imgElements = galleryDiv.querySelectorAll('img');
      expect(imgElements.length).toBeGreaterThan(1);
    });
  });

});
  it("a list a people is displayed", () => {
    const { container } = render(<Home />);
    const peopleDiv = container.querySelector('.PeoplesContainer');
    
    waitFor(() => {
      expect(peopleDiv).toBeInTheDocument();
      const peopleCard = peopleDiv.querySelector('.PeopleCard')
      expect(peopleCard.length).toBeGreaterThan(1)
    });
  })
  it("a footer is displayed", () => {
    const { container } = render(<Home />);
    const footer = container.querySelector('.row');
    waitFor(()=> {
      expect(footer).toBeInTheDocument();
    })
    
  })
  it("an event card, with the last event, is displayed", () => {
    const { container } = render(<Home />);
    const footer = container.querySelector('.row')
    waitFor(() => {
      const globalEvents = Array.from(container.querySelectorAll('.EventCard'));

      const sortedData = globalEvents.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
      );

      const eventCard = footer.querySelector('.EventCard');
      expect(eventCard).toBeInTheDocument();
      expect(eventCard.date).toEqual(sortedData[0].date);
    });
    
  })
});
