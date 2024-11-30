import { cn } from "@/utils/cn";

export default function StepProgressBar(props) {
  const { componentConfig } = props;
  return (
    <nav aria-label="Steps" className="flex items-center justify-center w-full">
      <ol role="list" className="flex items-center justify-center">
        {componentConfig?.steps?.map((step, stepIdx) => (
          <li
            key={step?.name}
            className={cn(
              stepIdx !== componentConfig?.steps?.length - 1 ? "pr-12 sm:pr-24 lg:pr-48" : "",
              "relative flex flex-col items-center",
            )}
          >
            {/* line */}
            {stepIdx !== componentConfig?.steps?.length && (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-y-1/2 left-1/2 -translate-x-1/2 mt-4 w-full flex items-center justify-center"
                >
                  <div className="h-0.5 w-full bg-gray-200"></div>
                </div>
              </>
            )}
            {/* circle */}
            <span className={cn("absolute inset-y-1/2 mt-3 h-2.5 w-2.5 rounded-full bg-indigo-600")}></span>

            {/* Icon with larger margin-top */}
            {step?.status === "complete" ||
              step?.status === "current" ||
              step?.status === "upcoming" ? (
              <>
                <a
                  href="#"
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-indigo-600 bg-white mt-6"
                >
                  <span aria-hidden="true" className="text-indigo-600">
                    {stepIdx + 1}
                  </span>
                  <span className="sr-only">{step?.name}</span>
                </a>
              </>
            ) : (
              <>
                <a
                  href="#"
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 mt-6"
                >
                  <span aria-hidden="true" className="text-gray-500">
                    {stepIdx + 1}
                  </span>
                  <span className="sr-only">{step?.name}</span>
                </a>
              </>
            )}

            {/* Text below the icon with larger margin-top */}
            <span className="mt-8 text-sm text-gray-500">{step?.name}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
