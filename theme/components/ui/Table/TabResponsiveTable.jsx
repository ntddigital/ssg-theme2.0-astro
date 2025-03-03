import { Fragment } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

// const items = [
//   {
//     title: 'Plan A',
//     link: '#',
//     columns: {
//       column1: [
//         {
//           itemTitle: 'Smart TV Alliance <p class="text-sm">(LG, PHILIPS, TOSHIBA, PANASONIC)</p>',
//           itemStatus: true,
//         },
//         { itemTitle: 'Feature 2', itemStatus: '1' },
//         { itemTitle: 'Feature 3', itemStatus: '3' },
//         { itemTitle: 'Feature 4', itemStatus: false },
//         { itemTitle: 'Feature 5', itemStatus: false },
//       ],
//       column2: [
//         { itemTitle: 'Feature A', itemStatus: true },
//         { itemTitle: 'Feature B', itemStatus: false },
//         { itemTitle: 'Feature C', itemStatus: false },
//         { itemTitle: 'Feature D', itemStatus: false },
//       ],
//       column3: [
//         { itemTitle: 'Feature X', itemStatus: true },
//         { itemTitle: 'Feature Y', itemStatus: false },
//         { itemTitle: 'Feature Z', itemStatus: false },
//         { itemTitle: 'Feature W', itemStatus: false },
//       ],
//     },
//   },
// more ...
//   },
// ];

export default function TableResponsive(props) {
  const { items } = props;
  // Calculate the number of columns (arrays) dynamically
  const columnCount = items.length;
  const columnWidth = 100 / (columnCount + 1);
  return (
    <>
      <table className="w-full text-center mt-8 p-8 max-sm:hidden sm:mt-16 bg-white rounded-lg">
        <caption className="sr-only">Table</caption>
        <colgroup>
          <col className={`w-[${columnWidth}%]`} />
          {Array.from({ length: columnCount }).map((_, index) => (
            <col key={index} className={`w-[${columnWidth}%]`} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <td className="p-0" />
            {items.map((tier) => (
              <th key={tier.title} scope="col" className="p-0">
                <div className="text-xl font-semibold" dangerouslySetInnerHTML={{ __html: tier.title }}></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(items[0].columns).map((columnKey) => (
            <Fragment key={columnKey}>
              <tr>
                <th scope="colgroup" colSpan={items.length + 1} className="px-0 pt-10 pb-0 group-first-of-type:pt-5">
                  <div
                    className="rounded-lg bg-gray-50 px-4 py-3 text-xl/6 text-left font-semibold text-gray-950"
                    dangerouslySetInnerHTML={{ __html: columnKey }}
                  ></div>
                </th>
              </tr>
              {items[0].columns[columnKey].map((feature, featureIndex) => (
                <tr key={featureIndex} className="border-b border-gray-100 last:border-none">
                  <th
                    scope="row"
                    className="py-4 px-2 text-lg text-left font-normal text-gray-900"
                    dangerouslySetInnerHTML={{ __html: feature.itemTitle }}
                  ></th>
                  {items.map((tier, tierIndex) => (
                    <td key={tierIndex} className="p-4 max-sm:text-center">
                      {typeof tier.columns[columnKey][featureIndex]?.itemStatus === 'string' ? (
                        <span
                          className="text-lg text-700-950"
                          dangerouslySetInnerHTML={{
                            __html: tier.columns[columnKey][featureIndex].itemStatus,
                          }}
                        ></span>
                      ) : (
                        <>
                          {tier.columns[columnKey][featureIndex]?.itemStatus === true ? (
                            // <CheckIcon aria-hidden="true" className="inline-block size-4 fill-green-600" />
                            // <Icon name="tabler:check" class="w-4 h-4 inline-block  fill-green-600" />
                            // check icon
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
                              class="w-4 h-4 inline-block  text-green-600"
                            >
                              <path d="M5 12l5 5l10 -10"></path>{' '}
                            </svg>
                          ) : (
                            // <MinusIcon aria-hidden="true" className="inline-block size-4 fill-gray-400" />
                            // minus icon
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
                              class="w-4 h-4 inline-block  text-gray-600"
                            >
                              <path d="M5 12l14 0"></path>{' '}
                            </svg>
                          )}
                          <span
                            className="sr-only"
                            dangerouslySetInnerHTML={{
                              __html: tier.columns[columnKey][featureIndex]?.itemStatus ? 'Yes' : 'No',
                            }}
                          ></span>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>

      {/* Mobile Tabs */}
      <TabGroup className="sm:hidden rounded-lg bg-white mt-8 p-8">
        {items.some((tier) => tier?.title) && (
          <TabList className="flex flex-wrap justify-between gap-2">
            {items.map((tier) =>
              tier?.title ? (
                <Tab
                  key={tier.title}
                  className="ring-1 shadow-xs ring-gray-300 ring-inset rounded-full py-2 font-medium flex-grow"
                  dangerouslySetInnerHTML={{ __html: tier.title }}
                />
              ) : null
            )}
          </TabList>
        )}

        <TabPanels as={Fragment}>
          {items.map((tier) => (
            <TabPanel key={tier.title}>
              {Object.keys(tier.columns).map((columnKey) => (
                <Fragment key={columnKey}>
                  <div
                    className="-mx-6 mt-10 rounded-lg bg-gray-50 px-6 py-3 text-xl/6 font-semibold text-gray-950 group-first-of-type:mt-5"
                    dangerouslySetInnerHTML={{ __html: columnKey }}
                  ></div>
                  <dl>
                    {tier.columns[columnKey].map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="grid grid-cols-2 border-b border-gray-100 py-4 last:border-none"
                      >
                        <dt
                          className="text-xl/6 font-normal text-gray-600"
                          // dangerouslySetInnerHTML={{ __html: columnKey }}
                          dangerouslySetInnerHTML={{
                            __html: feature.itemTitle,
                          }}
                        ></dt>
                        <dd className="text-center">
                          {typeof feature.itemStatus === 'string' ? (
                            <span
                              className="text-lg text-gray-700 whitespace-normal"
                              dangerouslySetInnerHTML={{
                                __html: feature.itemStatus,
                              }}
                            ></span>
                          ) : (
                            <>
                              {feature.itemStatus === true ? (
                                // check icon
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  width="24"
                                  height="24"
                                  stroke-width="2"
                                  class="w-4 h-4 inline-block  text-green-600"
                                >
                                  <path d="M5 12l5 5l10 -10"></path>{' '}
                                </svg>
                              ) : (
                                // minus icon
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  width="24"
                                  height="24"
                                  stroke-width="2"
                                  class="w-4 h-4 inline-block  text-gray-600"
                                >
                                  <path d="M5 12l14 0"></path>{' '}
                                </svg>
                              )}
                              <span
                                className="sr-only"
                                dangerouslySetInnerHTML={{
                                  __html: feature.itemStatus ? 'Yes' : 'No',
                                }}
                              ></span>
                            </>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Fragment>
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </>
  );
}
