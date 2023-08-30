import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError, resetForm }) => {
  
  const [sending, setSending] = useState(false);
  const [fields, setFields] = useState({
    nom: "",
    prenom: "",
    email: "",
    message: "",
  });

  const handleFieldChange = (fieldName, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };
  useEffect(() => {
    
    if (resetForm) {
      setFields({
        nom: "",
        prenom: "",
        type: "",
        email: "",
        message: "",
      });
      setSending(false);
      
    }
  }, [resetForm]);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      if(!fields.nom || !fields.prenom || !fields.email || !fields.message){
        setSending(false);
        onError("requiredFields")
        return;
      }

      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        onSuccess("success")
        setSending(false);
      } catch (err) {
        onError("error");
        setSending(false);
      }
    },
    [onSuccess, onError, fields]
    
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" value={fields.nom} onChange={(value) => handleFieldChange("nom", value)} />
          <Field placeholder="" label="Prénom" value={fields.prenom}onChange={(value) => handleFieldChange("prenom", value)} />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" value={fields.email} onChange={(value) => handleFieldChange("email", value)} />
          <Button type={BUTTON_TYPES.SUBMIT}
           disabled={sending}
           data-testid="button-test-id">
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder=""
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={fields.message}
            onChange={(value) => handleFieldChange("message", value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  resetForm : PropTypes.bool,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
  resetForm:  false,
}

export default Form;
