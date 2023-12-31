import React from 'react'

function IcEyeOpen(props) {
    const { eyeState, handleEyeOnOff } = props
    return (
        <>
            {eyeState && (
                <svg
                    onClick={handleEyeOnOff}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.8192 13.4022C16.0873 7.48312 7.91302 7.48312 5.18115 13.4022C5.00757 13.7783 4.56198 13.9424 4.18589 13.7689C3.8098 13.5953 3.64563 13.1497 3.81921 12.7736C7.08734 5.69265 16.913 5.69265 20.1812 12.7736C20.3547 13.1497 20.1906 13.5953 19.8145 13.7689C19.4384 13.9424 18.9928 13.7783 18.8192 13.4022Z"
                        fill="#707070"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 12.588C12.6904 12.588 13.25 13.1148 13.25 13.7645C13.25 14.4143 12.6904 14.941 12 14.941C11.3096 14.941 10.75 14.4143 10.75 13.7645C10.75 13.1148 11.3096 12.588 12 12.588ZM14.75 13.7645C14.75 12.3351 13.5188 11.1763 12 11.1763C10.4812 11.1763 9.25 12.3351 9.25 13.7645C9.25 15.1939 10.4812 16.3527 12 16.3527C13.5188 16.3527 14.75 15.1939 14.75 13.7645Z"
                        fill="#707070"
                    />
                </svg>
            )}
        </>
    )
}

export default IcEyeOpen
