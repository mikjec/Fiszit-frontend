import { useState } from "react";

export default function Dropdown({
    align = "right",
    width = "48",
    contentClasses = "py-1 bg-white",
    trigger,
    content,
    children,
    className = "",
    ...props
}) {
    const [open, setOpen] = useState(false);

    const alignmentClasses =
        align === "left"
            ? "ltr:origin-top-left rtl:origin-top-right start-0"
            : align === "top"
              ? "origin-top"
              : "ltr:origin-top-right rtl:origin-top-left end-0";

    const widthClasses = width === "48" ? "w-48" : width;

    return (
        <div className={`relative ${className}`} {...props}>
            <div onClick={() => setOpen(!open)}>{trigger || children}</div>

            {open && (
                <div
                    className={`absolute z-50 mt-2 ${widthClasses} rounded-md shadow-lg ${alignmentClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div
                        className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}
                    >
                        {content || children}
                    </div>
                </div>
            )}

            {open && (
                <div className="fixed inset-0" onClick={() => setOpen(false)} />
            )}
        </div>
    );
}
