import React from 'react';
import { Tooltip } from 'react-tooltip';
import whatsappIcon from '../../images/whatsApp.png'; // Import your WhatsApp icon

const WhatsApp = () => {
    const phoneNumber = +919999532041

    const handleClick = () => {
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div>
            <img
                src={whatsappIcon}
                alt="WhatsApp"
                onClick={handleClick}
                className='cursor-pointer w-16'
                data-tooltip-id="whatsapp-tooltip"
                data-tooltip-content="Click to chat with us"
                data-tooltip-place="top"
            // style={{ cursor: 'pointer' }}
            />
            <Tooltip
                id="whatsapp-tooltip"
                style={{
                    backgroundColor: "#25D366",
                    color: "#ffffff",
                    borderRadius: "10px",
                    padding: "20px"
                }}
                place="top"
                animation="fade"
                delayShow={200} // delay before showing in ms
                delayHide={300} // delay before hiding in ms
            // offset={10} // distance in pixels
            // arrow={true}
            // arrowColor="#25D366"
            >

            </Tooltip >

        </div>

    );
};

export default WhatsApp;