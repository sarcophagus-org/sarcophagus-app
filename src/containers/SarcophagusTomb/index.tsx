import tomb from "../../assets/images/tomb.svg";
import { Heading } from "../../assets/styles/headings.enum";
import TombIndex from "./TombIndex.tsx";

enum TombStyles {
  TombWrapper = "pt-8 px-8 flex justify-center md:justify-between flex-wrap md:flex-nowrap gap-3 md:gap-0",
}

const SarcophagusTomb = () => {
  return (
    <div className={TombStyles.TombWrapper}>
      <div className="mr-4 w-104">
        <div className={Heading.PageHeading}>
          <img src={tomb} alt="" className="mr-4" />
          <span>Tomb</span>
        </div>
        <div className="mt-8 text-md text-white" style={{ lineHeight: "1.4375rem" }}>
          <div>
            This is where you manage your Sarcophagi. View the ones you created or received, including any
            canceled, buried, or errored out
          </div>

          <div className="mt-4">
            For more information on alert statuses and different states of your Sarcophagi,
            <a
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer text-gray-300 hover:text-white ml-2 underline"
              href="https://github.com/sarcophagus-org/sarcophagus-app/blob/develop/README.md"
            >
              see here
            </a>
          </div>
        </div>
      </div>
      <TombIndex />
    </div>
  );
};

export default SarcophagusTomb;
