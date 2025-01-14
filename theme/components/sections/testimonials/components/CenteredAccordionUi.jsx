import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'


export default function Example(items) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-3 sm:py-4 lg:px-8 lg:py-5">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
       
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {items?.items?.map((item) => (
              <Disclosure key={item?.title} as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold">{item?.title}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {/* through css to rotate arrow */}
                          <ChevronDownIcon
                            aria-hidden="true"
                            className={`h-6 w-6 transform transition-transform duration-300 ${
                              open ? 'rotate-180' : ''
                            }`}
                          />
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-600">{item.description}</p>
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
