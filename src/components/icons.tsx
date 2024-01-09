import { SVGProps } from "react";

const iconsObject = {
    "arrow-left": {
        viewBox: "0 0 24 24",
        path: (
            <>
                <path d="m15 18-6-6 6-6" />
            </>
        ),
    },
    "arrow-right": {
        viewBox: "0 0 24 24",
        path: (
            <>
                <path d="m9 18 6-6-6-6" />
            </>
        ),
    },
    trash: {
        viewBox: "0 0 24 24",
        path: (
            <>
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </>
        ),
    },
    xCross: {
        viewBox: "0 0 24 24",
        path: (
            <>
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path
                    d="m9 9 6 6"
                    style={{
                        transform: "rotate(90deg)",
                    }}
                />
            </>
        ),
    },
};
export type TIconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const Icons = ({
    size = 16,
    width,
    height,
    color = "none",
    name,
    ...props
}: TIconSvgProps & { name: keyof typeof iconsObject }) => {
    const icon = iconsObject[name];
    return (
        <svg
            height={size || height}
            width={size || width}
            viewBox={icon.viewBox}
            fill={color}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {icon.path}
        </svg>
    );
};
