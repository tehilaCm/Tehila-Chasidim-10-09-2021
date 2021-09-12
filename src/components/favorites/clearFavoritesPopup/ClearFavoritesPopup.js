import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Modal from "react-modal";

import "./clearFavoritesPopup.css";

Modal.setAppElement("#root");

const ClearFavoritesPopup = ({
  modalIsOpen,
  setModalIsOpen,
  clearFavorites,
}) => {
  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before",
        }}
        className={{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before",
        }}
      >
        <Container style={{ padding: "1rem" }}>
          <Row>
            <Col>
              <p style={{ whiteSpace: "normal", textAlign: "center" }}>
                Are You Sure You Want To Clear You'r History?
              </p>
            </Col>
          </Row>
          <Row className="buttons-container">
            <div
              className="buttons container"
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                className="cancel-btn"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </Button>
              <Button className="clear-btn" onClick={clearFavorites}>
                Clear
              </Button>
            </div>
            {/* <Col style={{ padding: "0" }}>
              <Button
                className="cancel-btn"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col style={{ padding: "0" }}>
              <Button className="clear-btn" onClick={clearFavorites}>
                Clear
              </Button>
            </Col> */}
          </Row>
        </Container>
      </Modal>
    </div>
  );
};

export default ClearFavoritesPopup;
