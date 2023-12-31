function IcEdit(props) {
    return (
        <svg
            style={{
                fontSize: props?.fontSize ?? 20,
            }}
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5786 1.5214C10.9952 1.10484 11.6706 1.10485 12.0871 1.5214L14.4776 3.91193C14.8942 4.32849 14.8942 5.00386 14.4776 5.42042L6.40454 13.4935C6.27636 13.6217 6.11763 13.7151 5.94333 13.7649L2.01968 14.886C1.46649 15.044 0.955044 14.5326 1.1131 13.9794L2.23414 10.0557C2.28394 9.88143 2.37734 9.72269 2.50552 9.59451L10.5786 1.5214ZM11.5214 2.08709C11.4173 1.98295 11.2485 1.98295 11.1443 2.08709L10.2319 2.99951L12.9995 5.76716L13.912 4.85474C14.0161 4.7506 14.0161 4.58175 13.912 4.47761L11.5214 2.08709ZM12.4339 6.33284L9.66621 3.56519L3.0712 10.1602C3.03916 10.1922 3.01581 10.2319 3.00336 10.2755L1.91528 14.0838L5.72355 12.9957C5.76712 12.9832 5.80681 12.9599 5.83885 12.9278L12.4339 6.33284Z"
                fill={props?.color ? 'currentColor' : "#138300"}
            />
        </svg>
    );
}
export default IcEdit;
