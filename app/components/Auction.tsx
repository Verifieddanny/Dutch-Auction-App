import { TransactionButton, useReadContract } from "thirdweb/react";
import { CONTRACT } from "../utils/constant";
import { prepareContractCall, toWei } from "thirdweb";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const calculateTimeLeft = (timePassed: any) => {
  const now = new Date();

  // Set the time to 2:50 PM today
  const twoFiftyPM = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    14,
    50,
    0,
    0
  );

  const targetTime = new Date(twoFiftyPM.getTime() + 24 * 60 * 60 * 1000);
  const difference = +targetTime - (+now + Number(timePassed));

  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return timeLeft;
};

const Timeframe = ({ timeLeft }: any) => {
  return (
    <div className="w-full flex justify-center gap-x-4 text-[3rem] md:text-[4rem] font-extrabold p-2">
      <div
        className="bg-[#ff6600]  text-white dark:text-black w-[24%] md:w-[8rem] h-[9rem] rounded-lg flex flex-col justify-center gap-y-2"
        data-aos="fade-down"
      >
        <span className="private">
          {timeLeft.days < 10 && "0"}
          {timeLeft.days}
        </span>
        <p className="uppercase text-[1rem] md:text-xl">
          {timeLeft.days > 1 ? "Days" : "Day"}
        </p>
      </div>
      <div
        className="bg-black dark:bg-white text-white dark:text-black w-[24%] md:w-[8rem] h-[9rem] rounded-lg flex flex-col justify-center gap-y-2"
        data-aos="fade-down"
      >
        <span className="private">
          {timeLeft.hours < 10 && "0"}
          {timeLeft.hours}
        </span>
        <p className="uppercase text-[1rem] md:text-xl">
          {timeLeft.hours > 1 ? "Hours" : "Hour"}
        </p>
      </div>
      <div
        className="bg-black dark:bg-white text-white dark:text-black w-[24%] md:w-[8rem] h-[9rem] rounded-lg flex flex-col justify-center gap-y-2"
        data-aos="fade-down"
      >
        <span className="private">
          {timeLeft.minutes < 10 && "0"}
          {timeLeft.minutes}
        </span>
        <p className="uppercase text-[1rem] md:text-xl">
          {timeLeft.minutes > 1 ? "Mins" : "Min"}
        </p>
      </div>
      <div
        className="bg-black dark:bg-white text-white dark:text-black w-[24%] md:w-[8rem] h-[9rem] rounded-lg flex flex-col justify-center gap-y-2"
        data-aos="fade-down"
      >
        <span className="private">
          {timeLeft.seconds < 10 && "0"}
          {timeLeft.seconds}
        </span>
        <p className="uppercase text-[1rem] md:text-xl">
          {timeLeft.seconds > 1 ? "Secs" : "Sec"}
        </p>
      </div>
    </div>
  );
};

function Auction() {
  const {
    data: price,
    isLoading: loadingPrice,
    refetch: pricefetch,
  } = useReadContract({
    contract: CONTRACT,
    method: "getPrice",
  });
  const {
    data: time,
    isLoading: loadingTime,
    refetch: fetchTime,
  } = useReadContract({
    contract: CONTRACT,
    method: "getTime",
  });
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(time?.toString()));
  const [amount, setAmount] = useState(0);

  const onPurchaseError = (err: any) => {
    toast(`Insufficient Amount!  📛`, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const onPurchase = () => {
    toast("Transaction Complete! 💰", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      pricefetch();
      fetchTime();
    }, 1000); // Fetch the data every second

    return () => clearInterval(interval);
  }, [pricefetch, fetchTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(time?.toString()));
    }, 1000);
    9.382;
    return () => clearInterval(timer);
  }, [time]);

  if (Number(time?.toString()) === 86400) {
    return <h2 className="text-5xl text-center">Auction has Ended 🎊</h2>;
  }

  return (
    <div className="mt-[20px]">
      <h1 className="text-xl font-bold">Dutch Auction</h1>
      <h1 className="text-2xl font-semibold">Auction item: Borderless</h1>
      {loadingPrice ? (
        <h2>...</h2>
      ) : (
        <h2>{Number(price?.toString()) / 10 ** 18} Eth</h2>
      )}
      {loadingTime ? <h2>...</h2> : <Timeframe timeLeft={timeLeft} />}

      <div className="my-8">
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Price
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">Eth</span>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            step={0.01}
            value={amount}
            className="block w-full rounded-md border-0 py-1.5 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </div>
      {amount > 0 && (
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: CONTRACT,
              method: "buy",
              value: BigInt(toWei(amount.toString())),
            })
          }
          onTransactionConfirmed={onPurchase}
          onError={(error: Error) => onPurchaseError(error.message)}
          style={{
            backgroundColor: "#ff6600",
            color: "white",
            fontSize: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          Purchase Item
        </TransactionButton>
      )}

      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Auction;
