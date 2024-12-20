/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from "../Button";
import { useContext } from "react";
import { ModalContext } from "../../utils/contexts";
import Spinner from "../Spinner";

const ButtonsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

// Check Before Confirm Div
const CheckContainer = styled.div`
  /* margin: 0.2rem; */
  width: 40rem;
  height: 15rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
`;

const CheckTextDiv = styled.div`
  width: 100%;
  & span {
    text-align: center;
    font-weight: 500;
    color: var(--color-grey-200);
    /* text-justify: inter-ideograph; */
  }
`;

function CheckBeforeConfirm({ text, handleClick, isLoading = null }) {
  const { close: closeModal } = useContext(ModalContext);

  function finalHandleClick() {
    handleClick();
    if (!isLoading) {
      closeModal();
    }
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <CheckContainer>
      <CheckTextDiv>
        <span>
          {text ||
            "You already have some ongoing order. Do you wish Overwrite the previous order with new one?"}
        </span>
      </CheckTextDiv>
      <ButtonsDiv>
        <Button
          size="medium"
          variation="primary"
          onClick={finalHandleClick}
          className="no-outside-click"
        >
          Continue
        </Button>
        <Button size="medium" variation="secondary">
          Cancel
        </Button>
      </ButtonsDiv>
    </CheckContainer>
  );
}

export default CheckBeforeConfirm;
