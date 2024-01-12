"use client";

import { useState } from "react";
import { DevItems } from "./dropdown-configuration";

export default function Accordion({ items }: { items: any; }): JSX.Element {

    const [activeIndex, setActiveIndex] = useState(7);

    const handleClick = (index: number) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <div className="developer-accordion px-3 sm:px-0 mx-auto w-full md:w-1/2 space-y-4">
            {items.map((item: DevItems, index: number) => (
                index === activeIndex ? <>
                    <div key={item.title} className="min-w-full bg-gray-700 border-2 border-green-500 rounded-lg">
                        <button onClick={() => handleClick(index)} className="w-full p-3 text-left text-2xl font-semibold text-green-500">{item.title}</button>
                        {index === activeIndex && <>
                            <div className="p-3">
                                <div className="pt-6 px-4 pb-10 mb-2 bg-gray-800 rounded-md">
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