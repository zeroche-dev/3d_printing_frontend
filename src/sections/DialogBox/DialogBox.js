import React, {useRef, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "@material-tailwind/react";

const DialogBox = ({showModal, modalHandler, titleModal, descriptionModal}) => {

    const setValue = (newValue) => {
        modalHandler(false, newValue);
    }

    return(
        <Modal size="sm" active={showModal} toggler={() => setValue(false)}>
            <ModalHeader toggler={() => setValue(false)}>
                {titleModal}
            </ModalHeader>
            <ModalBody>
                <p className="text-base leading-relaxed text-gray-600 font-normal">
                    {descriptionModal}
                </p>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="red"
                    buttonType="link"
                    onClick={(e) => setValue(false)}
                    ripple="dark"
                >
                    Nie
                </Button>

                <Button
                    color="lightBlue"
                    onClick={(e) => setValue(true)}
                    ripple="light"
                >
                    Tak
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default DialogBox;