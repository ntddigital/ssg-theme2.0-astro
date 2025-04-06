import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { cn } from "@/utils/cn";

export default function Example(props) {
  const { classes, items } = props;
  return (
    <div>
      <div className="mx-auto max-w-7xl py-3 sm:py-4 lg:py-5">
        <div className="mx-auto max-w-5xl divide-y divide-gray-900/10">
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {items?.map((item) => (
              <Disclosure key={item?.title} as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <DisclosureButton
                        className={cn(
                          "group flex w-full items-start justify-between text-left text-gray-900 dark:text-white"
                        )}
                      >
                        <span
                          className={cn(
                            "text-lg font-semibold",
                            classes?.items?.title,
                            item?.classes?.title
                          )}
                          dangerouslySetInnerHTML={{ __html: item?.title }}
                        ></span>
                        <span
                          className={cn(
                            "ml-6 flex h-7 items-center ",
                            classes?.items?.icon?.bg,
                            item?.classes?.icon?.bg
                          )}
                        >
                          {/* through css to rotate arrow */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="24"
                            height="24"
                            strokeWidth="2"
                            aria-hidden="true"
                            className={cn(
                              `h-6 w-6 transform transition-transform duration-300  ${open ? "rotate-180" : ""}`,
                              classes?.items?.icon?.text,
                              item?.classes?.icon?.text
                            )}
                          >
                            {" "}
                            <path d="M6 9l6 6l6 -6"></path>{" "}
                          </svg>
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p
                        className={cn(
                          "text-lg dark:text-white",
                          classes?.items?.description,
                          item?.classes?.description
                        )}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
