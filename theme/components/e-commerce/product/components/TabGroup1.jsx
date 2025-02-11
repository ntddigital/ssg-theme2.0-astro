'use client'

// import {
//     Tab,
//     TabGroup,
//     TabList,
//     TabPanel,
//     TabPanels,
// } from '@headlessui/react'


// export default function TabGroup1(props) {
//     const {images=[] } = props
 
//     return (
//         <>
//         {/* {children} */}
//         <TabGroup className="flex flex-col-reverse">
//             {/* Image selector */}
//             <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
//                 <TabList className="grid grid-cols-4 gap-6">
//                     {images?.map((image) => (
//                         <Tab
//                             key={image.id}
//                             className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden"
//                         >
//                             <span className="sr-only">{image.name}</span>
//                             <span className="absolute inset-0 overflow-hidden rounded-md">
//                                 <img alt="" src={image.src} className="size-full object-cover" />
//                             </span>
//                             <span
//                                 aria-hidden="true"
//                                 className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-indigo-500"
//                             />
//                         </Tab>
//                     ))}
//                 </TabList>
//             </div>

//             <TabPanels>
//                 {images?.map((image) => (
//                     <TabPanel key={image.id}>
//                         <img alt={image.alt} src={image.src} className="aspect-square w-full object-cover sm:rounded-lg" />
//                     </TabPanel>
//                 ))}
//             </TabPanels>
//         </TabGroup>
//         </>
//     )
// }



import { useEffect } from 'react'

export default function TabGroup1({ images = [],children }) {
    
    useEffect(() => {
        const tabs = document.querySelectorAll(".tab-button");
        const tabPanels = document.querySelectorAll(".tab-panel");

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                // Remove active class from all tabs
                tabs.forEach((t) => t.classList.remove("active"));
                tabPanels.forEach((panel) => panel.classList.add("hidden"));

                // Add active class to the clicked tab
                tab.classList.add("active");
                tabPanels[index].classList.remove("hidden");
            });
        });

        // Set first tab and panel active by default
        tabs[0]?.classList.add("active");
        tabPanels[0]?.classList.remove("hidden");
    }, [images]);

    return (
        <div className="flex flex-col-reverse">
          {children}
        </div>
    );
}
