import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

export default function Example(items) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-3 sm:py-4 lg:py-5">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">

          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {items?.items?.map((item) => (
              <Disclosure key={item?.title} as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                        <span
                          className="text-lg font-semibold"
                          dangerouslySetInnerHTML={{ __html: item?.title }}
                        ></span>
                        <span className="ml-6 flex h-7 items-center">
                          {/* through css to rotate arrow */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2" aria-hidden="true"
                            className={`h-6 w-6 transform transition-transform duration-300 ${open ? 'rotate-180' : ''
                              }`}> <path d="M6 9l6 6l6 -6"></path> </svg>

                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p
                        className="text-lg text-gray-600"
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
  )
}
