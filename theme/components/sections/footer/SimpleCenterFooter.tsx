// import PaymentMethod from "./PaymentMethod";
import React,{ useState } from "react";
import { cn } from "@/utils/cn";
import { sendEmail } from "@/utils/sendEmail";
import type { SendEmailParams } from "@/utils/sendEmail";
import { SITE } from "~/config/siteConfig";
import { simpleCenterFooterData } from '~/config/navigation';

type Section = {
  bgImg?: string; // Background image path
  bgType?: "video" | "image"; // Background type
  bgColor?: string; // Background color
  bgOpacity?: number; // Background opacity
  noMarginTop?: boolean; // Whether to remove margin at the top
  isLogo?: boolean; // Whether to show a logo
  logoSize?: number; // Logo size for desktop
  logoSizeOnMobile?: number; // Logo size for mobile
  textColor?: string; // Text color
  openingHours?: string[]; // Opening hours information
  openingHoursInsteadText?: string; // Custom text for opening hours
  address?: { url: string; address: string }[]; // Address links
  addressInsteadText?: string; // Custom text for address
  menu?: { link: string; text: string }[]; // Footer menu links
  FB?: boolean; // Whether to show Facebook link
  FBLink?: string; // Facebook link URL
  IG?: boolean; // Whether to show Instagram link
  IGLink?: string; // Instagram link URL
  X?: boolean; // Whether to show X (Twitter) link
  XLink?: string; // X (Twitter) link URL
  youtube?: boolean; // Whether to show YouTube link
  youtubeLink?: string; // YouTube link URL
  yelp?: boolean; // Whether to show Yelp link
  yelpLink?: string; // Yelp link URL
  doorDash?: boolean; // Whether to show DoorDash link
  doorDashLink?: string; // DoorDash link URL
  uberEats?: boolean; // Whether to show Uber Eats link
  uberEatsLink?: string; // Uber Eats link URL
  isPrivacy?: boolean; // Whether to show Privacy link
  isTerms?: boolean; // Whether to show Terms link
  isRefund?: boolean; // Whether to show Refund link
  isAccessibility?: boolean; // Whether to show Accessibility link
  isSendFeedback?: boolean; // Whether to show Send Feedback button
};
export default function Footer(props: { section: Section; }){
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
  const [formStatus, setFormStatus] = useState({ success: false, error: "" });
  const [message, setMessage] = useState("");
  const textareaMaxChars = 2000;
  const handleClose = () => {
    setIsModalOpen(false); 
  };
  const handleOpen = () => {
    setIsModalOpen(true); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= textareaMaxChars) {
      setMessage(input); 
    }
  };
  const { section } = props;
  const currentYear = new Date().getFullYear();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault(); // Prevent default form submission behavior

    // Get form data
    const formData = new FormData(event?.currentTarget);

    // Prepare the email data
    const emailData:SendEmailParams = {
      email: "",
      fullname: "",
      phone: "",
      message: formData.get('message') as string||"",
    };

    try {
      const result = await sendEmail(emailData); // Send email using the utility
      if (result) {
        setFormStatus({ success: true, error: "" });
      } else {
        setFormStatus({ success: false, error: "Failed to send message." });
      }
    } catch (error) {
      setFormStatus({
        success: false,
        error: `An error occurred while sending the message. ${error}`,
      });
    }
  };
  return(
<>
{/* feedback form */}
<div >
    <div id="feedback-overlay"  className={`fixed inset-0 w-full h-full bg-black bg-opacity-80 z-[1000] 
      ${isModalOpen ? "block" : "hidden"}`}  onClick={handleClose} ></div>
  <div id="feedbackModal"  className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[450px] p-5 bg-white shadow-lg z-[1001] rounded-lg ${isModalOpen ? "block" : "hidden"}`}>
    <div className="flex justify-end">
      <button
        id="closeFeedbackModal"
        className="text-right text-gray-800 border-none cursor-pointer text-[13px]"
        aria-label="close Modal"
        onClick={handleClose}
        type="button"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"></path>
        </svg></button>
    </div>
    <form onSubmit={handleSubmit}>
        <div className="col-span-full">
          <label
            htmlFor="message"
            className="block text-lg font-medium text-gray-900"
          >
            Describe your feedback
          </label>
          <div className="mt-2">
            <textarea
              id="message"
              name="message"
              onChange={handleInputChange}
              rows={3}
              className="block w-full rounded-md border border-gray-600 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-600 placeholder:text-gray-400 focus:outline-blue-600"
              defaultValue={""}
              placeholder="Your feedback helps us improve. "></textarea>
               <div className="text-sm text-gray-500 mb-2">
               <span className={cn("text-right text-gray-500 block", message.length > textareaMaxChars ? "text-red-600" : "")}>
  {message.length}/{textareaMaxChars}
</span>      </div>
          </div>
        </div>

        <div className="my-6 flex flex-col justify-center items-center" >
          <button
            id="sendFeedbackButton"
            type="submit"
            className="rounded-full px-10 py-1.5 text-lg shadow-sm hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap text-center bg-gray-700 text-white"
            // onClick={handleFeedbackSubmit}
            aria-label="Send feedback form"
          >
            Send
          </button>
        </div> 
       
         {/* Display submit result */}
      {formStatus.success && (
        <div className="mt-3 text-center text-green-600">
          Message sent successfully!
        </div>
      )}
      {formStatus.error && (
        <div className="mt-3 text-center text-red-600">
          Error: {formStatus.error}
        </div>
      )}
   
    </form>
  </div>
</div>
{/* end of feedback form */}

<footer
  className={cn(
    "relative scroll-mt-100 sm:scroll-mt-150",
   section?.noMarginTop ? "mt-0" : "mt-16 sm:mt-24 md:mt-32"
  )}
  id="footer"
>
  {
   section?.bgImg ? (
      <img
        src={`/${section?.bgImg}`}
        alt={"footer background image of " + SITE?.name}
        className={`${section?.bgType === "video" ? "sm:hidden" : ""} absolute inset-0 -z-10 h-full w-full object-cover`}
        aria-hidden="true"
        loading="lazy"
      />
    ) : null
  }
  <span
    className="absolute -z-10 w-full inset-0 top-0 left-0"
    style={{
      backgroundColor:section?.bgColor || "white", // Default to white
      opacity:section?.bgOpacity || 1,            // Default to fully opaque
    }}  ></span>

  <div
    className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8 text-white hover:text-gray-300 text-center"
  >
    {
     section?.isLogo ? (
        <div className="flex justify-center mb-8 sm:mb-16">
         
          <img
            className={`hidden sm:block h-24 w-auto mr-3`}
            src={`/${SITE?.logoUrl}`}
            alt={SITE?.name + " Logo"}
            style={{
              height: `${section?.logoSize}px`,
            }}          />
          <img
            className={`block sm:hidden mx-2`}
            src={`/${SITE?.logoUrl}`}
            alt={SITE?.name + " Logo"}
            style={{
              height: `${section?.logoSizeOnMobile ? section?.logoSizeOnMobile : 40}px`,
            }}          />
        </div>
      ) : (
        ""
      )
    }

    {
     section?.openingHours ? (
        <div
          className="pb-10 leading-8"
          style={{
            color:section?.textColor || '#ffffff',
          }}          
        >
          <div className="font-semibold">
            {section?.openingHoursInsteadText
              ?section?.openingHoursInsteadText
              : "Opening Hours"}
          </div>
          {section?.openingHours?.map((info: string, index: number) => (
            <div key={index}>
              <div>{info}</div>
            </div>
          ))}
        </div>
      ) : null
    }
    {
     section?.address ? (
        <div
          className="pb-10 leading-8"
          style={{
    color:section?.textColor || '#ffffff',
  }}
        >
          <div>
            <span className="font-semibold">
              {section?.addressInsteadText
                ?section?.addressInsteadText
                : "Address:"}
            </span>
          </div>
          {section?.address?.map(
            (item: { url: string; address: string }, index: number) => (
              <div key={index}>
              
                  <a
                    target="_blank"
                    aria-label={`Open the ${item?.address} in a new tab`}
                    href={item?.url}
                    
                  >
                    {item?.address}
                  </a>
              
              </div>
            )
          )}{" "}
        </div>
      ) : null
    }
    <nav
      className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
      aria-label="Footer"
    >
      {
       section?.menu &&
         section?.menu?.map(
            (item: { link: string; text: string }, index: number) => (
            
                <div className="pb-6 font-semibold" key={index}>
                  <a
                    href={item?.link}
                    className="text-lg leading-6 text-white hover:text-gray-300"
                    style={{
                      color:section?.textColor || '#ffffff',
                    }}
                  >
                    {item?.text}
                  </a>
                </div>
            )
          )
      }
    </nav>
    <div className="mt-10 flex justify-center space-x-10">
      {
       section?.FB && (
          <a
            href={section?.FBLink}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Facebook</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        )
      }
      {
       section?.IG && (
          <a
            href={section?.IGLink}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Instagram</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        )
      }
      {
       section?.X && (
          <a
            href={section?.XLink}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">X</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
            </svg>
          </a>
        )
      }
      {
       section?.youtube && (
          <a
            href={section?.youtubeLink}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">YouTube</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        )
      }
      {
       section?.yelp && (
          <a
            href={section?.yelpLink}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Yelp</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="h-6 w-6"
            >
              <path
                fill="currentColor"
                d="m4.188 10.095l.736-.17l.073-.02A.813.813 0 0 0 5.45 8.65a1 1 0 0 0-.3-.258a3 3 0 0 0-.428-.198l-.808-.295a76 76 0 0 0-1.364-.493C2.253 7.3 2 7.208 1.783 7.14c-.041-.013-.087-.025-.124-.038a2.1 2.1 0 0 0-.606-.116a.72.72 0 0 0-.572.245a2 2 0 0 0-.105.132a1.6 1.6 0 0 0-.155.309c-.15.443-.225.908-.22 1.376c.002.423.013.966.246 1.334a.8.8 0 0 0 .22.24c.166.114.333.129.507.141c.26.019.513-.045.764-.103l2.447-.566zm8.219-3.911a4.2 4.2 0 0 0-.8-1.14a1.6 1.6 0 0 0-.275-.21a2 2 0 0 0-.15-.073a.72.72 0 0 0-.621.031c-.142.07-.294.182-.496.37c-.028.028-.063.06-.094.089c-.167.156-.353.35-.574.575q-.51.516-1.01 1.042l-.598.62a3 3 0 0 0-.298.365a1 1 0 0 0-.157.364a.8.8 0 0 0 .007.301q0 .007.003.013a.81.81 0 0 0 .945.616l.074-.014l3.185-.736c.251-.058.506-.112.732-.242c.151-.088.295-.175.394-.35a.8.8 0 0 0 .093-.313c.05-.434-.178-.927-.36-1.308M6.706 7.523c.23-.29.23-.722.25-1.075c.07-1.181.143-2.362.201-3.543c.022-.448.07-.89.044-1.34c-.022-.372-.025-.799-.26-1.104C6.528-.077 5.644-.033 5.04.05q-.278.038-.553.104a8 8 0 0 0-.543.149c-.58.19-1.393.537-1.53 1.204c-.078.377.106.763.249 1.107c.173.417.41.792.625 1.185c.57 1.036 1.15 2.066 1.728 3.097c.172.308.36.697.695.857q.033.015.068.025c.15.057.313.068.469.032l.028-.007a.8.8 0 0 0 .377-.226zm-.276 3.161a.74.74 0 0 0-.923-.234a1 1 0 0 0-.145.09a2 2 0 0 0-.346.354c-.026.033-.05.077-.08.104l-.512.705q-.435.591-.861 1.193c-.185.26-.346.479-.472.673l-.072.11c-.152.235-.238.406-.282.559a.7.7 0 0 0-.03.314c.013.11.05.217.108.312q.046.07.1.138a1.6 1.6 0 0 0 .257.237a4.5 4.5 0 0 0 2.196.76a1.6 1.6 0 0 0 .349-.027a2 2 0 0 0 .163-.048a.8.8 0 0 0 .278-.178a.7.7 0 0 0 .17-.266c.059-.147.098-.335.123-.613l.012-.13c.02-.231.03-.502.045-.821q.037-.735.06-1.469l.033-.87a2.1 2.1 0 0 0-.055-.623a1 1 0 0 0-.117-.27Zm5.783 1.362a2.2 2.2 0 0 0-.498-.378l-.112-.067c-.199-.12-.438-.246-.719-.398q-.644-.353-1.295-.695l-.767-.407c-.04-.012-.08-.04-.118-.059a2 2 0 0 0-.466-.166a1 1 0 0 0-.17-.018a.74.74 0 0 0-.725.616a1 1 0 0 0 .01.293c.038.204.13.406.224.583l.41.768q.341.65.696 1.294c.152.28.28.52.398.719q.036.057.068.112c.145.239.261.39.379.497a.73.73 0 0 0 .596.201a2 2 0 0 0 .168-.029a1.6 1.6 0 0 0 .325-.129a4 4 0 0 0 .855-.64c.306-.3.577-.63.788-1.006q.045-.08.076-.165a2 2 0 0 0 .051-.161q.019-.083.029-.168a.8.8 0 0 0-.038-.327a.7.7 0 0 0-.165-.27"
              />
            </svg>
          </a>
        )
      }
      {
       section?.doorDash && (
          <a
            href={section?.doorDashLink}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">DoorDash</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path
                fill="currentColor"
                d="M23.071 8.409a6.09 6.09 0 0 0-5.396-3.228H.584A.589.589 0 0 0 .17 6.184L3.894 9.93a1.75 1.75 0 0 0 1.242.516h12.049a1.554 1.554 0 1 1 .031 3.108H8.91a.589.589 0 0 0-.415 1.003l3.725 3.747a1.75 1.75 0 0 0 1.242.516h3.757c4.887 0 8.584-5.225 5.852-10.413"
              />
            </svg>
          </a>
        )
      }
      {
       section?.uberEats && (
          <a
            href={section?.uberEatsLink}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Uber Eats</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path
                fill="currentColor"
                d="M0 2.865v4.997c0 1.883 1.332 3.13 3.084 3.13a2.97 2.97 0 0 0 2.15-.877v.743h1.211V2.864H5.223v4.934c0 1.265-.87 2.12-1.995 2.122c-1.139-.002-1.997-.834-1.997-2.122V2.865zm7.363 0v7.993h1.162v-.732a3 3 0 0 0 2.118.876a3.044 3.044 0 1 0 0-6.086a2.97 2.97 0 0 0-2.107.876V2.865zm9.885 2.056a3.02 3.02 0 0 0-3.035 3.024c0 1.737 1.373 3.037 3.153 3.037a3.12 3.12 0 0 0 2.558-1.243l-.85-.618a2.05 2.05 0 0 1-1.708.858a1.97 1.97 0 0 1-1.97-1.655h4.817v-.379c0-1.734-1.254-3.024-2.964-3.024zm6.163.066a1.6 1.6 0 0 0-1.376.766v-.719h-1.163v5.824h1.174V7.546c0-.902.559-1.484 1.327-1.484h.495V4.989zm-6.203.944a1.844 1.844 0 0 1 1.834 1.486h-3.618a1.844 1.844 0 0 1 1.784-1.486m-6.659.006a2.021 2.021 0 1 1 .002 4.042a2.02 2.02 0 0 1-1.416-.598a2.02 2.02 0 0 1-.585-1.422a2.02 2.02 0 0 1 .584-1.422a2.02 2.02 0 0 1 1.415-.6M0 12.987v7.971h5.722v-1.367H1.546v-1.97H5.61v-1.315H1.545v-1.955h4.176v-1.365zm14.56.41v1.685h-1.15v1.338h1.154v3.143c0 .793.572 1.421 1.6 1.421h1.643l-.006-1.338H16.66c-.348 0-.572-.15-.572-.464v-2.768H17.8v-1.332h-1.706v-1.686zm-5.297 1.527a3.103 3.103 0 1 0 .07 6.205a3 3 0 0 0 1.913-.666v.532h1.517v-5.913h-1.509v.526a3 3 0 0 0-1.92-.684zm11.771.007c-1.585 0-2.7.644-2.7 1.886c0 .86.613 1.421 1.936 1.695l1.448.328c.57.11.722.259.722.49c0 .371-.438.603-1.127.603c-.876 0-1.378-.19-1.573-.848h-1.533c.22 1.231 1.157 2.05 3.049 2.05h.002c1.752 0 2.742-.819 2.742-1.953c0-.806-.585-1.408-1.809-1.667l-1.294-.26c-.751-.136-.988-.274-.988-.546c0-.357.361-.575 1.03-.575c.722 0 1.252.192 1.405.847h1.518c-.086-1.229-.99-2.05-2.827-2.05m-11.567 1.25c1.01.01 1.819.837 1.807 1.847A1.8 1.8 0 0 1 9.45 19.83a1.824 1.824 0 0 1 .018-3.648"
              />
            </svg>
          </a>
        )
      }
    </div>

     {/* {
     section?.paymentMethod ? (
        <div className="mt-8">
          <PaymentMethod
            content={content}
            acceptedPaymentMethodsInsteadText={
             section?.acceptedPaymentMethodsInsteadText
            }
          />
        </div>
      ) : (
        ""
      )
    }  */}
    <p
      className="mt-10 text-center text-sm leading-5"
      style={{
        color:section?.textColor || '#ffffff',
      }}
    >
  {
  (
    [
      simpleCenterFooterData?.isPrivacy && (
        <a href="/privacy" role="button" key="privacy">
          Privacy
        </a>
      ),
      simpleCenterFooterData?.isTerms && (
        <a href="/terms" role="button" key="terms">
          Terms
        </a>
      ),
      simpleCenterFooterData?.isRefund && (
        <a href="/refund" role="button" key="refund">
          Refund
        </a>
      ),
      simpleCenterFooterData?.isAccessibility && (
        <a href="/accessibility" role="button" key="accessibility">
          Accessibility
        </a>
      ),
      simpleCenterFooterData?.isSendFeedback && (
        <a
          id="send-feedback-btn"
          className="cursor-pointer"
          onClick={handleOpen}
          role="button"
          key="send-feedback"
        >
          Send Feedback
        </a>
      ),
    ]
      .filter(Boolean) as JSX.Element[] // Explicitly cast the filtered array
  ).reduce<JSX.Element[]>((acc, item, idx, arr) => {
    acc.push(item);
    if (idx < arr.length - 1) {
      acc.push(<span key={`separator-${idx}`}> | </span>);
    }
    return acc;
  }, [])
}


    </p>
    <p
      className="mt-2 text-center text-sm leading-5"
      style={{
        color:section?.textColor || '#ffffff',
      }}
    >
      &copy; {currentYear}{" "}
      {SITE?.name} All Rights Reserved. 
    </p>
  </div>
</footer>
</>)
}