"use client";

import { useState } from "react";
import { CSSObjectWithLabel } from "react-select";

export type DevItems = {
    title: string,
    content: JSX.Element,
}

export type DropdownItem = {
    value: number | undefined,
    label: string | undefined,
}

export const dropdownStyles = {
    control: (base: CSSObjectWithLabel, { isFocused }: any) => ({
        ...base,
        backgroundColor: "#4b5563", // gray-600
        borderRadius: "0.5rem",
        minHeight: "43px",
        boxShadow: "none",
        borderColor: isFocused ? "#16a34a" : "#6b7280", // green-500, gray-500
        "&:hover": {
            borderColor: "#16a34a", // green-500
        },
    }),
    menu: (base: CSSObjectWithLabel) => ({
        ...base,
        backgroundColor: "#4b5563", // gray-600
    }),
    option: (base: CSSObjectWithLabel, { isFocused }: any) => ({
        ...base,
        backgroundColor: isFocused ? "#16a34a" : "#4b5563", // green-500, gray-600
        "&:hover": {
            backgroundColor: "#16a34a", // green-500
        },
        color: "white",
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "white",
    }),
    multiValue: (base: CSSObjectWithLabel) => ({
        ...base,
        backgroundColor: "#e5e7eb", // gray-200
        fontSize: "1.05rem",
        marginRight: "0.375rem",
        borderRadius: "6px",
    }),
    multiValueLabel: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "black",
        margin: "2px 4px",
    }),
    multiValueRemove: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "black",
        backgroundColor: "#e5e7eb", // gray-200
        borderTopRightRadius: "6px",
        borderBottomRightRadius: "6px",
    }),
    clearIndicator: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "#d1d5db", // gray-300
        "&:hover": {
            color: "#16a34a", // green-600
        },
    }),
    loadingIndicator: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "#d1d5db", // gray-300
    }),
    indicatorSeparator: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "#d1d5db", // gray-300
    }),
    dropdownIndicator: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "#d1d5db", // gray-300
        "&:hover": {
            color: "#16a34a", // green-600
        },
    }),
    placeholder: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "#d1d5db", // gray-300
        paddingLeft: "0.25rem",
    }),
    input: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "white",
    }),
    noOptionsMessage: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "white",
    }),
    loadingMessage: (base: CSSObjectWithLabel) => ({
        ...base,
        color: "white",
    }),
};

export default function Accordion({ items }: { items: any; }): JSX.Element {

    const [activeIndex, setActiveIndex] = useState(4);

    const handleClick = (index: number) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <div className="px-3 sm:px-0 mx-auto w-full md:w-1/2 space-y-4">
            {items.map((item: DevItems, index: number) => (
                index === activeIndex ? <>
                    <div key={item.title} className="min-w-full bg-gray-700 border-2 border-green-500 rounded-lg">
                        <button onClick={() => handleClick(index)} className="w-full p-3 text-left text-2xl font-semibold text-green-500">{item.title}</button>
                        {index === activeIndex && <>
                            <div className="p-3">
                                <div className="pt-8 px-8 pb-10 mb-2 bg-gray-800 rounded-md">
                                    {item.content}
                                </div>
                            </div>
                        </>
                        }
                    </div>
                </> : <>
                    <div key={item.title} className="min-w-full bg-gray-500 hover:bg-gray-600 border-2 rounded-lg">
                        <button onClick={() => handleClick(index)} className="w-full p-3 text-left text-2xl font-semibold text-white">{item.title}</button>
                    </div>
                </>
            ))}
        </div>
    );
}